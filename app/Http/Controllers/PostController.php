<?php

namespace App\Http\Controllers;

use App\Models\Post;

use Inertia\Inertia;
use Illuminate\Http\Request;

class PostController extends Controller
{
    public function index()
    {
        $posts = Post::where('status', 'published')->latest()->paginate(10);

        return Inertia::render('frontend/blog/index', [
            'posts' => $posts,
        ]);
    }

    public function show(Post $post)
    {
        return Inertia::render('frontend/blog/show', [
            'post' => $post
        ]);
    }
}
