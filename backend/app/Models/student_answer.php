<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class student_answer extends Model
{
    use HasFactory;

    protected $table = 'student_answer';

    protected $primaryKey = ['student_id', 'answer_id'];

    protected $guarded = [];

    public $incrementing = false;

    public $timestamps = false;
}
