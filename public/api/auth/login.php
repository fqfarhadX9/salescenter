<?php
/** POST /api/auth/login.php  {"username": "...", "password": "..."}  → sets HttpOnly session cookie */
declare(strict_types=1);
require __DIR__ . '/_bootstrap.php';

owner_require_method('POST');
owner_require_same_origin();

$config = owner_config();
if ($config === null) {
    owner_json(['ok' => false, 'error' => 'Owner login is not configured on the server.'], 503);
}

$wait = owner_is_locked_out();
if ($wait > 0) {
    header('Retry-After: ' . $wait);
    owner_json(['ok' => false, 'error' => 'Too many attempts. Please try again in ' . (int) ceil($wait / 60) . ' minute(s).'], 429);
}

$raw = file_get_contents('php://input', false, null, 0, 4096);
$body = json_decode((string) $raw, true);
$username = is_array($body) ? trim((string) ($body['username'] ?? '')) : '';
$password = is_array($body) ? (string) ($body['password'] ?? '') : '';

$userOk = $username !== '' && hash_equals(strtolower($config['username']), strtolower($username));
// Always run the (slow) hash check so timing doesn't reveal whether the username was right
$passOk = owner_verify_password($password, $config['password_hash']);

if (!$userOk || !$passOk || strlen($password) > 1024) {
    owner_record_failure();
    usleep(random_int(250000, 450000));
    owner_json(['ok' => false, 'error' => 'Invalid username or password.'], 401);
}

owner_clear_failures();
owner_login_session($config['session_seconds']);
owner_json(['ok' => true, 'expiresAt' => $_SESSION['owner']['expires_at']]);
