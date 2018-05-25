<?php

namespace App\Http\Controllers;

use App\MenuItem;
use Illuminate\Http\Request;

class MenuItemController extends ResourceController
{
    public function __construct()
    {
        $this->model = '\App\MenuItem';
    }

    public function index()
    {
        $menuItems = MenuItem::with(['page', 'parent'])->get();
        
        return response()->json($menuItems);
    }
}
