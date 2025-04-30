<?php

namespace App\Http\Controllers;

use App\Models\All_tools_all_in;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Schema;

class All_tools_all_inController extends Controller
{
    public function index()
    {
        return All_tools_all_in::all();
    }

    public function store(Request $request)
    {
        $request->validate([
            'text' => 'required',
            'email' => 'required',
            'age' => 'required',
            'selection' => 'required',
            'datetime' => 'required',
            'checkbox' => 'required',
            'radio' => 'required',
            'file' => 'required',
            'text_area' => 'required',
            'file' => 'required|file|mimes:jpg,jpeg,png,pdf,docx|max:2048',
        ]);

        // Handle file upload
        $fileName = null;
        if ($request->hasFile('file')) {
            $file = $request->file('file');
            $fileName = Str::random(10) . '.' . $file->getClientOriginalExtension();
            // Move file directly to the 'public/saved_files/file_upload' folder
            $file->move(public_path('saved_files/file_upload'), $fileName);
        }
        return All_tools_all_in::create([
            'id' => $request->id,
            'text' => $request->text,
            'email' => $request->email,
            'age' => $request->age,
            'selection' => $request->selection,
            'datetime' => $request->datetime,
            'checkbox' => json_encode($request->checkbox),
            'radio' => $request->radio,
            'file' => $fileName,
            'text_area' => $request->text_area,
            'created_at' => $request->created_at,
            'updated_at' => $request->updated_at,
        ]);
    }

    public function show($id)
    {
        return All_tools_all_in::findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'text' => 'required',
            'email' => 'required',
            'age' => 'required',
            'selection' => 'required',
            'datetime' => 'required',
            'checkbox' => 'required',
            'radio' => 'required',
            'file' => 'required',
            'text_area' => 'required',
            'file' => 'nullable|file|mimes:jpg,jpeg,png,pdf,docx|max:2048',
        ]);

        // Find the existing record
        $model = All_tools_all_in::findOrFail($id);

        if ($request->hasFile('file')) {
            // Remove the old file if it exists
            if ($model->file) {
            \File::delete(public_path('saved_files/file_upload/' . $model->file));
            }
            $file = $request->file('file');
            $fileName = Str::random(10) . '.' . $file->getClientOriginalExtension();
            // Move file directly to the 'public/saved_files/file_upload' folder
            $file->move(public_path('saved_files/file_upload'), $fileName);
        }

        $model->update([
            'id' => $request->id,
            'text' => $request->text,
            'email' => $request->email,
            'age' => $request->age,
            'selection' => $request->selection,
            'datetime' => $request->datetime,
            'checkbox' => json_encode($request->checkbox),
            'radio' => $request->radio,
            'file' => isset($fileName) ? $fileName : $model->file,
            'text_area' => $request->text_area,
            'created_at' => $request->created_at,
            'updated_at' => $request->updated_at,
        ]);

        return response()->json([
            'message' => 'Record updated successfully!',
            'data' => $model,
        ]);
    }

    public function destroy($id)
    {
        $model = All_tools_all_in::findOrFail($id);

        // Remove the file if it exists
        if ($model->file) {
            \File::delete(public_path('saved_files/file_upload/' . $model->file));
        }

        $model->delete();

        return response()->json(['message' => 'Deleted successfully']);
    }
}
