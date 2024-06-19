<?php

namespace App\Http\Controllers\api;
use App\Http\Controllers\Controller;

use App\Models\User;
use App\Models\Exam;
use App\Models\exam_student;
use Illuminate\Http\Request;

class ExamStudentController extends Controller
{

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
   
}
