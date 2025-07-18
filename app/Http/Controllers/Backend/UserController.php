<?php

// app/Http/Controllers/Backend/UserController.php

namespace App\Http\Controllers\Backend;

use App\Http\Controllers\Controller;
use App\Models\User; // <-- Pakai model User
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Illuminate\Validation\Rule;
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

    /**
     * Menampilkan form untuk mengedit user.
     */
    public function edit(User $user)
    {
        // Kirim data user yang akan diedit ke view
        return Inertia::render('backend/users/edit', [
            'user' => $user,
        ]);
    }

    /**
     * Mengupdate data user di database.
     */
    public function update(Request $request, User $user)
    {
        // Validasi input
        $request->validate([
            'name' => 'required|string|max:255',
            // Pastikan email unik, KECUALI untuk user ini sendiri
            'email' => ['required', 'email', Rule::unique('users')->ignore($user->id)],
            'role' => 'required|in:admin,user',
            // Password bersifat opsional saat update
            'password' => ['nullable', 'confirmed', Rules\Password::defaults()],
        ]);

        // Siapkan data untuk diupdate
        $dataToUpdate = [
            'name' => $request->name,
            'email' => $request->email,
            'role' => $request->role,
        ];

        // Hanya update password jika diisi
        if ($request->filled('password')) {
            $dataToUpdate['password'] = Hash::make($request->password);
        }

        // Update data di database
        $user->update($dataToUpdate);

        // Arahkan kembali dengan pesan sukses
        return redirect()->route('admin.users.index')->with('message', 'Data user berhasil diperbarui.');
    }

    /**
     * Menghapus user dari database.
     */
    public function destroy(User $user)
    {
        // PENGAMAN PENTING: Cek apakah user mencoba menghapus dirinya sendiri.
        if ($user->id === auth()->id()) {
            // Jika ya, kembalikan dengan pesan error.
            return redirect()->back()->withErrors(['error' => 'Anda tidak bisa menghapus akun Anda sendiri.']);
        }

        // Jika bukan diri sendiri, lanjutkan proses hapus.
        $user->delete();

        // Arahkan kembali dengan pesan sukses.
        return redirect()->route('admin.users.index')->with('message', 'User berhasil dihapus.');
    }
}
