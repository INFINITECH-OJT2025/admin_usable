<?php

namespace App\Http\Controllers;

use App\Models\Profile;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Schema;

class ProfileController extends Controller
{
    public function index()
    {
        return Profile::all();
    }

    public function store(Request $request)
    {
        $request->validate([
            'fullname' => 'required',
            'file' => 'required',
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
        return Profile::create([
            'id' => $request->id,
            'fullname' => $request->fullname,
            'file' => $fileName,
            'created_at' => $request->created_at,
            'updated_at' => $request->updated_at,
        ]);
    }

    public function show($id)
    {
        return Profile::findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'fullname' => 'required',
            'file' => 'required',
            'file' => 'nullable|file|mimes:jpg,jpeg,png,pdf,docx|max:2048',
        ]);

        // Find the existing record
        $model = Profile::findOrFail($id);

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
            'fullname' => $request->fullname,
            'file' => isset($fileName) ? $fileName : $model->file,
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
        $model = Profile::findOrFail($id);

        // Remove the file if it exists
        if ($model->file) {
            \File::delete(public_path('saved_files/file_upload/' . $model->file));
        }

        $model->delete();

        return response()->json(['message' => 'Deleted successfully']);
    }
}
