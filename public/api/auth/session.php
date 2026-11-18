<?php
/** GET /api/auth/session.php → {"authenticated": bool, "expiresAt": int|null} */
declare(strict_types=1);
require __DIR__ . '/_bootstrap.php';

owner_require_method('GET');
$ok = owner_is_authenticated();
owner_json([
    'authenticated' => $ok,
    'expiresAt' => $ok ? ($_SESSION['owner']['expires_at'] ?? null) : null,
]);
