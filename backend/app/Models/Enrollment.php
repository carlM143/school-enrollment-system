<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Enrollment extends Model
{
    use HasFactory;

    protected $fillable = [
        'student_id',
        'child_name',
        'child_birthday',
        'parent_name',
        'parent_contact_number',
        'parent_email',
        'parent_relationship',
        'status',
    ];

    protected $casts = [
        'child_birthday' => 'date',
    ];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($enrollment) {
            $enrollment->student_id = 'STU-' . str_pad(
                Enrollment::max('id') + 1,
                6,
                '0',
                STR_PAD_LEFT
            );
        });
    }
}
