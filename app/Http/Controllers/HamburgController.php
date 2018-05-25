<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class HamburgController extends ResourceController
{

    public function __construct()
    {
        $this->model = '\App\Hamburg';
    }

}
