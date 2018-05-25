<?php

namespace App\Http\Controllers;

use App\Page;
use Illuminate\Http\Request;

class PageController extends ResourceController
{
    public function __construct()
    {
        $this->model = '\App\Page';
    }
}
