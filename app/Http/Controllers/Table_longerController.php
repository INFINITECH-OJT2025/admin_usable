<?php

namespace App\Http\Controllers;

use App\Models\Table_longer;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Schema;

class Table_longerController extends Controller
{
    public function index()
    {
        return Table_longer::all();
    }

    public function store(Request $request)
    {
        $request->validate([
            'text' => 'required',
            'email' => 'required',
            'birth_date' => 'required',
            'file' => 'required',
            'text_area' => 'required',
            'gender' => 'required',
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
        return Table_longer::create([
            'id' => $request->id,
            'text' => $request->text,
            'email' => $request->email,
            'birth_date' => $request->birth_date,
            'file' => $fileName,
            'text_area' => $request->text_area,
            'gender' => $request->gender,
            'created_at' => $request->created_at,
            'updated_at' => $request->updated_at,
        ]);
    }

    public function show($id)
    {
        return Table_longer::findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'text' => 'required',
            'email' => 'required',
            'birth_date' => 'required',
            'file' => 'required',
            'text_area' => 'required',
            'gender' => 'required',
            'file' => 'nullable|file|mimes:jpg,jpeg,png,pdf,docx|max:2048',
        ]);

        // Find the existing record
        $model = Table_longer::findOrFail($id);

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
            'birth_date' => $request->birth_date,
            'file' => isset($fileName) ? $fileName : $model->file,
            'text_area' => $request->text_area,
            'gender' => $request->gender,
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
        $model = Table_longer::findOrFail($id);

        // Remove the file if it exists
        if ($model->file) {
            \File::delete(public_path('saved_files/file_upload/' . $model->file));
        }

        $model->delete();

        return response()->json(['message' => 'Deleted successfully']);
    }
}
