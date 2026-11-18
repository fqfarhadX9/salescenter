<?php
/** POST /api/auth/logout.php → destroys the owner session and clears the cookie */
declare(strict_types=1);
require __DIR__ . '/_bootstrap.php';

owner_require_method('POST');
owner_require_same_origin();
owner_logout();
owner_json(['ok' => true]);
