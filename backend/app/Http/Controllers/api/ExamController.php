<?php

namespace App\Http\Controllers\api;
use App\Http\Controllers\Controller;
use App\Http\Resources\ExamResource;
use App\Http\Resources\ExamStudentResource;
use Illuminate\Support\Facades\DB;
use App\Models\Exam;
use App\Models\Question;
use App\Models\Answer;
use Illuminate\Http\Request;
use Carbon\Carbon;
use App\Jobs\ExipredExam;

class ExamController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return ExamResource::collection(Exam::all());
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            DB::beginTransaction();
            $exam=Exam::create($request->only(['name','duration','started_at','expire_at']));
            foreach ($request->questions as $question){
                $new_question=Question::create([
                    "question" => $question['question'],
                    "degree" => $question['degree'],
                    "exam_id" => $exam->id,
                ]);

                foreach ($question['answers'] as $answer){
                    Answer::create([
                        "answer" => $answer['answer'],
                        "is_correct" => $answer['is_correct'],
                        "question_id" => $new_question->id,
                    ]);
                }
            }

            DB::commit();

            $expireAt = \DateTime::createFromFormat('Y-m-d H:i', $exam->expire_at)->modify('-3 hours');
            ExipredExam::dispatch()->delay($expireAt);

            return response()->json([
                "message" => "Exam created successfully"
            ]);

        } catch (\Exception $e) {
                
            DB::rollBack();
            return response()->json(['error' => $e->getMessage()], 404);

        }

    }

    /**
     * Display the specified resource.
     */
    public function show(Exam $exam)
    {
        return new ExamResource($exam);
    }

    public function showResult(Exam $exam)
    {
        // return $exam->exam_student->where('status','completed');
        // return new ExamResource($exam);

        return ExamStudentResource::collection($exam->exam_student->where('status','completed'));
    }



    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Exam $exam)
    {
        return $exam->update($request->all());
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Exam $exam)
    {
        $exam->delete();
        return response()->json(['message' => 'Exam deleted successfully'], 200);
    }
}
