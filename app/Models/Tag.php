<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Tag extends Model
{
    protected $fillable = [
        'name',
        'slug'
    ];
    public function posts()
    {
        // Satu tag BISA DIMILIKI OLEH BANYAK post
        return $this->belongsToMany(Post::class);
    }
}
