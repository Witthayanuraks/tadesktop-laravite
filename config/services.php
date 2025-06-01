<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Third Party Services
    |--------------------------------------------------------------------------
    |
    | This file is for storing the credentials for third party services such
    | as Mailgun, Postmark, AWS and more. This file provides the de facto
    | location for this type of information, allowing packages to have
    | a conventional file to locate the various service credentials.
    |
    */

    'postmark' => [
        'token' => env('POSTMARK_TOKEN'),
    ],

    'ses' => [
        'key' => env('AWS_ACCESS_KEY_ID'),
        'secret' => env('AWS_SECRET_ACCESS_KEY'),
        'region' => env('AWS_DEFAULT_REGION', 'us-east-1'),
    ],

    'resend' => [
        'key' => env('RESEND_KEY'),
    ],

    'slack' => [
        'notifications' => [
            'bot_user_oauth_token' => env('SLACK_BOT_USER_OAUTH_TOKEN'),
            'channel' => env('SLACK_BOT_USER_DEFAULT_CHANNEL'),
        ],
    ],
    'wa_service' => [
        'base_url' => env('WA_SERVICE_URL', 'http://localhost:3001/api/wa'),
    ],

    // 'pusher' => [
    //     'key' => env('PUSHER_APP_KEY'),
    //     'secret' => env('PUSHER_APP_SECRET'),
    //     'app_id' => env('PUSHER_APP_ID'),
    //     'options' => [
    //         'cluster' => env('PUSHER_APP_CLUSTER', 'mt1'),
    //         'useTLS' => false,
    //         'host' => env('PUSHER_HOST', '127.0.0.1'),
    //         'port' => env('PUSHER_PORT', 6001),
    //         'scheme' => env('PUSHER_SCHEME', 'http'),
    //     ],
    // ],

];
