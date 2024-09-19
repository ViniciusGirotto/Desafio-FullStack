<?php

return [
    'default' => 'default',
    'documentations' => [
        'default' => [
            'api' => [
                'title' => 'API Documentation',
            ],

            'routes' => [
                'api' => 'api/documentation',
            ],
            'paths' => [
                'use_absolute_path' => env('L5_SWAGGER_USE_ABSOLUTE_PATH', false),
                'docs' => storage_path('api-docs'),
                'docs_json' => 'api-docs.json',
                'docs_yaml' => 'api-docs.yaml',
                'annotations' => base_path('app'), 
                'swagger_ui_assets_path' => env('L5_SWAGGER_UI_ASSETS_PATH', 'vendor/swagger-api/swagger-ui/dist/'),
                'views' => base_path('resources/views/vendor/l5-swagger'),
            ],
        ],
    ],
    'generate_always' => env('L5_SWAGGER_GENERATE_ALWAYS', false),
    'generate_yaml_copy' => env('L5_SWAGGER_GENERATE_YAML_COPY', false),
    'proxy' => false,
    'additional_config_url' => null,
    'operations_sort' => env('L5_SWAGGER_OPERATIONS_SORT', null),
    'validator_url' => null,
    'constants' => [
        'L5_SWAGGER_CONST_HOST' => env('L5_SWAGGER_CONST_HOST', 'http://localhost:8000'),
    ],
];