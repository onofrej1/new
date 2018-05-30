<?php

namespace App\Http\Controllers;

use App\Menu;
use Illuminate\Http\Request;

class MenuController extends ResourceController
{
    public function __construct()
    {
        $this->model = '\App\Menu';
    }
}
