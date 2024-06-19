<?php

namespace App\Http\Controllers\api;
use App\Http\Controllers\Controller;

use App\Models\student_answer;
use App\Models\User;
use App\Models\Answer;
use Illuminate\Http\Request;

class StudentAnswerController extends Controller
{
    public function assignAnswer(request $request,Answer $answer ,User $student){
        $student->answers()->attach($answer->id);
        return response()->json([
            'message' => 'Answer assigned successfully'
        ], 200);
    }

    public function unassignAnswer(request $request,Answer $answer ,User $student){
        $student->answers()->detach($answer->id);
        return response()->json([
            'message' => 'Answer detached successfully'
        ], 200);
    }
}
