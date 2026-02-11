<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background-color: #4F46E5; color: white; padding: 20px; text-align: center; }
        .content { background-color: #f9fafb; padding: 30px; border-radius: 8px; margin-top: 20px; }
        .info-row { margin: 10px 0; }
        .label { font-weight: bold; color: #4F46E5; }
        .footer { margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; text-align: center; color: #6b7280; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Enrollment Confirmation</h1>
        </div>
        <div class="content">
            <p>Dear {{ $enrollment->parent_name }},</p>

            <p>Thank you for enrolling your child with us! We have received your enrollment application and our team will review it shortly.</p>

            <h3>Enrollment Details:</h3>
            <div class="info-row">
                <span class="label">Student ID:</span> {{ $enrollment->student_id }}
            </div>
            <div class="info-row">
                <span class="label">Child's Name:</span> {{ $enrollment->child_name }}
            </div>
            <div class="info-row">
                <span class="label">Date of Birth:</span> {{ $enrollment->child_birthday->format('F d, Y') }}
            </div>
            <div class="info-row">
                <span class="label">Parent/Guardian:</span> {{ $enrollment->parent_name }} ({{ $enrollment->parent_relationship }})
            </div>
            <div class="info-row">
                <span class="label">Contact Number:</span> {{ $enrollment->parent_contact_number }}
            </div>

            <p style="margin-top: 20px;">We will contact you soon regarding the next steps in the enrollment process.</p>

            <p>If you have any questions, please don't hesitate to reach out to us.</p>
        </div>
        <div class="footer">
            <p>Best regards,<br>School Administration Team</p>
        </div>
    </div>
</body>
</html>
