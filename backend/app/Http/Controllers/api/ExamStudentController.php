<?php

namespace App\Http\Controllers\api;
use App\Http\Controllers\Controller;

use Illuminate\Support\Facades\DB;
use App\Models\User;
use App\Models\Exam;
use App\Models\exam_student;
use Illuminate\Http\Request;
use App\Traits\ScoreTrait;


class ExamStudentController extends Controller
{
    use ScoreTrait;
    public function assignExam(request $request,Exam $exam ,User $student){
        $student->exams()->attach($exam->id);
        return response()->json([
            'message' => 'Exam assigned successfully'
        ], 200);
    }

    public function unassignExam(request $request,Exam $exam ,User $student){
        $student->exams()->detach($exam->id);
        return response()->json([
            'message' => 'Exam detached successfully'
        ], 200);
    }

    public function index(){
        return response()->json(exam_student::all(), 200);
    }

    public function show(Exam $exam, User $student){
        $student->exams()->updateExistingPivot($exam->id, ['score' => $this->getScore($student->id,$exam->id)]);
        $exam = $student->exams()->where('exam_id',$exam->id)->first()->pivot;
        return $exam;
    }


   
}
