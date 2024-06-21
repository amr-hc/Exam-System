<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class exam_student extends Model
{
    use HasFactory;

    protected $table = 'exam_student';

    protected $primaryKey = ['student_id', 'exam_id'];

    public $incrementing = false;

    public $timestamps = false;

    protected $guarded = [];

    public function exams(){
        return $this->belongsTo(Exam::class);
    }
    public function student(){
        return $this->belongsTo(User::class);
    }
}
