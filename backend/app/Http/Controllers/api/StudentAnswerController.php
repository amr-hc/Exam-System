<?php

namespace App\Http\Controllers\api;
use App\Http\Controllers\Controller;
use App\Http\Requests\AssignAllAnswersRequest;
use App\Models\student_answer;
use App\Models\User;
use App\Models\Answer;
use Illuminate\Http\Request;

class StudentAnswerController extends Controller
{
    
    public function assignAnswer(Request $request,Answer $answer ,User $student){
        $student->answers()->attach($answer->id);
        return response()->json([
            'message' => 'Answer assigned successfully'
        ], 200);
    }

    public function unassignAnswer(Request $request,Answer $answer ,User $student){
        $student->answers()->detach($answer->id);
        return response()->json([
            'message' => 'Answer detached successfully'
        ], 200);
    }

    public function assignAllAnswers(AssignAllAnswersRequest $request ){
          $answerIds = $request['answers'];
    auth()->user()->answers()->syncWithoutDetaching($answerIds);
        return response()->json([
           'message' => 'Answers assigned successfully'
        ], 200);
       
    }
}
