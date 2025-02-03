<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\SMTP;

require 'phpmailer/src/Exception.php';
require 'phpmailer/src/PHPMailer.php';
require 'phpmailer/src/SMTP.php';

// Включаем отображение ошибок (для отладки)
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Устанавливаем заголовок JSON (важно!)
header('Content-Type: application/json; charset=UTF-8');

// Подключаем конфиг
$config = require 'config.php';

$mail = new PHPMailer(true);
$mail->CharSet = 'UTF-8';
$mail->IsHTML(true);

// Настройки SMTP (для Gmail)
$mail->isSMTP();
$mail->Host = 'smtp.gmail.com';
$mail->SMTPAuth = true;
$mail->Username = $config['email'];  // Твой email
$mail->Password = $config['password'];  // Пароль приложения Google
$mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
$mail->Port = 587;
// Отключаем отладку, чтобы не ломался JSON
$mail->SMTPDebug = 0; 
$mail->Debugoutput = 'html';

// От кого и кому
$mail->setFrom($config['email'], 'Макс Ваковский');
$mail->addAddress('maxgamer20777@gmail.com');  

// Тема письма
$mail->Subject = 'Новый заказ на пиньяту';

// Формируем тело письма
$body = '<h1>Новый заказ на пиньяту:</h1>';
if (!empty($_POST['firstName'])) {
    $body .= '<p><strong>Имя:</strong> ' . htmlspecialchars($_POST['firstName']) . '</p>';
}
if (!empty($_POST['lastName'])) {
    $body .= '<p><strong>Фамилия:</strong> ' . htmlspecialchars($_POST['lastName']) . '</p>';
}
if (!empty($_POST['phone'])) {
    $body .= '<p><strong>Телефон:</strong> ' . htmlspecialchars($_POST['phone']) . '</p>';
}
if (!empty($_POST['email'])) {
    $body .= '<p><strong>Email:</strong> ' . htmlspecialchars($_POST['email']) . '</p>';
}
if (!empty($_POST['message'])) {
    $body .= '<p><strong>Выбранная пиньята:</strong> ' . htmlspecialchars($_POST['message']) . '</p>';
}

$mail->Body = $body;

// Отправка письма
if (!$mail->send()) {
    echo json_encode(['status' => 'error', 'message' => 'Ошибка: ' . $mail->ErrorInfo]);
} else {
    echo json_encode(['status' => 'success', 'message' => 'Данные отправлены!']);
}
?>