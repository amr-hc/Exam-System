<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Answer extends Model
{
    use HasFactory;
    protected $guarded = [];

    public function question(){
        return $this->belongsTo(Question::class);
    }

    public function users(){
        return $this->belongsToMany(User::class, 'student_answer','answer_id', 'student_id');
    }

    public function exam()
    {
        return $this->hasOneThrough(Exam::class, Question::class, 'id', 'id', 'question_id', 'exam_id');
    }
}
