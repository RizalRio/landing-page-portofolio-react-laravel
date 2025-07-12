<?php

namespace App\Http\Controllers;

use App\Models\Post;

use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;

class PostController extends Controller
{
    public function index()
    {
        $posts = Post::where('status', 'published')
            ->latest()
            ->paginate(9);

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

    public function adminIndex(Request $request)
    {
        // 1. Ambil semua parameter dari URL untuk filtering & sorting
        $filters = $request->only(['search', 'sort_by', 'sort_direction']);

        // 2. Query dasar
        $query = Post::with('user');

        // !! LOGIKA PENCARIAN DITAMBAHKAN DI SINI !!
        $query->when($request->filled('search'), function ($q) use ($request) {
            $search = $request->input('search');
            // Mencari di beberapa kolom sekaligus
            $q->where(function ($query) use ($search) {
                $query->where('title', 'like', "%{$search}%")
                    ->orWhere('body', 'like', "%{$search}%");
            });
        });

        // 3. Logika untuk sorting
        if ($request->filled('sort_by')) {
            $sortBy = $request->input('sort_by');
            $sortDirection = $request->input('sort_direction', 'asc');

            // Validasi untuk keamanan, agar user tidak bisa sorting kolom sembarangan
            $sortableColumns = ['id', 'title', 'status', 'published_at'];
            if (in_array($sortBy, $sortableColumns)) {
                $query->orderBy($sortBy, $sortDirection);
            }
        } else {
            $query->latest(); // Default sorting jika tidak ada perintah
        }

        // 4. Lakukan paginasi dan pastikan parameter sorting ikut di link paginasi
        $posts = $query->paginate(10)->withQueryString();

        return Inertia::render('backend/blog/index', [
            'posts' => $posts,
            'filters' => $filters, // Kirim parameter filter ke frontend
        ]);
    }

    public function create()
    {
        // Method ini hanya menampilkan halaman form create
        return Inertia::render('backend/blog/create');
    }

    public function store(Request $request)
    {
        // 1. Validasi data yang masuk
        $validatedData = $request->validate([
            'title' => 'required|string|max:255',
            'status' => 'required|in:published,draft,archived',
            'body' => 'required|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
        ]);

        // 2. Siapkan data untuk disimpan
        $dataToStore = $validatedData;
        $dataToStore['slug'] = Str::slug($validatedData['title']);
        $dataToStore['user_id'] = auth()->id(); // Ambil ID user yang sedang login
        $dataToStore['published_at'] = now(); // Atau bisa dibuat dinamis

        // 3. Handle upload gambar jika ada
        if ($request->hasFile('image')) {
            $dataToStore['image'] = $request->file('image')->store('posts', 'public');
        }

        // 4. Simpan ke database
        Post::create($dataToStore);

        // 5. Arahkan kembali ke halaman index dengan pesan sukses
        return redirect()->route('admin.posts.index')->with('message', 'Post baru berhasil dibuat!');
    }

    public function edit(Post $post)
    {
        // Kirim data post yang akan diedit ke komponen 'Backend/Blog/Edit'
        return Inertia::render('backend/blog/edit', [
            'post' => $post,
        ]);
    }

    public function update(Request $request, Post $post)
    {
        // 1. Validasi data
        $validatedData = $request->validate([
            'title' => 'required|string|max:255',
            'status' => 'required|in:published,draft,archived',
            'body' => 'required|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
        ]);

        // 2. Siapkan data untuk di-update
        $dataToUpdate = $validatedData;
        $dataToUpdate['slug'] = Str::slug($validatedData['title']);

        // 3. Handle upload gambar baru (jika ada)
        if ($request->hasFile('image')) {
            // Hapus gambar lama jika ada
            if ($post->image) {
                Storage::disk('public')->delete($post->image);
            }
            // Simpan gambar baru
            $dataToUpdate['image'] = $request->file('image')->store('posts', 'public');
        }

        // 4. Update data di database
        $post->update($dataToUpdate);

        // 5. Arahkan kembali dengan pesan sukses
        return redirect()->route('admin.posts.index')->with('message', 'Post berhasil diperbarui!');
    }

    public function destroy(Post $post)
    {
        // 1. Hapus gambar terkait dari storage untuk menjaga kebersihan
        if ($post->image) {
            Storage::disk('public')->delete($post->image);
        }

        // 2. Hapus data post dari database
        $post->delete();

        // 3. Arahkan kembali dengan pesan sukses
        return redirect()->route('admin.posts.index')->with('message', 'Post berhasil dihapus!');
    }
}
