<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('enrollments', function (Blueprint $table) {
            $table->id();
            $table->string('student_id')->unique();
            $table->string('child_name');
            $table->date('child_birthday');
            $table->string('parent_name');
            $table->string('parent_contact_number');
            $table->string('parent_email');
            $table->enum('parent_relationship', ['Father', 'Mother', 'Guardian', 'Other']);
            $table->enum('status', ['pending', 'reviewed', 'approved', 'rejected'])->default('pending');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('enrollments');
    }
};
