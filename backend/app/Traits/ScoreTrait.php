<?php

namespace App\Traits;
use Illuminate\Support\Facades\DB;

trait ScoreTrait
{
    public function getScore($studentId, $examId){
        $result = DB::table('exam_student')
        ->join('exams','exam_student.exam_id','=','exams.id')
        ->join('questions','exams.id','=','questions.exam_id')
        ->join('answers','questions.id','=','answers.question_id')
        ->join('student_answer','answers.id','=','student_answer.answer_id')
        ->where('student_answer.student_id',$studentId)
        ->where('exams.id',$examId)
        ->where('answers.is_correct',1)
        ->select(DB::raw('SUM(questions.degree) as total_degree'))
        ->get();
        return $result->first()->total_degree;
    }
}
