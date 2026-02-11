<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background-color: #DC2626; color: white; padding: 20px; text-align: center; }
        .alert-badge { background-color: #FEE2E2; color: #DC2626; padding: 5px 10px; border-radius: 4px; font-weight: bold; }
        .content { background-color: #f9fafb; padding: 30px; border-radius: 8px; margin-top: 20px; }
        .info-table { width: 100%; border-collapse: collapse; margin: 20px 0; }
        .info-table td { padding: 10px; border-bottom: 1px solid #e5e7eb; }
        .info-table td:first-child { font-weight: bold; color: #DC2626; width: 40%; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🔔 New Enrollment Alert</h1>
            <p class="alert-badge">ACTION REQUIRED</p>
        </div>
        <div class="content">
            <p>A new student enrollment has been submitted and requires your attention.</p>

            <h3>Student Information:</h3>
            <table class="info-table">
                <tr>
                    <td>Student ID</td>
                    <td>{{ $enrollment->student_id }}</td>
                </tr>
                <tr>
                    <td>Child's Name</td>
                    <td>{{ $enrollment->child_name }}</td>
                </tr>
                <tr>
                    <td>Date of Birth</td>
                    <td>{{ $enrollment->child_birthday->format('F d, Y') }}</td>
                </tr>
            </table>

            <h3>Parent/Guardian Information:</h3>
            <table class="info-table">
                <tr>
                    <td>Name</td>
                    <td>{{ $enrollment->parent_name }}</td>
                </tr>
                <tr>
                    <td>Relationship</td>
                    <td>{{ $enrollment->parent_relationship }}</td>
                </tr>
                <tr>
                    <td>Contact Number</td>
                    <td>{{ $enrollment->parent_contact_number }}</td>
                </tr>
                <tr>
                    <td>Email Address</td>
                    <td>{{ $enrollment->parent_email }}</td>
                </tr>
            </table>

            <p style="margin-top: 20px; padding: 15px; background-color: #FEF3C7; border-left: 4px solid #F59E0B;">
                <strong>Next Steps:</strong> Please log in to the admin portal to review this enrollment and update its status.
            </p>
        </div>
    </div>
</body>
</html>
