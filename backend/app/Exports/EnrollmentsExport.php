<?php

namespace App\Exports;

use App\Models\Enrollment;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;

class EnrollmentsExport implements FromCollection, WithHeadings, WithMapping
{
    public function collection()
    {
        return Enrollment::orderBy('created_at', 'desc')->get();
    }

    public function headings(): array
    {
        return [
            'Student ID',
            'Child Name',
            'Birthday',
            'Parent Name',
            'Parent Contact Number',
            'Parent Email',
            'Parent Relationship',
            'Status',
            'Enrollment Date'
        ];
    }

    public function map($enrollment): array
    {
        return [
            $enrollment->student_id,
            $enrollment->child_name,
            $enrollment->child_birthday->format('Y-m-d'),
            $enrollment->parent_name,
            $enrollment->parent_contact_number,
            $enrollment->parent_email,
            $enrollment->parent_relationship,
            $enrollment->status,
            $enrollment->created_at->format('Y-m-d H:i:s')
        ];
    }
}
