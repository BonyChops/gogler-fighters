<?php
include __DIR__.'/vendor/autoload.php';
use Illuminate\Support\MessageBag;


$accessToken = json_decode(file_get_contents('accessToken.json'), true)['token'];
$discord = new \Discord\Discord([
    'token' => $accessToken,
]);

$discord->on('ready', function ($discord) {
    echo "Bot is ready.", PHP_EOL;

    // Listen for events here
    $discord->on('message', function ($message) {
        if($message->content == '/happy'){
            $message->reply("I'm fastest bot. (PHP)");
        }
        if($message->content == '/cat'){
            $message->reply("I'm fastest cat. (にゃおん)");
        }
    });
});

$discord->run();