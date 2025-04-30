<?php

namespace App\Http\Controllers;

use App\Models\Check_table;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Schema;

class Check_tableController extends Controller
{
    public function index()
    {
        return Check_table::all();
    }

    public function store(Request $request)
    {
        $request->validate([
            'checkbox' => 'required',
            'text' => 'required',
        ]);

        // Handle file upload
        $fileName = null;
        return Check_table::create([
            'id' => $request->id,
            'checkbox' => json_encode($request->checkbox),
            'text' => $request->text,
            'created_at' => $request->created_at,
            'updated_at' => $request->updated_at,
        ]);
    }

    public function show($id)
    {
        return Check_table::findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'checkbox' => 'required',
            'text' => 'required',
        ]);

        // Find the existing record
        $model = Check_table::findOrFail($id);

        $model->update([
            'id' => $request->id,
            'checkbox' => json_encode($request->checkbox),
            'text' => $request->text,
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
        $model = Check_table::findOrFail($id);

        // Remove the file if it exists
        if ($model->file) {
            \File::delete(public_path('saved_files/file_upload/' . $model->file));
        }

        $model->delete();

        return response()->json(['message' => 'Deleted successfully']);
    }
}
