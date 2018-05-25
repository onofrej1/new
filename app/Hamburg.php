<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Hamburg extends Model
{
        protected $fillable = ['event_date', 'notes', 'title'];
        protected $dates = ['event_date'];
        public $timestamps = false;

        protected $table = 'hamburg';

        public function setEventDateAttribute($value)
        {
                $this->attributes['event_date'] = new \DateTime($value);
        }
}
