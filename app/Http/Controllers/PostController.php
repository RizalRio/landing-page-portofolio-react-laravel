<?php

namespace App\Http\Controllers;

use App\Models\Post;

use Inertia\Inertia;
use Illuminate\Http\Request;

class PostController extends Controller
{
    public function index()
    {
        $posts = Post::where('status', 'published')
            ->latest()
            ->get();

        return Inertia::render('Pages/Blog/Index', [
            'posts' => $posts,
        ]);
    }
}
