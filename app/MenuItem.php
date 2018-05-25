<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class MenuItem extends Model
{
    protected $table = 'menu_item';
    public $timestamps = false;

    protected $fillable = ['title', 'menu_id', 'parent_id', 'page_id', 'link'];

    public function page()
    {
        return $this->belongsTo('App\Page', 'page_id');
    }

    public function parent()
    {
        return $this->belongsTo('App\MenuItem', 'parent_id');
    }
}
