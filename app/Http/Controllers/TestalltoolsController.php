<?php

namespace App\Http\Controllers;

use App\Models\Testalltools;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Schema;

class TestalltoolsController extends Controller
{
    public function index()
    {
        return Testalltools::all();
    }

    public function store(Request $request)
    {
        $request->validate([
            'full_name' => 'required',
            'email' => 'required',
            'age' => 'required',
            'favorite_food' => 'required',
            'birth_date' => 'required',
            'gender' => 'required',
            'favorite_color' => 'required',
            'file' => 'required',
            'describe_yourself' => 'required',
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
        return Testalltools::create([
            'id' => $request->id,
            'full_name' => $request->full_name,
            'email' => $request->email,
            'age' => $request->age,
            'favorite_food' => $request->favorite_food,
            'birth_date' => $request->birth_date,
            'gender' => json_encode($request->gender),
            'favorite_color' => $request->favorite_color,
            'file' => $fileName,
            'describe_yourself' => $request->describe_yourself,
            'created_at' => $request->created_at,
            'updated_at' => $request->updated_at,
        ]);
    }

    public function show($id)
    {
        return Testalltools::findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'full_name' => 'required',
            'email' => 'required',
            'age' => 'required',
            'favorite_food' => 'required',
            'birth_date' => 'required',
            'gender' => 'required',
            'favorite_color' => 'required',
            'file' => 'required',
            'describe_yourself' => 'required',
            'file' => 'nullable|file|mimes:jpg,jpeg,png,pdf,docx|max:2048',
        ]);

        // Find the existing record
        $model = Testalltools::findOrFail($id);

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
            'full_name' => $request->full_name,
            'email' => $request->email,
            'age' => $request->age,
            'favorite_food' => $request->favorite_food,
            'birth_date' => $request->birth_date,
            'gender' => json_encode($request->gender),
            'favorite_color' => $request->favorite_color,
            'file' => isset($fileName) ? $fileName : $model->file,
            'describe_yourself' => $request->describe_yourself,
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
        $model = Testalltools::findOrFail($id);

        // Remove the file if it exists
        if ($model->file) {
            \File::delete(public_path('saved_files/file_upload/' . $model->file));
        }

        $model->delete();

        return response()->json(['message' => 'Deleted successfully']);
    }
}
