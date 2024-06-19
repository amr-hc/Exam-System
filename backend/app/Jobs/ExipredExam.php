<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class ExipredExam implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * Create a new job instance.
     */
    public function __construct()
    {
        //
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {

        $now = Carbon::now();
        DB::table('exams')->join('exam_student','exams.id','=','exam_student.exam_id')
        ->where('exam_student.status','=','pending')
        ->where('exams.expire_at','<=',$now)
        ->update(['exam_student.status' => 'expired']);
    }
}
