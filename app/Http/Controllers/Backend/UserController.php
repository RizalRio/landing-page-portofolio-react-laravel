<?php

// app/Http/Controllers/Backend/UserController.php

namespace App\Http\Controllers\Backend;

use App\Http\Controllers\Controller;
use App\Models\User; // <-- Pakai model User
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;

class UserController extends Controller
{
    public function index(Request $request)
    {
        $filters = $request->only(['search', 'sort_by', 'sort_direction']);
        $query = User::query(); // <-- Query ke model User

        // Logika Search
        $query->when($request->filled('search'), function ($q) use ($request) {
            $search = $request->input('search');
            $q->where('name', 'like', "%{$search}%")
                ->orWhere('email', 'like', "%{$search}%");
        });

        // Logika Sort
        if ($request->filled('sort_by')) {
            // ... (logika sorting sama persis seperti di PostController)
        } else {
            $query->latest();
        }

        $users = $query->paginate(10)->withQueryString();

        return Inertia::render('backend/users/index', [
            'users' => $users, // Kirim data users
            'filters' => $filters,
        ]);
    }

    /**
     * Menampilkan form untuk membuat user baru.
     */
    public function create()
    {
        return Inertia::render('backend/users/create');
    }

    /**
     * Menyimpan user baru ke database.
     */
    public function store(Request $request)
    {
        // Validasi input dari form
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:' . User::class,
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
            'role' => 'required|in:admin,user',
        ]);

        // Buat user baru
        User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => $request->role,
        ]);

        // Arahkan kembali dengan pesan sukses
        return redirect()->route('admin.users.index')->with('message', 'User baru berhasil dibuat.');
    }
}
