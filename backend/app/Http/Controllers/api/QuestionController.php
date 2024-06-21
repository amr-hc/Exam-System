<?php

namespace App\Http\Controllers\api;
use App\Http\Controllers\Controller;
use App\Http\Resources\QuestionResource;

use App\Models\Question;
use Illuminate\Http\Request;
use App\Models\Answer;


class QuestionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return QuestionResource::collection(Question::all());
    }



    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // return Question::create($request->all());

        $question=Question::create($request->only(['question','degree','exam_id']));
        foreach ($request->answers as $answer){
         
                Answer::create([
                    "answer" => $answer['answer'],
                    "is_correct" => $answer['is_correct'],
                    "question_id" => $question->id,
                ]);
            }
        
            return response()->json(['message' => 'Question Created successfully'], 200);
        
    }

    /**
     * Display the specified resource.
     */
    public function show(Question $question)
    {
        return new QuestionResource($question);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Question $question)
    {
        return $question->update($request->all());
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Question $question)
    {
        $question->delete();
        return response()->json(['message' => 'Question deleted successfully'], 200);

    }
}
