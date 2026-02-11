<?php

use Illuminate\Support\Facades\Route;

// Frontend is running on separate Vite dev server (port 5173)
// Backend only serves API routes (in api.php)

Route::get('/', function () {
    return response()->json([
        'message' => 'School Enrollment System API',
        'status' => 'running',
        'version' => '1.0.0',
        'endpoints' => [
            'frontend' => 'http://localhost:5173',
            'api_base' => 'http://localhost:8000/api',
            'enrollment_list' => 'GET /api/enrollments',
            'enrollment_create' => 'POST /api/enrollments',
            'enrollment_export' => 'GET /api/enrollments/export'
        ]
    ]);
});

// Commented out - not needed for separate frontend setup
// Route::get('/{any}', function () {
//     return view('app');
// })->where('any', '.*');
