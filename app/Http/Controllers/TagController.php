<?php

namespace App\Http\Controllers;

use App\Tag;
use Illuminate\Http\Request;

class TagController extends ResourceController
{
    public function __construct()
    {
        $this->model = '\App\Tag';
    }
}
