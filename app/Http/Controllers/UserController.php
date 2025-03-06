<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Response;
use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;
use PhpOffice\PhpSpreadsheet\Writer\Csv;
use Barryvdh\DomPDF\Facade\PDF;
use App\Events\NotificationSent;
use App\Models\Notification;
use App\Models\User;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;
use Carbon\Carbon;

class UserController extends Controller
{
    public function index()
    {
        // Fetch all users
        $users = User::all();

        // Return response as JSON
        return response()->json($users);
    }


    private function sendNotification($message, $path)
    {
        // Create the notification
        $notification = Notification::create([
            'message' => $message,
            'path' => $path,
        ]);

        // Broadcast the event
        broadcast(new NotificationSent($notification))->toOthers();
    }


    public function markAsRead($id)
    {
        $notification = Notification::find($id);
        $notification->status = 'read';
        $notification->save();

        return response()->json($notification);
    }

    public function countUsers()
    {
        $adminCount = User::where('usertype', 'admin')->count();
        $userCount = User::where('usertype', 'user')->count();

        return response()->json([
            'admin_count' => $adminCount,
            'user_count' => $userCount,
        ]);
    }


    public function getAdmins()
    {
        // Fetch only users with the 'admin' usertype
        $admins = User::where('usertype', 'admin')->get();

        return response()->json($admins);
    }

    public function registerAdmin(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'username' => 'required|string|max:255|unique:users',
            'fullname' => 'required|string|max:255|unique:users',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6',
            'profile_image' => 'nullable|image|mimes:jpg,jpeg,png|max:2048', // Image validation
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        // Handle file upload
        $imagePath = null;
        if ($request->hasFile('profile_image')) {
            $image = $request->file('profile_image');
            $imageName = time() . '_' . $image->getClientOriginalName(); // Unique filename
            $image->move(public_path('profile_images'), $imageName); // Save in public/profile_images
            $imagePath = 'profile_images/' . $imageName; // Path stored in DB
        }

        // Create user
        $user = User::create([
            'username' => $request->username,
            'fullname' => $request->fullname,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'profile_image' => $imagePath, // Save relative path in DB
            'usertype' => 'admin', // Default user type
        ]);
        $this->sendNotification('New admin registered: ' . $request->fullname, '/Profile');

        return response()->json(['message' => 'User registered successfully!', 'user' => $user], 201);
    }

    // Update user
    public function update(Request $request, $id)
    {
        Log::info('Update request received', ['id' => $id, 'data' => $request->all()]);
    
        $user = User::find($id);
    
        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }
    
        // Validate input
        $validator = Validator::make($request->all(), [
            'username' => 'required|string|max:255',
            'fullname' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email,' . $id,
        ]);
    
        if ($validator->fails()) {
            Log::error('Validation failed', ['errors' => $validator->errors()]);
            return response()->json(['errors' => $validator->errors()], 400);
        }
    
        // Update user data
        $user->username = $request->username;
        $user->fullname = $request->fullname;
        $user->email = $request->email;
        $user->save();

        $this->sendNotification($request->fullname . ' updated their user profile', '/User');
    
        Log::info('User updated successfully', ['user' => $user]);
    
        return response()->json($user, 200);
    }

    public function updateAdmin(Request $request, $id)
    {
        Log::info('Update request received', ['id' => $id, 'data' => $request->all()]);
    
        $user = User::find($id);
    
        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }
    
        // Validate input
        $validator = Validator::make($request->all(), [
            'username' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email,' . $id,
        ]);
    
        if ($validator->fails()) {
            Log::error('Validation failed', ['errors' => $validator->errors()]);
            return response()->json(['errors' => $validator->errors()], 400);
        }
    
        // Update user data
        $user->username = $request->username;
        $user->email = $request->email;
        $user->save();

        $this->sendNotification($request->fullname . ' updated their admin profile', '/Profile');

        Log::info('User updated successfully', ['user' => $user]);
    
        return response()->json($user, 200);
    }

    public function updateUser(Request $request, $id)
    {
        $user = User::findOrFail($id);
    
        // Update text fields
        $user->fullname = $request->input('fullname');
        $user->username = $request->input('username');
        $user->email = $request->input('email');
    
        // Handle profile image upload
        if ($request->hasFile('profile_image')) {
            // Delete old image if it exists
            if ($user->profile_image && File::exists(public_path($user->profile_image))) {
                File::delete(public_path($user->profile_image));
            }
    
            // Store new image in public/profile_images
            $image = $request->file('profile_image');
            $imageName = time() . '_' . $image->getClientOriginalName();
            $image->move(public_path('profile_images'), $imageName);
    
            // Save relative path to database
            $user->profile_image = 'profile_images/' . $imageName;
        }
    
        $user->save();

        $this->sendNotification($request->fullname . ' updated their user profile', '/Profile');

        return response()->json([
            'message' => 'Profile updated successfully',
            'user' => $user
        ]);
    }
    


    // Delete user
    public function destroy($id)
    {
        $user = User::find($id);
        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        $user->delete();

        return response()->json(['message' => 'User deleted successfully'], 200);
    }

    public function updateStatus(Request $request, $id)
    {
        $user = User::find($id);
        
        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        // Determine the new status
        if ($user->status === 'Pending') {
            $newStatus = 'Allowed';
            $this->sendNotification($user->fullname . ' was Allowed to Login', '/User');
        } elseif ($user->status === 'Allowed') {
            $newStatus = 'Blocked';
            $this->sendNotification($user->fullname . ' was Blocked to Login', '/User');
        } else {
            $newStatus = 'Allowed';
            $this->sendNotification($user->fullname . ' was Allowed to Login', '/User');
        }

        // Update the status
        $user->status = $newStatus;
        $user->save();

        return response()->json(['message' => 'User status updated successfully', 'status' => $newStatus], 200);
    }



    // GRAPHS AND CHARTS

    public function getUserRegistrations(Request $request)
    {
        $groupBy = $request->query('groupBy', 'day'); // Default to 'day'
        
        $query = User::query();
        
        switch ($groupBy) {
            case 'month':
                $query->selectRaw('DATE_FORMAT(created_at, "%Y-%m") as period, COUNT(*) as count')
                    ->groupBy('period');
                break;
            case 'year':
                $query->selectRaw('YEAR(created_at) as period, COUNT(*) as count')
                    ->groupBy('period');
                break;
            default:
                $query->selectRaw('DATE(created_at) as period, COUNT(*) as count')
                    ->groupBy('period');
        }

        $data = $query->orderBy('period', 'ASC')->get();
        
        return response()->json($data);
    }


    // FILTERING

    public function filterUsers(Request $request)
    {
        $query = User::query();
    
        // Apply user type filter if provided
        if ($request->has('userType') && !empty($request->userType)) {
            $query->where('usertype', $request->userType);
        }
    
        // Apply status filter if provided
        if ($request->has('status') && !empty($request->status)) {
            $query->where('status', $request->status);
        }
    
        // Apply search filter if provided
        if ($request->has('search') && !empty($request->search)) {
            $query->where(function ($q) use ($request) {
                $q->where('username', 'like', '%' . $request->search . '%')
                  ->orWhere('fullname', 'like', '%' . $request->search . '%')
                  ->orWhere('email', 'like', '%' . $request->search . '%');
            });
        }
    
        $users = $query->get(); // Fetch the filtered users
        return response()->json($users);
    }

    public function exportUsers(Request $request)
    {
        // Filter users based on the request parameters
        $users = User::query();
    
        if ($request->has('usertype') && $request->usertype) {
            $users->where('usertype', $request->usertype);
        }
        if ($request->has('status') && $request->status) {
            $users->where('status', $request->status);
        }
        if ($request->has('search') && $request->search) {
            $users->where(function ($query) use ($request) {
                $query->where('username', 'like', '%' . $request->search . '%')
                    ->orWhere('fullname', 'like', '%' . $request->search . '%')
                    ->orWhere('email', 'like', '%' . $request->search . '%');
            });
        }
    
        // Get the filtered users
        $users = $users->get();
    
        // Check for export type
        $type = $request->query('type', 'pdf'); // Default to PDF if not specified
    
        if ($type === 'csv') {
            return $this->exportCSV($users);
        }
    
        // If PDF
        $pdf = PDF::loadView('pdf.users', compact('users'));
        return $pdf->download('users.pdf');
    }
    
    public function exportCSV(Collection $users)
    {
        $csvData = "ID, Username, Fullname, Email, User Type, Status, Created At\n";
    
        foreach ($users as $user) {
            $csvData .= "{$user->id}, {$user->username}, {$user->fullname}, {$user->email}, {$user->usertype}, {$user->status}, {$user->created_at}\n";
        }
    
        return response($csvData)
            ->header('Content-Type', 'text/csv')
            ->header('Content-Disposition', 'attachment; filename="users.csv"');
    }
    
    
    
    
    

    // CHECKBOXES

    // public function getPermissions($id)
    // {
    //     $user = User::find($id);

    //     if (!$user) {
    //         return response()->json(['message' => 'User not found'], 404);
    //     }

    //     $permittedRoutes = json_decode($user->permitted_route, true) ?? [];
    //     return response()->json(['permitted_routes' => $permittedRoutes]);
    // }

    public function getPermissions($id)
    {
        $user = User::findOrFail($id);
        
        return response()->json([
            'permitted_route' => json_decode($user->permitted_route, true) ?? []
        ]);
    }

    public function getUserPermissions($authToken)
    {
        // Find the user by ID (authToken is assumed to be the user ID here)
        $user = User::where('authToken', $authToken)->first();
    
        return response()->json([
            'permitted_route' => json_decode($user->permitted_route, true) ?? []
        ]);
    }
    

    public function updatePermissions(Request $request, $id)
    {
        $user = User::findOrFail($id);

        // Ensure the input is stored as JSON
        $user->permitted_route = json_encode($request->permitted_route);
        $user->save();

        return response()->json(['message' => 'Permissions updated successfully!']);
    }


    // Update the permitted routes for a user
    // public function updatePermissions(Request $request, $id)
    // {
    //     $user = User::find($id);

    //     if (!$user) {
    //         return response()->json(['message' => 'User not found'], 404);
    //     }

    //     $validatedData = $request->validate([
    //         'permitted_routes' => 'array', // Ensure it's an array
    //         'permitted_routes.*' => 'string' // Ensure each item in the array is a string
    //     ]);

    //     $user->permitted_route = json_encode($validatedData['permitted_routes']);
    //     $user->save();

    //     return response()->json([
    //         'message' => 'Permissions updated successfully',
    //         'permitted_routes' => json_decode($user->permitted_route, true)
    //     ]);
    // }
}
