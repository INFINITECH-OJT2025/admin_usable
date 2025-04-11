<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Form;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\File;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;
use Carbon\Carbon;


class FormController extends Controller
{
    public function store(Request $request)
    {
        // Validate the request
        $request->validate([
            'fields' => 'required|array',
            'tableName' => 'required|string|alpha_dash', // Validate tableName
        ]);
    
        // Log the incoming fields
        \Log::info('Incoming fields:', $request->fields);
    
        // Create the form
        $form = Form::create([
            'fields' => json_encode($request->fields),
            'tableName' => $request->tableName, // Store the tableName
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

    public function getFormStatus(Request $request)
    {
        // Check if the 'status' query parameter is set to 'enabled'
        if ($request->query('status') === 'enabled') {
            // Fetch forms with status 'enabled'
            $forms = Form::where('status', 'enabled')->get();

            // Return the forms as a JSON response
            return response()->json($forms, 200);
        }

        // If no status is specified or it's not 'enabled', return all forms or handle accordingly
        $forms = Form::orderBy('id', 'desc')->get();
        return response()->json($forms, 200);
    }

    public function getTables()
    {
        $tables = DB::select('SHOW TABLES');
        return response()->json($tables);
    }

    public function createTable(Request $request)
    {
        \Log::info('Incoming request data:', $request->all());
    
        // Validate the request
        $request->validate([
            'tableName' => 'required|string|alpha_dash',
            'fields' => 'required|array',
            'fields.*.columnName' => 'required|string|alpha_dash',
            'fields.*.datatype' => 'required|string',
            'fields.*.length' => 'nullable|integer',
            'fields.*.defaultValue' => 'nullable|string',
            'fields.*.nullValue' => 'nullable|boolean',
            'fields.*.autoIncrement' => 'nullable|boolean',
            'fields.*.options' => 'nullable|array', // Add validation for options
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
            
            // Handle length only for types that require it
            $length = '';
            if (in_array($datatype, ['VARCHAR', 'CHAR', 'DECIMAL', 'FLOAT', 'DOUBLE'])) {
                $length = isset($field['length']) ? "({$field['length']})" : '';
            } elseif ($datatype === 'ENUM' && isset($field['options'])) {
                // Handle ENUM type
                $options = implode("','", array_map('addslashes', $field['options'])); // Escape options
                $length = "('{$options}')";
            }
        
            $nullValue = isset($field['nullValue']) ? ($field['nullValue'] ? 'NULL' : 'NOT NULL') : 'NOT NULL';
            
            // Handle default value for integers
            $defaultValue = '';
            if (isset($field['defaultValue'])) {
                if (is_numeric($field['defaultValue'])) {
                    $defaultValue = "DEFAULT {$field['defaultValue']}";
                } else {
                    $defaultValue = "DEFAULT '{$field['defaultValue']}'"; // For non-integer types
                }
            }
        
            $autoIncrement = isset($field['autoIncrement']) && $field['autoIncrement'] ? 'AUTO_INCREMENT' : '';
        
            $sql .= "`$columnName` $datatype$length $nullValue $defaultValue $autoIncrement,";
        }
    
        // Add created_at and updated_at columns
        $sql .= "`created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,";
        $sql .= "`updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,";
        
        $sql = rtrim($sql, ',') . ");";
        
        // Execute the SQL query
        try {
            DB::statement($sql);
            return response()->json(['message' => 'Table created successfully!'], 201);
        } catch (\Exception $e) {
            \Log::error('Failed to create table: ' . $e->getMessage());
            return response()->json(['error' => 'Failed to create table: ' . $e->getMessage()], 500);
        }
    }

    public function delTable($id, $tableName)
    {
        // Find the form by ID
        $form = Form::findOrFail($id);
        
        // Get the table name associated with the form
        $tableName = $form->tableName; // Assuming you have a tableName column in your forms table
    
        // Delete the form
        $form->delete();
    
        // Delete the associated table
        DB::statement("DROP TABLE IF EXISTS `$tableName`");
    
        // Delete the associated model
        $modelName = ucfirst($tableName);
        $modelPath = app_path("Models/{$modelName}.php");
        if (file_exists($modelPath)) {
            unlink($modelPath); // Delete the model file
        }
    
        // Delete the associated controller
        $controllerPath = app_path("Http/Controllers/{$modelName}Controller.php");
        if (file_exists($controllerPath)) {
            unlink($controllerPath); // Delete the controller file
        }
    
        // Remove the routes from routes/api.php
        $routesPath = base_path('routes/api.php');
        if (file_exists($routesPath)) {
            // Read the current content of the routes file
            $currentRoutes = file_get_contents($routesPath);
    
            // Define the routes to remove
            $routesToRemove = [
                "use App\Http\Controllers\\{$modelName}Controller;",
                "Route::get('{$tableName}', [{$modelName}Controller::class, 'index']);",
                "Route::post('{$tableName}', [{$modelName}Controller::class, 'store']);",
                "Route::get('{$tableName}/{id}', [{$modelName}Controller::class, 'show']);",
                "Route::post('{$tableName}/{id}', [{$modelName}Controller::class, 'update']);",
                "Route::delete('{$tableName}/{id}', [{$modelName}Controller::class, 'destroy']);"
            ];
    
            // Remove the routes from the current content
            foreach ($routesToRemove as $route) {
                // Use regex to remove the route line, ensuring we capture any leading/trailing whitespace
                $currentRoutes = preg_replace('/^\s*' . preg_quote($route, '/') . '\s*$/m', '', $currentRoutes);
            }
    
            // Write the updated content back to the routes file
            file_put_contents($routesPath, $currentRoutes);
        }
    
        return response()->json(['message' => 'Form, associated table, model, controller, and routes deleted successfully!'], 200);
    }

    public function createModelAndController(Request $request)
    {
        // Validate the request
        $request->validate([
            'tableName' => 'required|string|alpha_dash',
            'formId' => 'required|integer', // Validate formId
        ]);
    
        $tableName = $request->input('tableName');
        $formId = $request->input('formId'); // Get the form ID from the request
        $modelName = ucfirst($tableName); // Capitalize the first letter for the model name
        $modelPath = app_path("Models/{$modelName}.php");
        $controllerPath = app_path("Http/Controllers/{$modelName}Controller.php");
    
        // Check the 'backend' field in the Form model using the formId
        $form = Form::find($formId); // Assuming you have a Form model
        if (!$form) {
            return response()->json(['error' => 'Form not found.'], 404);
        }
    
        if ($form->backend === 'done') {
            return response()->json(['message' => 'Backend already created!'], 400);
        }
    
        // Generate the model
        Artisan::call("make:model {$modelName}");
    
        // Generate the controller
        Artisan::call("make:controller {$modelName}Controller");
    
        // Check if the controller was created
        if (!file_exists($controllerPath)) {
            return response()->json(['error' => 'Controller not created.'], 500);
        }
    
        // Add fields to the model
        $fields = Schema::getColumnListing($tableName); // Get the fields from the table
        $modelContent = "<?php\n\nnamespace App\Models;\n\nuse Illuminate\Database\Eloquent\Factories\HasFactory;\nuse Illuminate\Database\Eloquent\Model;\n\nclass {$modelName} extends Model\n{\n    use HasFactory;\n\n    protected \$table = '{$tableName}';\n\n    protected \$fillable = [\n";
    
        foreach ($fields as $field) {
            if ($field !== 'id' && $field !== 'created_at' && $field !== 'updated_at') {
                $modelContent .= "        '{$field}',\n"; // Add each field to the fillable array, excluding id, created_at, and updated_at
            }
        }
    
        $modelContent .= "    ];\n}\n";
    
        // Write the model content to the model file
        file_put_contents($modelPath, $modelContent);
    
        // Add CRUD methods to the controller
        $controllerContent = "<?php\n\nnamespace App\Http\Controllers;\n\nuse App\Models\\{$modelName};\nuse Illuminate\Http\Request;\nuse Illuminate\Support\Str;\nuse Illuminate\Support\Facades\Schema;\n\nclass {$modelName}Controller extends Controller\n{\n    public function index()\n    {\n        return {$modelName}::all();\n    }\n\n    public function store(Request \$request)\n    {\n        \$request->validate([\n";

        // Loop through fields to add validation
        foreach ($fields as $field) {
            if ($field !== 'id' && $field !== 'created_at' && $field !== 'updated_at') {
                $controllerContent .= "            '{$field}' => 'required',\n"; // Add validation for each field
            }
        }
        
        // Add file upload handling
        if (in_array('file', $fields)) {
            $controllerContent .= "            'file' => 'required|file|mimes:jpg,jpeg,png,pdf,docx|max:2048',\n"; // Validate the file upload
        }
        
        $controllerContent .= "        ]);\n\n";
        $controllerContent .= "        // Handle file upload\n";
        $fileHandlingCode = "        \$fileName = null;\n";
        if (in_array('file', $fields)) {
            $fileHandlingCode .= "        if (\$request->hasFile('file')) {\n";
            $fileHandlingCode .= "            \$file = \$request->file('file');\n";
            $fileHandlingCode .= "            \$fileName = Str::random(10) . '.' . \$file->getClientOriginalExtension();\n"; // Randomized file name
            $fileHandlingCode .= "            // Move file directly to the 'public/saved_files/file_upload' folder\n";
            $fileHandlingCode .= "            \$file->move(public_path('saved_files/file_upload'), \$fileName);\n";
            $fileHandlingCode .= "        }\n";
        }
        $controllerContent .= $fileHandlingCode;
        
        $controllerContent .= "        return {$modelName}::create([\n";
        
        // Loop through fields to prepare data for creation
        foreach ($fields as $field) {
            $fieldType = Schema::getColumnType($tableName, $field); // Get the field type from the schema
            if ($fieldType === 'json') {
                $controllerContent .= "            '{$field}' => json_encode(\$request->{$field}),\n"; // JSON encode for JSON fields
            } else if ($field === 'file') {
                $controllerContent .= "            'file' => \$fileName,\n"; // Save only the file name
            } else {
                $controllerContent .= "            '{$field}' => \$request->{$field},\n"; // Normal assignment
            }
        }
        
        $controllerContent .= "        ]);\n    }\n\n";
        
        $controllerContent .= "    public function show(\$id)\n    {\n        return {$modelName}::findOrFail(\$id);\n    }\n\n";
        
        $controllerContent .= "    public function update(Request \$request, \$id)\n    {\n        \$request->validate([\n";
        
        // Loop through fields to add validation for update
        foreach ($fields as $field) {
            if ($field !== 'id' && $field !== 'created_at' && $field !== 'updated_at') {
                $controllerContent .= "            '{$field}' => 'required',\n"; // Add validation for each field
            }
        }
        
        // Add file upload handling for update
        if (in_array('file', $fields)) {
            $controllerContent .= "            'file' => 'nullable|file|mimes:jpg,jpeg,png,pdf,docx|max:2048',\n"; // Validate the file upload (optional)
        }
        
        $controllerContent .= "        ]);\n\n";
        $controllerContent .= "        // Find the existing record\n";
        $controllerContent .= "        \$model = {$modelName}::findOrFail(\$id);\n\n";
        
        // Handle file upload for update
        if (in_array('file', $fields)) {
            $controllerContent .= "        if (\$request->hasFile('file')) {\n";
            $controllerContent .= "            // Remove the old file if it exists\n";
            $controllerContent .= "            if (\$model->file) {\n";
            $controllerContent .= "            \File::delete(public_path('saved_files/file_upload/' . \$model->file));\n"; // Delete the file\n";
            $controllerContent .= "            }\n";
            $controllerContent .= "            \$file = \$request->file('file');\n";
            $controllerContent .= "            \$fileName = Str::random(10) . '.' . \$file->getClientOriginalExtension();\n"; // Randomized file name
            $controllerContent .= "            // Move file directly to the 'public/saved_files/file_upload' folder\n";
            $controllerContent .= "            \$file->move(public_path('saved_files/file_upload'), \$fileName);\n";
            $controllerContent .= "        }\n\n";
        }
        
        // Update the record in the database
        $controllerContent .= "        \$model->update([\n";
        
        // Loop through fields to prepare data for update
        foreach ($fields as $field) {
            $fieldType = Schema::getColumnType($tableName, $field); // Get the field type from the schema
            if ($fieldType === 'json') {
                $controllerContent .= "            '{$field}' => json_encode(\$request->{$field}),\n"; // JSON encode for JSON fields
            } else if ($field === 'file') {
                $controllerContent .= "            'file' => isset(\$fileName) ? \$fileName : \$model->file,\n"; // Update file name if a new file was uploaded
            } else {
                $controllerContent .= "            '{$field}' => \$request->{$field},\n"; // Normal assignment
            }
        }
        
        $controllerContent .= "        ]);\n\n";
        
        // Return a response indicating success
        $controllerContent .= "        return response()->json([\n";
        $controllerContent .= "            'message' => 'Record updated successfully!',\n";
        $controllerContent .= "            'data' => \$model,\n";
        $controllerContent .= "        ]);\n    }\n\n";
        
        $controllerContent .= "    public function destroy(\$id)\n    {\n        \$model = {$modelName}::findOrFail(\$id);\n\n";
        $controllerContent .= "        // Remove the file if it exists\n";
        $controllerContent .= "        if (\$model->file) {\n";
        $controllerContent .= "            \File::delete(public_path('saved_files/file_upload/' . \$model->file));\n"; // Delete the file\n";
        $controllerContent .= "        }\n\n";
        $controllerContent .= "        \$model->delete();\n\n";
        $controllerContent .= "        return response()->json(['message' => 'Deleted successfully']);\n    }\n}\n";
        
        // Write the controller content to the controller file
        file_put_contents($controllerPath, $controllerContent);
    
        // Prepare the route content
        $routeContent = "\nuse App\Http\Controllers\\{$modelName}Controller;\n";
        $routeContent .= "Route::get('{$tableName}', [{$modelName}Controller::class, 'index']);\n";
        $routeContent .= "Route::post('{$tableName}', [{$modelName}Controller::class, 'store']);\n";
        $routeContent .= "Route::get('{$tableName}/{id}', [{$modelName}Controller::class, 'show']);\n";
        $routeContent .= "Route::post('{$tableName}/{id}', [{$modelName}Controller::class, 'update']);\n";
        $routeContent .= "Route::delete('{$tableName}/{id}', [{$modelName}Controller::class, 'destroy']);\n";
    
        // Define the path to the routes file
        $routesPath = base_path('routes/api.php');
    
        // Check if the routes file exists and append the route content
        if (file_exists($routesPath)) {
            // Append the route content to the routes file
            File::append($routesPath, $routeContent);
        } else {
            return response()->json(['error' => 'Routes file not found.'], 500);
        }
    
        // Update the 'backend' field to 'done'
        $form->backend = 'done'; // Set the backend field to 'done'
        $form->save(); // Save the changes to the form
    
        return response()->json(['message' => 'Backend created successfully!'], 200);
    }

    public function toggleFormStatus(Request $request, $id)
    {
        // Find the form by ID
        $form = Form::findOrFail($id);
    
        // Check the current status of the form
        if ($form->status === 'enabled') {
            // If the form is currently enabled, set it to disabled
            $form->status = 'disabled';
            $form->save();
            return response()->json(['message' => 'Form has been disabled successfully!'], 200);
        } else {
            // If the form is currently disabled, we need to disable any other enabled form
            $enabledForm = Form::where('status', 'enabled')->first();
    
            if ($enabledForm) {
                // Disable the currently enabled form
                $enabledForm->status = 'disabled';
                $enabledForm->save();
            }
    
            // Now enable the current form
            $form->status = 'enabled';
    
            // Increment the count field only when enabling
            $form->count = $form->count + 1;
    
            $form->save();
    
            return response()->json(['message' => 'Form has been enabled successfully!'], 200);
        }
    }

    public function getFormUsage(Request $request)
    {
        $groupBy = $request->query('groupBy', 'day');

        $query = Form::select(
            'tableName as formName', // Use 'tableName' as the form name
            DB::raw('SUM(count) as count') // Sum the usage count
        )
        ->groupBy('formName');

        // Apply filtering based on groupBy
        if ($groupBy === 'day') {
            $query->whereDate('updated_at', Carbon::today());
        } elseif ($groupBy === 'month') {
            $query->whereMonth('updated_at', Carbon::now()->month)
                ->whereYear('updated_at', Carbon::now()->year);
        } elseif ($groupBy === 'year') {
            $query->whereYear('updated_at', Carbon::now()->year);
        }

        $formUsage = $query->get();
        
        return response()->json($formUsage);
    }
    
}
