<?php
/**
 * Owner authentication — shared bootstrap (not directly accessible; see .htaccess).
 *
 * Credentials are NEVER stored in the website files. They are read from:
 *   1. Server environment variables  OWNER_USERNAME / OWNER_PASSWORD_HASH  (+ optional OWNER_SESSION_HOURS)
 *   2. or a PHP config file OUTSIDE the public web folder:
 *        <folder that contains public_html>/offplansale-owner-config.php
 *      e.g. /home/u123456789/domains/offplansale.com/offplansale-owner-config.php
 *
 * The password is stored only as a salted PBKDF2-SHA256 hash (generate it with: npm run owner:hash).
 */

declare(strict_types=1);

if (realpath($_SERVER['SCRIPT_FILENAME'] ?? '') === __FILE__) {
    http_response_code(404);
    exit;
}

const OWNER_SESSION_NAME = 'ops_owner';
const OWNER_IDLE_TIMEOUT = 2 * 60 * 60;          // sign out after 2 hours of inactivity
const OWNER_MAX_ATTEMPTS = 5;                    // failed logins allowed ...
const OWNER_LOCKOUT_SECONDS = 15 * 60;           // ... per 15 minutes per IP

/** Load owner config from env vars, or from the private config file outside public_html. */
function owner_config(): ?array
{
    $user = getenv('OWNER_USERNAME') ?: null;
    $hash = getenv('OWNER_PASSWORD_HASH') ?: null;
    $hours = getenv('OWNER_SESSION_HOURS') ?: null;

    if (!$user || !$hash) {
        $file = owner_config_path();
        if ($file && is_file($file)) {
            $cfg = include $file;
            if (is_array($cfg)) {
                $user = $cfg['username'] ?? null;
                $hash = $cfg['password_hash'] ?? null;
                $hours = $cfg['session_hours'] ?? $hours;
            }
        }
    }
    if (!$user || !$hash) {
        return null;
    }
    $hours = (float) ($hours ?: 8);
    return [
        'username' => (string) $user,
        'password_hash' => (string) $hash,
        'session_seconds' => (int) max(900, min(7 * 24 * 3600, $hours * 3600)),
    ];
}

function owner_config_path(): ?string
{
    $custom = getenv('OWNER_CONFIG_FILE');
    if ($custom) {
        return $custom;
    }
    $docroot = rtrim((string) ($_SERVER['DOCUMENT_ROOT'] ?? ''), '/');
    return $docroot ? dirname($docroot) . '/offplansale-owner-config.php' : null;
}

/** Verify "pbkdf2_sha256$<iterations>$<salt b64>$<hash b64>" in constant time. */
function owner_verify_password(string $password, string $stored): bool
{
    $parts = explode('$', $stored);
    if (count($parts) !== 4 || $parts[0] !== 'pbkdf2_sha256') {
        return false;
    }
    [, $iterations, $saltB64, $hashB64] = $parts;
    $iterations = (int) $iterations;
    $salt = base64_decode($saltB64, true);
    $expected = base64_decode($hashB64, true);
    if ($iterations < 100000 || $salt === false || $expected === false) {
        return false;
    }
    $actual = hash_pbkdf2('sha256', $password, $salt, $iterations, strlen($expected), true);
    return hash_equals($expected, $actual);
}

function owner_is_https(): bool
{
    return (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off')
        || (($_SERVER['HTTP_X_FORWARDED_PROTO'] ?? '') === 'https')
        || ((int) ($_SERVER['SERVER_PORT'] ?? 0) === 443);
}

/** Start the session with hardened cookie settings (HttpOnly, SameSite=Strict, Secure on HTTPS). */
function owner_session_start(): void
{
    if (session_status() === PHP_SESSION_ACTIVE) {
        return;
    }
    ini_set('session.use_strict_mode', '1');
    ini_set('session.use_only_cookies', '1');
    ini_set('session.use_trans_sid', '0');
    ini_set('session.cookie_httponly', '1');
    session_name(OWNER_SESSION_NAME);
    session_set_cookie_params([
        'lifetime' => 0,
        'path' => '/',
        'secure' => owner_is_https(),
        'httponly' => true,
        'samesite' => 'Strict',
    ]);
    session_start();
}

/** True when the current session belongs to the owner and has not expired (absolute + idle). */
function owner_is_authenticated(): bool
{
    // Don't create a session for ordinary visitors — only read one if the cookie exists.
    if (empty($_COOKIE[OWNER_SESSION_NAME])) {
        return false;
    }
    owner_session_start();
    $s = $_SESSION['owner'] ?? null;
    if (!is_array($s)) {
        return false;
    }
    $now = time();
    if ($now >= ($s['expires_at'] ?? 0) || ($now - ($s['last_seen'] ?? 0)) > OWNER_IDLE_TIMEOUT) {
        owner_logout();
        return false;
    }
    // Bind the session to the browser that logged in
    if (!hash_equals((string) ($s['ua'] ?? ''), hash('sha256', (string) ($_SERVER['HTTP_USER_AGENT'] ?? '')))) {
        owner_logout();
        return false;
    }
    $_SESSION['owner']['last_seen'] = $now;
    return true;
}

function owner_login_session(int $sessionSeconds): void
{
    owner_session_start();
    session_regenerate_id(true);
    $now = time();
    $_SESSION['owner'] = [
        'logged_in_at' => $now,
        'last_seen' => $now,
        'expires_at' => $now + $sessionSeconds,
        'ua' => hash('sha256', (string) ($_SERVER['HTTP_USER_AGENT'] ?? '')),
    ];
}

function owner_logout(): void
{
    owner_session_start();
    $_SESSION = [];
    session_destroy();
    setcookie(OWNER_SESSION_NAME, '', [
        'expires' => time() - 3600,
        'path' => '/',
        'secure' => owner_is_https(),
        'httponly' => true,
        'samesite' => 'Strict',
    ]);
}

/** Reject cross-site requests: Origin (or Referer) must match this host. */
function owner_require_same_origin(): void
{
    $host = strtolower((string) ($_SERVER['HTTP_HOST'] ?? ''));
    $origin = $_SERVER['HTTP_ORIGIN'] ?? $_SERVER['HTTP_REFERER'] ?? '';
    $originHost = strtolower((string) parse_url($origin, PHP_URL_HOST) . (parse_url($origin, PHP_URL_PORT) ? ':' . parse_url($origin, PHP_URL_PORT) : ''));
    if ($host === '' || $originHost === '' || !hash_equals($host, $originHost)) {
        owner_json(['ok' => false, 'error' => 'Forbidden'], 403);
    }
}

function owner_require_method(string $method): void
{
    if (($_SERVER['REQUEST_METHOD'] ?? '') !== $method) {
        header('Allow: ' . $method);
        owner_json(['ok' => false, 'error' => 'Method not allowed'], 405);
    }
}

function owner_json(array $data, int $status = 200): void
{
    http_response_code($status);
    header('Content-Type: application/json; charset=utf-8');
    owner_no_cache();
    echo json_encode($data);
    exit;
}

function owner_no_cache(): void
{
    header('Cache-Control: no-store, no-cache, must-revalidate, private');
    header('Pragma: no-cache');
    header('X-Content-Type-Options: nosniff');
    header('X-Robots-Tag: noindex, nofollow');
}

/* ---------- Brute-force protection (per IP, stored outside the web folder when possible) ---------- */

function owner_attempts_file(): string
{
    $docroot = rtrim((string) ($_SERVER['DOCUMENT_ROOT'] ?? ''), '/');
    $dir = $docroot ? dirname($docroot) . '/.owner-auth' : '';
    if (!$dir || (!is_dir($dir) && !@mkdir($dir, 0700, true)) || !is_writable($dir)) {
        $dir = sys_get_temp_dir() . '/offplansale-owner-auth';
        if (!is_dir($dir)) {
            @mkdir($dir, 0700, true);
        }
    }
    $ip = (string) ($_SERVER['REMOTE_ADDR'] ?? 'unknown');
    return $dir . '/' . hash('sha256', $ip) . '.json';
}

function owner_attempts_read(): array
{
    $f = owner_attempts_file();
    $data = is_file($f) ? json_decode((string) @file_get_contents($f), true) : null;
    $now = time();
    $list = array_values(array_filter((array) ($data['failures'] ?? []), fn ($t) => ($now - (int) $t) < OWNER_LOCKOUT_SECONDS));
    return $list;
}

function owner_is_locked_out(): int
{
    $list = owner_attempts_read();
    if (count($list) < OWNER_MAX_ATTEMPTS) {
        return 0;
    }
    return max(1, OWNER_LOCKOUT_SECONDS - (time() - (int) min($list)));
}

function owner_record_failure(): void
{
    $list = owner_attempts_read();
    $list[] = time();
    @file_put_contents(owner_attempts_file(), json_encode(['failures' => $list]), LOCK_EX);
}

function owner_clear_failures(): void
{
    @unlink(owner_attempts_file());
}
