<?php

namespace App\Http\Controllers;

use App\Article;
use Illuminate\Http\Request;

class ArticleController extends ResourceController
{
    
    public function index()
    {
        return response()->json(Article::with('tags')->get());
    }

    public function store(Request $request)
    {
        $article = new Article();
        $article->fill($request->all());
        $article->save();

        $article->tags()->sync($request->tags);

        return response()->json($article);
    }

    public function update(Request $request, $id)
    {
      $article = Article::find($id);
      $article->fill($request->all());
      $article->tags()->sync($request->tags);
      $article->save();

      return response()->json($article);
    }

}
