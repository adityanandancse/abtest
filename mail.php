<?php
// Get form data
$name = $_POST['name'];
$email = $_POST['email'];
$phone = $_POST['phone'];
$subject = $_POST['subject'];
$message = $_POST['message'];

// Email where you want to receive submissions
$to = "hello@achinbindlish.com"; // update e-mail

// Prepare email content
$email_content = "New Contact Form Submission\n\n";
$email_content .= "Name: $name\n";
$email_content .= "Email: $email\n";
$email_content .= "Phone: $phone\n";
$email_content .= "Subject: $subject\n\n";
$email_content .= "Message:\n$message\n";

// Email headers
$headers = "From: $name <$email>\r\n";
$headers .= "Reply-To: $email\r\n";
$headers .= "X-Mailer: PHP/" . phpversion();

// Send email
$success = mail($to, "New Contact Form Submission: $subject", $email_content, $headers);

// Return response
if ($success) {
    http_response_code(200);
    echo json_encode(["message" => "Thank you! Your message has been sent."]);
} else {
    http_response_code(500);
    echo json_encode(["message" => "Oops! Something went wrong, please try again."]);
}
?> 