<?php

namespace App\Http\Controllers\api;
use App\Http\Controllers\Controller;
use App\Http\Requests\AssignAllAnswersRequest;
// use App\Models\student_answer;
// use App\Models\User;
// use App\Models\Answer;
use App\Models\Answer;
use Illuminate\Http\Request;
use App\Traits\ScoreTrait;

class StudentAnswerController extends Controller
{
    use ScoreTrait;
    
    public function assignAnswer(Request $request){
        $request->validate([ 
            'answer_id' => 'required|integer|exists:answers,id',
        ]);

        auth()->user()->answers()->attach($request->answer_id);
        // $student->answers()->attach($answer->id);
        return response()->json([
            'message' => 'Answer assigned successfully'
        ], 200);
    }

    public function unassignAnswer(Request $request){
        $answerExisting= auth()->user()->answers()->where('answer_id',$request->answer_id)->exists();
        if(!$answerExisting){
            return response()->json([
               'message' => "Answer does not exist in student's answers"
            ], 404);
        }
        auth()->user()->answers()->detach($request->answer_id);
        // $student->answers()->detach($answer->id);
        return response()->json([
            'message' => 'Answer detached successfully'
        ], 200);
    }

    public function assignAllAnswers(AssignAllAnswersRequest $request ){
          $answerIds = $request->answers;
          $exam = Answer::find($answerIds[0]['answer_id'])->exam;

        auth()->user()->answers()->syncWithoutDetaching($answerIds);

        auth()->user()->exams()->attach($exam->id);
        auth()->user()->exams()->updateExistingPivot($exam->id, ['score' => $this->getScore(auth()->user()->id,$exam->id)]);

        $exam = auth()->user()->exams()->where('exam_id',$exam->id)->first()->pivot;
        return $exam;
    }
}
