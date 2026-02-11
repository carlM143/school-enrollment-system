 School Enrollment System
A full-stack web application for managing school enrollments with automated email notifications and reporting capabilities.

Table of Contents

Overview
Features
Technology Stack
System Architecture
Prerequisites
Installation
Configuration
Usage
API Documentation
Screenshots
Project Structure
Testing
Deployment
Known Issues
Future Enhancements
Contributing
License


🎯 Overview
The School Enrollment System is a web-based platform designed to streamline the student enrollment process. Parents can easily register their children online, and school staff can manage and review enrollments through an intuitive admin dashboard.
Key Highlights

✅ Separate Frontend/Backend Architecture - Modern microservices approach
✅ Automated Email Notifications - Confirmation emails for parents and alerts for staff
✅ Real-time Dashboard - Live enrollment statistics and management
✅ Excel Export - Download enrollment reports as spreadsheets
✅ Responsive Design - Works on desktop, tablet, and mobile devices
✅ Auto-generated Student IDs - Unique identifiers for each enrollment


✨ Features
For Parents

📝 Easy Enrollment Form - Simple, user-friendly interface
📧 Email Confirmation - Automatic confirmation with enrollment details
✅ Form Validation - Real-time validation to prevent errors
📱 Mobile Responsive - Enroll from any device

For Staff

📊 Admin Dashboard - Complete enrollment overview with statistics
📋 Enrollment Table - View all enrollments with filtering options
📧 Email Notifications - Instant alerts for new enrollments
📥 Excel Export - Download enrollment data as .xlsx files
🔍 Search & Filter - Filter by status (Pending, Approved, Reviewed, Rejected)

Technical Features

🔐 Input Validation - Server-side and client-side validation
🎨 Clean UI/UX - Modern, professional design
⚡ Fast Performance - Optimized for speed
📝 Comprehensive Logging - Track all email activities
🔄 Auto-generated IDs - Student IDs in format STU-000001


🛠 Technology Stack
Backend

Framework: Laravel 11
Language: PHP 8.2
Database: MySQL 8.0
Email: Mailtrap SMTP (Testing) / Laravel Mail
Excel Generation: Maatwebsite/Laravel-Excel

Frontend

Framework: React 18
Build Tool: Vite 5
Routing: React Router DOM 6
HTTP Client: Axios
Styling: CSS3 (Custom)

Development Tools

Server: XAMPP 8.2
Version Control: Git
Package Manager: Composer (Backend), NPM (Frontend)
IDE: Visual Studio Code


📦 Prerequisites
Before you begin, ensure you have the following installed:

PHP >= 8.2
Composer >= 2.0
Node.js >= 18.x
NPM >= 9.x
MySQL >= 8.0
XAMPP >= 8.2 (or similar local server)
Git


🚀 Installation
Step 1: Clone the Repository
bashgit clone https://github.com/yourusername/school-enrollment-system.git
cd school-enrollment-system
Step 2: Backend Setup (Laravel)
bash# Navigate to backend folder
cd backend

# Install PHP dependencies
composer install

# Copy environment file
cp .env.example .env

# Generate application key
php artisan key:generate

# Configure database in .env
# DB_DATABASE=school_enrollment
# DB_USERNAME=root
# DB_PASSWORD=

# Create database
mysql -u root -p -e "CREATE DATABASE school_enrollment CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci"

# Run migrations
php artisan migrate

# Set permissions (Windows - as Administrator)
icacls storage /grant Everyone:F /T
icacls bootstrap\cache /grant Everyone:F /T

# Start Laravel server
php artisan serve


Laravel will run on: http://localhost:8000
Step 3: Frontend Setup (React)
bash# Navigate to frontend folder (open new terminal)
cd frontend

# Install Node dependencies
npm install

# Start Vite development server
npm run dev
React will run on: http://localhost:5173

⚙️ Configuration
Environment Variables
Backend (.env)
envAPP_NAME="School Enrollment System"
APP_URL=http://localhost:8000

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=school_enrollment
DB_USERNAME=root
DB_PASSWORD=
DB_COLLATION=utf8mb4_general_ci

# Email Configuration (Mailtrap)
MAIL_MAILER=smtp
MAIL_HOST=sandbox.smtp.mailtrap.io
MAIL_PORT=2525
MAIL_USERNAME=your_mailtrap_username
MAIL_PASSWORD=your_mailtrap_password
MAIL_ENCRYPTION=tls
MAIL_FROM_ADDRESS="noreply@school.com"
MAIL_FROM_NAME="${APP_NAME}"

# Staff Email
STAFF_EMAIL=staff@school.com

# Frontend URL
FRONTEND_URL=http://localhost:5173
Frontend (vite.config.js)
javascriptexport default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
      }
    }
  }
})

💻 Usage
For Parents (Enrollment)

Access the enrollment form: http://localhost:5173
Fill in child information:

Child's full name
Date of birth


Fill in parent/guardian information:

Full name
Relationship to child
Contact number
Email address


Submit the form
Receive confirmation email with enrollment details

For Staff (Admin Dashboard)

Access admin dashboard: http://localhost:5173/admin
View statistics:

Total enrollments
Pending enrollments
Approved enrollments
Reviewed enrollments


View enrollment table with all parent and child information
Filter enrollments by status (All, Pending, Reviewed, Approved, Rejected)
Export to Excel - Click "Export to Excel" button to download .xlsx file


📡 API Documentation
Base URL
http://localhost:8000/api
Endpoints
1. Get All Enrollments
httpGET /api/enrollments
Response:
json[
  {
    "id": 1,
    "student_id": "STU-000001",
    "child_name": "Juan Dela Cruz",
    "child_birthday": "2020-01-15",
    "parent_name": "Maria Dela Cruz",
    "parent_contact_number": "09171234567",
    "parent_email": "maria@example.com",
    "parent_relationship": "Mother",
    "status": "pending",
    "created_at": "2026-02-11T02:30:00.000000Z",
    "updated_at": "2026-02-11T02:30:00.000000Z"
  }
]
2. Create New Enrollment
httpPOST /api/enrollments
Request Body:
json{
  "child_name": "Juan Dela Cruz",
  "child_birthday": "2020-01-15",
  "parent_name": "Maria Dela Cruz",
  "parent_contact_number": "09171234567",
  "parent_email": "maria@example.com",
  "parent_relationship": "Mother"
}
Response (Success):
json{
  "success": true,
  "message": "Enrollment submitted successfully!",
  "data": {
    "id": 1,
    "student_id": "STU-000001",
    "child_name": "Juan Dela Cruz",
    "child_birthday": "2020-01-15",
    "parent_name": "Maria Dela Cruz",
    "parent_contact_number": "09171234567",
    "parent_email": "maria@example.com",
    "parent_relationship": "Mother",
    "status": "pending",
    "created_at": "2026-02-11T02:30:00.000000Z",
    "updated_at": "2026-02-11T02:30:00.000000Z"
  }
}
Response (Validation Error):
json{
  "success": false,
  "errors": {
    "child_name": ["The child name field is required."],
    "parent_email": ["The parent email must be a valid email address."]
  }
}
3. Export Enrollments to Excel
httpGET /api/enrollments/export
Response: Downloads enrollments.xlsx file

📸 Screenshots
Enrollment Form (Parent View)
User-friendly form for parents to enroll their children
Success Message
Confirmation message after successful enrollment
Email Confirmation (Parent)
Automated email sent to parent with enrollment details
Email Alert (Staff)
Notification email sent to staff about new enrollment
Admin Dashboard
Overview of all enrollments with statistics
Enrollment Table
Detailed table showing all enrollment information
Excel Export
Downloaded spreadsheet with enrollment data

 Screenshots
Enrollment Form (Parent View)
User-friendly form for parents to enroll their children
Success Message
Confirmation message after successful enrollment
Email Confirmation (Parent)
Automated email sent to parent with enrollment details
Email Alert (Staff)
Notification email sent to staff about new enrollment
Admin Dashboard
Overview of all enrollments with statistics
Enrollment Table
Detailed table showing all enrollment information
Excel Export
Downloaded spreadsheet with enrollment data


