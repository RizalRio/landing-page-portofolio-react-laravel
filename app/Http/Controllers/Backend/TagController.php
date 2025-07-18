<?php

namespace App\Http\Controllers\Backend;

use App\Http\Controllers\Controller;
use App\Models\Tag;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Illuminate\Validation\Rule;

class TagController extends Controller
{
    /**
     * Menampilkan halaman daftar tag.
     */
    public function index()
    {
        return Inertia::render('backend/tags/index', [
            'tags' => Tag::latest()->get(),
        ]);
    }

    /**
     * Menyimpan tag baru ke database.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255|unique:tags',
        ]);

        Tag::create([
            'name' => $request->name,
            'slug' => Str::slug($request->name),
        ]);

        return redirect()->back()->with('message', 'Tag baru berhasil dibuat.');
    }

    /**
     * Menampilkan form edit kategori (kita tidak buat halaman khusus,
     * jadi method ini bisa dikosongkan atau digunakan nanti).
     */
    public function edit(Tag $tag)
    {
        // Untuk saat ini kita akan edit langsung di halaman index.
    }

    /**
     * Mengupdate kategori di database.
     */
    public function update(Request $request, Tag $tag)
    {
        $request->validate([
            'name' => ['required', 'string', 'max:255', Rule::unique('categories')->ignore($tag->id)],
        ]);

        $tag->update([
            'name' => $request->name,
            'slug' => Str::slug($request->name),
        ]);

        return redirect()->back()->with('message', 'Kategori berhasil diperbarui.');
    }

    /**
     * Menghapus kategori dari database.
     */
    public function destroy(Tag $tag)
    {
        $tag->delete();
        return redirect()->back()->with('message', 'Kategori berhasil dihapus.');
    }
}
