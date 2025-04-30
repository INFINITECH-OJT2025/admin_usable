<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Google_Client;
use Google_Service_Gmail;
use Google_Service_Gmail_ModifyMessageRequest;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Str;

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
    
        // ✅ Force account selection
        $client->setPrompt('select_account consent');
    
        // (Optional) Allow incremental authorization
        $client->setIncludeGrantedScopes(true);
    
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
            'google_refresh_token' => $token['refresh_token'] ?? null, // Only available first time
            'google_token_expires' => now()->addSeconds($token['expires_in']) // Save expiry time
        ]);
    
        return redirect()->to('http://localhost:3000/Mail?token=' . $token['access_token']);
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
    
            $accessToken = $request->bearerToken();
    
            if (!$accessToken) {
                return response()->json(['error' => 'No token provided. Please log in again.'], 401);
            }
    
            $client->setAccessToken($accessToken);
    
            $service = new Google_Service_Gmail($client);
    
            $filter = $request->query('filter', 'inbox');
    
            $filterQueries = [
                'inbox'   => 'in:inbox',
                'unread'  => 'is:unread',
                'sent'    => 'in:sent',
                'draft'   => 'in:drafts',
                'allmail' => 'in:all',
                'starred' => 'is:starred',
                'trash'   => 'in:trash',
                'spam'    => 'in:spam'
            ];
    
            $query = $filterQueries[$filter] ?? 'in:inbox';
    
            $messages = $service->users_messages->listUsersMessages('me', [
                'maxResults' => 20,
                'q' => $query
            ]);
    
            $emailData = [];
    
            if ($messages->getMessages()) {
                foreach ($messages->getMessages() as $message) {
                    $msg = $service->users_messages->get('me', $message->getId());
                    $payload = $msg->getPayload();
                    $headers = $payload->getHeaders();
    
                    $from = $to = $subject = $fromName = $fromEmail = '';
                    $attachments = [];
                    $bodyHtml = '';
                    $bodyText = '';
    
                    // Parse headers
                    foreach ($headers as $header) {
                        if ($header->getName() === 'From') {
                            $from = $header->getValue();
                            if (preg_match('/^(.*)<(.*)>$/', $from, $matches)) {
                                $fromName = trim($matches[1]);
                                $fromEmail = trim($matches[2]);
                            } else {
                                $fromEmail = $fromName = $from;
                            }
                        }
                        if ($header->getName() === 'To') {
                            $to = $header->getValue();
                        }
                        if ($header->getName() === 'Subject') {
                            $subject = $header->getValue();
                        }
                    }
    
                    // Get message body (recursive if needed)
                    $parts = $payload->getParts();
                    if ($parts) {
                        foreach ($parts as $part) {
                            $mimeType = $part->getMimeType();
                            $bodyData = $part->getBody()->getData();
                            if ($bodyData) {
                                $decodedBody = base64_decode(strtr($bodyData, '-_', '+/'));
                                if ($mimeType === 'text/html') {
                                    $bodyHtml = $decodedBody;
                                } elseif ($mimeType === 'text/plain') {
                                    $bodyText = $decodedBody;
                                }
                            }
    
                            // Handle attachments
                            if ($part->getFilename() && $part->getBody()->getAttachmentId()) {
                                $attachmentId = $part->getBody()->getAttachmentId();
                                $attachment = $service->users_messages_attachments->get('me', $msg->getId(), $attachmentId);
                                $fileData = base64_decode(strtr($attachment->getData(), '-_', '+/'));
                                $attachments[] = [
                                    'filename' => $part->getFilename(),
                                    'mimeType' => $part->getMimeType(),
                                    'base64'   => base64_encode($fileData), // Optional: send base64 to frontend
                                ];
                            }
                        }
                    } else {
                        // Fallback to main body
                        $bodyData = $payload->getBody()->getData();
                        if ($bodyData) {
                            $bodyText = base64_decode(strtr($bodyData, '-_', '+/'));
                        }
                    }
    
                    $timestamp = $msg->getInternalDate(); // In ms
                    $dateTime = \Carbon\Carbon::createFromTimestampMs($timestamp)
                                ->setTimezone('GMT+8')
                                ->format('Y-m-d H:i:s');

                    $gravatarHash = md5(Str::lower(trim($fromEmail)));
    
                    $emailData[] = [
                        'id'          => $message->getId(),
                        'from'        => $from,
                        'fromName'    => $fromName,
                        'fromEmail'   => $fromEmail,
                        'gravatarUrl' => "https://www.gravatar.com/avatar/{$gravatarHash}?s=80&d=identicon",
                        'to'          => $to,
                        'subject'     => $subject,
                        'snippet'     => $msg->getSnippet(),
                        'bodyHtml'    => $bodyHtml,
                        'bodyText'    => $bodyText,
                        'attachments' => $attachments,
                        'time'        => $dateTime,
                    ];
                }
            }
    
            return response()->json($emailData);
    
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Failed to fetch emails.',
                'message' => $e->getMessage()
            ], 500);
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
