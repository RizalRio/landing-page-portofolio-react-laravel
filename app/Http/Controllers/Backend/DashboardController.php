<?php

namespace App\Http\Controllers\Backend;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Post;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function __invoke(Request $request)
    {
        $stats = [
            'posts' => Post::count(),
            'categories' => Category::count(),
            'users' => User::count(),
        ];

        $recentPosts = Post::with('user')->latest()->take(5)->get();

        return Inertia::render('backend/dashboard', [
            'stats' => $stats,
            'recentPosts' => $recentPosts,
        ]);
    }
}
