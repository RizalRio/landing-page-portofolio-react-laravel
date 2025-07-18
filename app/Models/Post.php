<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Post extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'user_id',
        'title',
        'slug',
        'image',
        'excerpt',
        'body',
        'status',
        'published_at',
        'category_id',
    ];

    /**
     * Mendefinisikan relasi bahwa Post ini DIMILIKI OLEH (belongs to) satu User.
     * Nama function 'user' inilah yang menjadi nama relasi.
     */
    public function user(): BelongsTo
    {
        // Laravel akan secara otomatis mencari foreign key 'user_id' di tabel posts.
        return $this->belongsTo(User::class, 'user_id');
    }

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function tags()
    {
        // Satu post BISA MEMILIKI BANYAK tag
        return $this->belongsToMany(Tag::class);
    }
}
