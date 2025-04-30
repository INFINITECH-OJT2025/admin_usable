<?php

namespace App\Http\Controllers;

use App\Models\Checks_table;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Schema;

class Checks_tableController extends Controller
{
    public function index()
    {
        $items = Checks_table::all();
        $formattedItems = [];

        foreach ($items as $item) {
            $formattedItem = [];
            foreach ($item->getAttributes() as $key => $value) {
                if (is_array($value)) {
                    // Display array values without special characters
                    $formattedItem[$key] = implode(', ', array_map(function($val) {
                        // Debugging output to see the original value
                        // error_log('Original value: ' . print_r($val, true));
                        return preg_replace('/[\/(),]/', '', $val); // Remove slashes, parentheses, and commas
                    }, $value));
                } elseif (strpos($key, 'file') !== false) {
                    // Prepend URL for file fields
                    $formattedItem[$key] = 'http://127.0.0.1:8000/saved_files/file_upload/' . $value;
                } else {
                    $formattedItem[$key] = $value;
                }
            }
            $formattedItems[] = $formattedItem;
        }

        return response()->json($formattedItems);
    }

    public function store(Request $request)
    {
        $request->validate([
            'asdaasd' => 'required',
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
        return Checks_table::create([
            'id' => $request->id,
            'asdaasd' => json_encode($request->asdaasd),
            'file' => $fileName,
            'created_at' => $request->created_at,
            'updated_at' => $request->updated_at,
        ]);
    }

    public function show($id)
    {
        return Checks_table::findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'asdaasd' => 'required',
            'file' => 'required',
            'file' => 'nullable|file|mimes:jpg,jpeg,png,pdf,docx|max:2048',
        ]);

        // Find the existing record
        $model = Checks_table::findOrFail($id);

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
            'asdaasd' => json_encode($request->asdaasd),
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
        $model = Checks_table::findOrFail($id);

        // Remove the file if it exists
        if ($model->file) {
            \File::delete(public_path('saved_files/file_upload/' . $model->file));
        }

        $model->delete();

        return response()->json(['message' => 'Deleted successfully']);
    }
}
