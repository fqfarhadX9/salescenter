<?php
/**
 * Server-side gate for the homepage ("/" and "/index.html" — routed here by /.htaccess).
 * Owner with a valid session → the site is served normally.
 * Everyone else → 302 redirect to the public landing page (query string such as UTM tags is kept).
 */
declare(strict_types=1);
require __DIR__ . '/_bootstrap.php';

const PUBLIC_LANDING = '/damac-island';

owner_no_cache();
header('Vary: Cookie');

if (owner_is_authenticated()) {
    $index = rtrim((string) $_SERVER['DOCUMENT_ROOT'], '/') . '/index.html';
    header('Content-Type: text/html; charset=utf-8');
    readfile($index);
    exit;
}

$qs = (string) ($_SERVER['QUERY_STRING'] ?? '');
header('Location: ' . PUBLIC_LANDING . ($qs !== '' ? '?' . $qs : ''), true, 302);
exit;
