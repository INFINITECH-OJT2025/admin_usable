<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Form;
use Illuminate\Support\Facades\DB;

class FormController extends Controller
{
    public function store(Request $request)
    {
        $form = Form::create([
            'fields' => json_encode($request->fields),
        ]);

        return response()->json($form, 201);
    }

    public function show()
    {
        $forms = Form::orderBy('id', 'desc')->get(); // Retrieve all forms ordered by id descending
    
        if ($forms->isEmpty()) {
            return response()->json(['message' => 'No forms found'], 404);
        }
    
        return response()->json($forms);
    }

    // public function createTable(Request $request)
    // {
    //     $fields = $request->input('fields');

    //     // Build the SQL query to create the table
    //     $tableName = $field['tableName']; // You can customize this
    //     $sql = "CREATE TABLE $tableName (";

    //     foreach ($fields as $field) {
    //         $sql .= "{$field['columnName']} {$field['datatype']}";

    //         if (isset($field['length'])) {
    //             $sql .= "({$field['length']})";
    //         }

    //         if ($field['nullValue']) {
    //             $sql .= " NULL";
    //         } else {
    //             $sql .= " NOT NULL";
    //         }

    //         if ($field['defaultValue']) {
    //             $sql .= " DEFAULT '{$field['defaultValue']}'";
    //         }

    //         if ($field['autoIncrement']) {
    //             $sql .= " AUTO_INCREMENT";
    //         }

    //         // Add a comma after each field definition
    //         $sql .= ",";
    //     }

    //     // Remove the last comma and close the SQL statement
    //     $sql = rtrim($sql, ',') . ");";

    //     // Execute the SQL query
    //     try {
    //         DB::statement($sql);
    //         return response()->json(['message' => 'Table created successfully!'], 201);
    //     } catch (\Exception $e) {
    //         return response()->json(['error' => 'Failed to create table: ' . $e->getMessage()], 500);
    //     }
    // }

    public function createTable(Request $request)
    {
        // Validate the request
        $request->validate([
            'tableName' => 'required|string|alpha_dash',
            'fields' => 'required|array',
            'fields.*.columnName' => 'required|string|alpha_dash',
            'fields.*.datatype' => 'required|string',
            'fields.*.length' => 'nullable|integer',
            'fields.*.defaultValue' => 'nullable|string',
            'fields.*.nullValue' => 'nullable|boolean', // Change to nullable
            'fields.*.autoIncrement' => 'nullable|boolean', // Change to nullable
        ]);
    
        $fields = $request->input('fields');
        $tableName = $request->input('tableName');
        $tableName = preg_replace('/[^a-zA-Z0-9_]/', '', $tableName);
    
        // Build the SQL query to create the table
        $sql = "CREATE TABLE `$tableName` (";
        $sql .= "`id` BIGINT AUTO_INCREMENT PRIMARY KEY,"; // Add id column
    
        foreach ($fields as $field) {
            $columnName = preg_replace('/[^a-zA-Z0-9_]/', '', $field['columnName']);
            $datatype = $field['datatype'];
            $length = isset($field['length']) ? "({$field['length']})" : '';
            $nullValue = isset($field['nullValue']) ? ($field['nullValue'] ? 'NULL' : 'NOT NULL') : 'NOT NULL'; // Default to NOT NULL if not set
            $defaultValue = isset($field['defaultValue']) ? "DEFAULT '{$field['defaultValue']}'" : '';
            $autoIncrement = isset($field['autoIncrement']) && $field['autoIncrement'] ? 'AUTO_INCREMENT' : '';
    
            $sql .= "`$columnName` $datatype$length $nullValue $defaultValue $autoIncrement,";
        }
    
        $sql = rtrim($sql, ',') . ");";
    
        // Execute the SQL query
        try {
            DB::statement($sql);
            return response()->json(['message' => 'Table created successfully!'], 201);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to create table: ' . $e->getMessage()], 500);
        }
    }
}
