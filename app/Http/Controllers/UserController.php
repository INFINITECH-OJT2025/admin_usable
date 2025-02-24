<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;

class UserController extends Controller
{
    public function index()
    {
        // Fetch all users
        $users = User::all();

        // Return response as JSON
        return response()->json($users);
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
        } elseif ($user->status === 'Allowed') {
            $newStatus = 'Blocked';
        } else {
            $newStatus = 'Allowed';
        }

        // Update the status
        $user->status = $newStatus;
        $user->save();

        return response()->json(['message' => 'User status updated successfully', 'status' => $newStatus], 200);
    }

}
