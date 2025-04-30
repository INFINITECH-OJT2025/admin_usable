<?php

namespace App\Mail;

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

class UserRegisteredMail
{
    public function send($userEmail, $userName, $authToken)
    {
        $mail = new PHPMailer(true);

        try {
            // Server settings
            $mail->isSMTP();
            $mail->Host       = env('MAIL_HOST');
            $mail->SMTPAuth   = true;
            $mail->Username   = env('MAIL_USERNAME');
            $mail->Password   = env('MAIL_PASSWORD');
            $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
            $mail->Port       = env('MAIL_PORT');

            // Recipients
            $mail->setFrom(env('MAIL_FROM_ADDRESS'), env('MAIL_FROM_NAME'));
            $mail->addAddress($userEmail, $userName);

            // Generate verification link in the format: /Verification/{authToken}
            $verificationUrl = env('FRONTEND_URL') . "/Verification?token=" . $authToken;

            // Content
            $mail->isHTML(true);
            $mail->Subject = 'Verify Your Email - Project NEXT';
            $mail->Body    = "Dear $userName,<br><br>
                              Thank you for registering! Please verify your email by clicking the link below:<br><br>
                              <a href='$verificationUrl'>Verify Email</a><br><br>
                              Best regards,<br>Your Company Name";

            $mail->send();
            return "Email sent successfully!";
        } catch (Exception $e) {
            return "Email could not be sent. Mailer Error: {$mail->ErrorInfo}";
        }
    }
}