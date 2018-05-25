<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\Model;

class ResourceController extends Controller
{

    public function __construct()
    {
        //$this->middleware('auth');
    }

    public function index()
    {
        return response()->json($this->model::all());
    }

    public function store(Request $request)
    {
        $model = new $this->model();
        $model->fill($request->all());
        $model->save();

        return response()->json($model);
    }

    public function update(Request $request, $id)
    {
      $model = $this->model::find($id);

      $model->fill($request->all());
      $model->save();

      return response()->json($model);
    }

    public function destroy($id)
    {
        //
    }
}
