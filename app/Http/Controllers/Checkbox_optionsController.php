<?php

namespace App\Http\Controllers;

use App\Models\Checkbox_options;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Schema;

class Checkbox_optionsController extends Controller
{
    public function index()
    {
        $items = Checkbox_options::all();
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
            'checkbox_options' => 'required',
        ]);

        // Handle file upload
        $fileName = null;
        return Checkbox_options::create([
            'id' => $request->id,
            'checkbox_options' => json_encode($request->checkbox_options),
            'created_at' => $request->created_at,
            'updated_at' => $request->updated_at,
        ]);
    }

    public function show($id)
    {
        return Checkbox_options::findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'checkbox_options' => 'required',
        ]);

        // Find the existing record
        $model = Checkbox_options::findOrFail($id);

        $model->update([
            'id' => $request->id,
            'checkbox_options' => json_encode($request->checkbox_options),
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
        $model = Checkbox_options::findOrFail($id);

        // Remove the file if it exists
        if ($model->file) {
            \File::delete(public_path('saved_files/file_upload/' . $model->file));
        }

        $model->delete();

        return response()->json(['message' => 'Deleted successfully']);
    }
}
