<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Enrollment;
use Illuminate\Http\Request;
use App\Mail\EnrollmentConfirmation;
use App\Mail\StaffNotification;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Log;
use Maatwebsite\Excel\Facades\Excel;
use App\Exports\EnrollmentsExport;

class EnrollmentController extends Controller
{
    public function index()
    {
        $enrollments = Enrollment::orderBy('created_at', 'desc')->get();
        return response()->json($enrollments);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'child_name' => 'required|string|max:255',
            'child_birthday' => 'required|date|before:today',
            'parent_name' => 'required|string|max:255',
            'parent_contact_number' => 'required|string|max:20',
            'parent_email' => 'required|email|max:255',
            'parent_relationship' => 'required|in:Father,Mother,Guardian,Other',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        $enrollment = Enrollment::create($validator->validated());

        // Send confirmation email to parent
        try {
            Log::info('Sending parent email to: ' . $enrollment->parent_email);
            Mail::to($enrollment->parent_email)->send(
                new EnrollmentConfirmation($enrollment)
            );
            Log::info('Parent email sent successfully');
        } catch (\Exception $e) {
            Log::error('Parent email failed: ' . $e->getMessage());
        }

        // Wait 5 seconds to avoid Mailtrap rate limit
        sleep(5);

        // Send notification to staff
        try {
            $staffEmail = env('STAFF_EMAIL', 'staff@school.com');
            Log::info('Sending staff email to: ' . $staffEmail);
            Mail::to($staffEmail)->send(
                new StaffNotification($enrollment)
            );
            Log::info('Staff email sent successfully');
        } catch (\Exception $e) {
            Log::error('Staff email failed: ' . $e->getMessage());
        }

        return response()->json([
            'success' => true,
            'message' => 'Enrollment submitted successfully!',
            'data' => $enrollment
        ], 201);
    }

    public function export()
    {
        return Excel::download(new EnrollmentsExport, 'enrollments.xlsx');
    }
}
