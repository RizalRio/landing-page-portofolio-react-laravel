// resources/js/Pages/Backend/Blog/Edit.tsx

import AdminLayout from '@/layouts/backend/admin-layout';
import { PageProps, Post } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Bold, Heading2, Italic, List, ListOrdered, Pilcrow, Strikethrough } from 'lucide-react';
import React from 'react';

// Komponen untuk Toolbar Editor Tiptap (sama seperti di Create.tsx)
const MenuBar = ({ editor }: { editor: any }) => {
    if (!editor) {
        return null;
    }

    // Daftar tombol untuk toolbar
    const menuItems = [
        { action: () => editor.chain().focus().toggleBold().run(), icon: Bold, active: editor.isActive('bold'), label: 'Bold' },
        { action: () => editor.chain().focus().toggleItalic().run(), icon: Italic, active: editor.isActive('italic'), label: 'Italic' },
        { action: () => editor.chain().focus().toggleStrike().run(), icon: Strikethrough, active: editor.isActive('strike'), label: 'Strike' },
        {
            action: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
            icon: Heading2,
            active: editor.isActive('heading', { level: 2 }),
            label: 'Heading',
        },
        { action: () => editor.chain().focus().toggleBulletList().run(), icon: List, active: editor.isActive('bulletList'), label: 'Bullet List' },
        {
            action: () => editor.chain().focus().toggleOrderedList().run(),
            icon: ListOrdered,
            active: editor.isActive('orderedList'),
            label: 'Ordered List',
        },
        { action: () => editor.chain().focus().setParagraph().run(), icon: Pilcrow, active: editor.isActive('paragraph'), label: 'Paragraph' },
    ];

    return (
        <div className="bg-base-200 border-base-300 flex flex-wrap items-center gap-1 rounded-t-lg border-b p-2">
            {menuItems.map((item, index) => (
                <button
                    key={index}
                    onClick={item.action}
                    type="button"
                    className={`btn btn-sm btn-ghost ${item.active ? 'btn-active bg-primary text-primary-content' : ''}`}
                    aria-label={item.label}
                >
                    <item.icon size={16} />
                </button>
            ))}
        </div>
    );
};

interface Category {
    id: number;
    name: string;
}

interface Tag {
    id: number;
    name: string;
}

// Komponen utama halaman Edit
export default function Edit({ post, categories, tags }: PageProps<{ post: Post; categories: Category[]; tags: Tag[] }>) {
    // Inisialisasi useForm dengan data dari prop 'post'
    const {
        data,
        setData,
        post: formPost,
        processing,
        errors,
    } = useForm({
        title: post.title || '',
        status: post.status || 'draft',
        body: post.body || '',
        image: null as File | null,
        category_id: post.category_id || '', // <-- Isi dengan data yang ada
        tags: post.tags?.map((tag) => tag.id) || [],
        _method: 'PUT', // Method spoofing untuk update
    });

    const editor = useEditor({
        extensions: [StarterKit],
        content: data.body, // Isi editor dengan data post yang ada
        editorProps: {
            attributes: {
                class: 'prose max-w-none p-4 min-h-48 focus:outline-none',
            },
        },
        onUpdate({ editor }) {
            setData('body', editor.getHTML());
        },
    });

    function handleTagChange(tagId: number) {
        const currentTags = data.tags;
        if (currentTags.includes(tagId)) {
            setData(
                'tags',
                currentTags.filter((id) => id !== tagId),
            );
        } else {
            setData('tags', [...currentTags, tagId]);
        }
    }

    // Fungsi submit, mengirim ke route 'update'
    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        // Kirim sebagai POST, Laravel akan membacanya sebagai PUT karena '_method'
        formPost(route('admin.posts.update', post.id));
    }

    return (
        <AdminLayout header={<h2 className="truncate text-xl font-semibold">Edit Post: {post.title}</h2>}>
            <Head title={`Edit: ${post.title}`} />

            <div className="bg-base-100 rounded-lg p-6 shadow-lg">
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Judul */}
                    <div className="form-control w-full">
                        <label htmlFor="title" className="label">
                            <span className="label-text font-semibold">Judul Post</span>
                        </label>
                        <input
                            id="title"
                            type="text"
                            value={data.title}
                            onChange={(e) => setData('title', e.target.value)}
                            className={`input input-bordered w-full ${errors.title ? 'input-error' : ''}`}
                        />
                        {errors.title && <span className="text-error mt-1 text-xs">{errors.title}</span>}
                    </div>

                    <div className="form-control w-full">
                        <label htmlFor="category_id" className="label mb-3">
                            <span className="label-text font-semibold">Kategori</span>
                        </label>
                        <select
                            id="category_id"
                            value={data.category_id}
                            onChange={(e) => setData('category_id', e.target.value)}
                            className={`select select-bordered w-full ${errors.category_id ? 'select-error' : ''}`}
                        >
                            <option value="">Pilih Kategori</option>
                            {categories.map((category) => (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                        {errors.category_id && <span className="text-error mt-1 text-xs">{errors.category_id}</span>}
                    </div>

                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text mb-3 font-semibold">Tags</span>
                        </label>
                        <div className="border-base-300 flex flex-wrap gap-4 rounded-lg border p-4">
                            {tags.map((tag) => (
                                <label key={tag.id} className="label cursor-pointer gap-2">
                                    <input
                                        type="checkbox"
                                        checked={data.tags.includes(tag.id)}
                                        onChange={() => handleTagChange(tag.id)}
                                        className="checkbox checkbox-primary"
                                    />
                                    <span className="label-text">{tag.name}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Body / Isi Post dengan Editor Tiptap */}
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text font-semibold">Isi Post</span>
                        </label>
                        <div className={`border-base-300 rounded-lg border ${errors.body ? 'border-error' : ''}`}>
                            <MenuBar editor={editor} />
                            <EditorContent editor={editor} />
                        </div>
                        {errors.body && <span className="text-error mt-1 text-xs">{errors.body}</span>}
                    </div>

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        {/* Gambar */}
                        <div className="form-control w-full">
                            <label htmlFor="image" className="label">
                                <span className="label-text font-semibold">Ganti Gambar Unggulan</span>
                            </label>
                            <input
                                id="image"
                                type="file"
                                onChange={(e) => setData('image', e.target.files ? e.target.files[0] : null)}
                                className={`file-input file-input-bordered w-full ${errors.image ? 'file-input-error' : ''}`}
                            />
                            {errors.image && <span className="text-error mt-1 text-xs">{errors.image}</span>}
                        </div>

                        {/* Status */}
                        <div className="form-control w-full">
                            <label htmlFor="status" className="label">
                                <span className="label-text font-semibold">Status</span>
                            </label>
                            <select
                                id="status"
                                value={data.status}
                                onChange={(e) => setData('status', e.target.value)}
                                className={`select select-bordered w-full ${errors.status ? 'select-error' : ''}`}
                            >
                                <option value="draft">Draft</option>
                                <option value="published">Published</option>
                                <option value="archived">Archived</option>
                            </select>
                            {errors.status && <span className="text-error mt-1 text-xs">{errors.status}</span>}
                        </div>
                    </div>

                    {/* Preview Gambar Saat Ini */}
                    {post.image && !data.image && (
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-semibold">Gambar Saat Ini</span>
                            </label>
                            <img src={`/storage/${post.image}`} alt={post.title} className="h-48 w-auto rounded-lg object-cover" />
                        </div>
                    )}

                    {/* Tombol Aksi */}
                    <div className="border-base-200 flex items-center gap-4 border-t pt-4">
                        <button type="submit" className="btn btn-primary" disabled={processing}>
                            {processing && <span className="loading loading-spinner"></span>}
                            Simpan Perubahan
                        </button>
                        <Link href={route('admin.posts.index')} className="btn btn-ghost">
                            Batal
                        </Link>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}
