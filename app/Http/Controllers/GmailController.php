<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Google_Client;
use Google_Service_Gmail;
use Google_Service_Gmail_ModifyMessageRequest;
use Illuminate\Support\Facades\Session;

class GmailController extends Controller
{
    // Redirect user to Google's OAuth page
    public function redirectToGoogle()
    {
        $client = new Google_Client();
        $client->setClientId(env('GOOGLE_CLIENT_ID'));
        $client->setClientSecret(env('GOOGLE_CLIENT_SECRET'));
        $client->setRedirectUri(env('GOOGLE_REDIRECT_URI'));
        $client->addScope([
            "https://www.googleapis.com/auth/gmail.readonly",
            "https://www.googleapis.com/auth/gmail.modify",
            "https://www.googleapis.com/auth/userinfo.email",
            "https://www.googleapis.com/auth/userinfo.profile"
        ]);
        $client->setAccessType("offline");

        return response()->json(['url' => $client->createAuthUrl()]);
    }

    public function handleGoogleCallback(Request $request)
    {
        $client = new Google_Client();
        $client->setClientId(env('GOOGLE_CLIENT_ID'));
        $client->setClientSecret(env('GOOGLE_CLIENT_SECRET'));
        $client->setRedirectUri(env('GOOGLE_REDIRECT_URI'));
    
        // Exchange auth code for access & refresh token
        $token = $client->fetchAccessTokenWithAuthCode($request->code);
    
        if (isset($token['error'])) {
            return response()->json(['error' => 'Authentication failed'], 400);
        }
    
        // ✅ Store tokens in session (or database)
        session([
            'google_access_token' => $token['access_token'],
            'google_refresh_token' => $token['refresh_token'] ?? null, // Only available the first time
            'google_token_expires' => now()->addSeconds($token['expires_in']) // Save expiry time
        ]);
    
        return redirect()->to('http://localhost:3000/Mail?token=' . $token['access_token']);
        // var_dump(env('GOOGLE_REDIRECT_URI'));
    }

    public function refreshToken(Request $request)
    {
        $refreshToken = session('google_refresh_token'); // Retrieve the refresh token from session
    
        if (!$refreshToken) {
            return response()->json(['error' => 'No refresh token'], 403);
        }
    
        $client = new Google_Client();
        $client->setClientId(env('GOOGLE_CLIENT_ID'));
        $client->setClientSecret(env('GOOGLE_CLIENT_SECRET'));
        $client->refreshToken($refreshToken);
        $newToken = $client->getAccessToken();
    
        return response()->json($newToken);
    }


    public function getUserInfo(Request $request)
    {
        try {
            $accessToken = $request->bearerToken();

            if (!$accessToken) {
                return response()->json(['error' => 'No token provided.'], 401);
            }

            $client = new \GuzzleHttp\Client();
            $response = $client->get('https://www.googleapis.com/oauth2/v3/userinfo', [
                'headers' => [
                    'Authorization' => 'Bearer ' . $accessToken,
                ]
            ]);

            $userInfo = json_decode($response->getBody(), true);

            return response()->json($userInfo);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to fetch user info', 'message' => $e->getMessage()], 500);
        }
    }

    
    public function fetchEmails(Request $request) 
    {
        try {
            $client = new Google_Client();
            $client->setClientId(env('GOOGLE_CLIENT_ID'));
            $client->setClientSecret(env('GOOGLE_CLIENT_SECRET'));
    
            // Retrieve token from Authorization header
            $accessToken = $request->bearerToken();
    
            if (!$accessToken) {
                return response()->json(['error' => 'No token provided. Please log in again.'], 401);
            }
    
            // Set the access token for Google Client
            $client->setAccessToken($accessToken);
    
            // Initialize Gmail Service
            $service = new Google_Service_Gmail($client);
    
            // Get the filter type from the query parameter
            $filter = $request->query('filter', 'inbox'); // Default to 'inbox' if no filter is provided
    
            // Define the query filter based on the passed filter type
            $filterQueries = [
                'inbox' => 'in:inbox',
                'unread' => 'is:unread', // New filter for unread emails
                'sent' => 'in:sent',
                'draft' => 'in:drafts',
                'allmail' => 'in:all',
                'starred' => 'is:starred',
                'trash' => 'in:trash',
                'spam' => 'in:spam'
            ];
    
            // If the filter is not valid, default to 'inbox'
            $query = $filterQueries[$filter] ?? 'in:inbox';
    
            // Fetch emails based on the filter query
            $messages = $service->users_messages->listUsersMessages('me', [
                'maxResults' => 20,
                'q' => $query // Use the dynamic filter query
            ]);
    
            $emailData = [];
            if ($messages->getMessages()) {
                foreach ($messages->getMessages() as $message) {
                    $msg = $service->users_messages->get('me', $message->getId());
                    $headers = $msg->getPayload()->getHeaders();
    
                    $from = '';
                    $fromName = '';
                    $to = '';
                    $subject = '';
    
                    foreach ($headers as $header) {
                        if ($header->getName() == 'From') {
                            $from = $header->getValue();
                            // Parse the name from the "From" header
                            if (preg_match('/^(.*)<.*>$/', $from, $matches)) {
                                $fromName = trim($matches[1]);
                            } else {
                                $fromName = $from;
                            }
                        }
                        if ($header->getName() == 'To') {
                            $to = $header->getValue();
                        }
                        if ($header->getName() == 'Subject') {
                            $subject = $header->getValue();
                        }
                    }
    
                    // Convert internalDate (timestamp) to human-readable format with timezone
                    $timestamp = $msg->getInternalDate(); // Timestamp in milliseconds
                    $dateTime = \Carbon\Carbon::createFromTimestampMs($timestamp)->setTimezone('GMT+8')->format('Y-m-d H:i:s'); // Convert to UTC, or set to your preferred timezone
    
                    $emailData[] = [
                        'id'         => $message->getId(),
                        'from'       => $from,
                        'fromName'   => $fromName,
                        'to'         => $to,
                        'subject'    => $subject,
                        'snippet'    => $msg->getSnippet(),
                        'time'       => $dateTime
                    ];
                }
            }
    
            return response()->json($emailData);
    
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to fetch emails.', 'message' => $e->getMessage()], 500);
        }
    }
    
    

    public function deleteEmails(Request $request)
    {
        try {
            $client = new Google_Client();
            $client->setClientId(env('GOOGLE_CLIENT_ID'));
            $client->setClientSecret(env('GOOGLE_CLIENT_SECRET'));
    
            // Get the token from the Authorization header
            $accessToken = $request->bearerToken();
    
            if (!$accessToken) {
                return response()->json(['error' => 'No token provided. Please log in again.'], 401);
            }
    
            // Set the access token for Google Client
            $client->setAccessToken($accessToken);
    
            // Initialize Gmail Service
            $service = new Google_Service_Gmail($client);
    
            // Get the email IDs to delete
            $emailIds = $request->input('emailIds');
            if (empty($emailIds)) {
                return response()->json(['error' => 'No email IDs provided.'], 400);
            }
    
            foreach ($emailIds as $emailId) {
                $service->users_messages->trash('me', $emailId);
            }
            
    
            return response()->json(['message' => 'Emails moved to trash successfully.']);
    
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to delete emails.', 'message' => $e->getMessage()], 500);
        }
    }    

    
    private function getHeaderValue($headers, $name)
    {
        foreach ($headers as $header) {
            if ($header->getName() === $name) {
                return $header->getValue();
            }
        }
        return null;
    }
}
