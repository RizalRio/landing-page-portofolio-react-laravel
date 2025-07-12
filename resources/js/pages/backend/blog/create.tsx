// resources/js/Pages/Backend/Blog/Create.tsx

import AdminLayout from '@/layouts/backend/admin-layout';
import { Head, Link, useForm } from '@inertiajs/react';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Bold, Heading2, Italic, List, ListOrdered, Pilcrow, Strikethrough } from 'lucide-react';
import React from 'react';

// Komponen untuk Toolbar Editor Tiptap
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

// Komponen utama halaman Create
export default function Create() {
    // Hook useForm dari Inertia untuk menangani state form, error, dan submission
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        status: 'draft', // Nilai default untuk status
        body: '',
        image: null as File | null,
    });

    // Hook useEditor dari Tiptap untuk menginisialisasi editor
    const editor = useEditor({
        extensions: [StarterKit],
        content: data.body,
        editorProps: {
            attributes: {
                // Styling untuk area pengetikan
                class: 'prose max-w-none p-4 min-h-48 focus:outline-none',
            },
        },
        onUpdate({ editor }) {
            // Sambungkan isi editor Tiptap ke state form Inertia setiap ada perubahan
            setData('body', editor.getHTML());
        },
    });

    // Fungsi yang dijalankan saat form di-submit
    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        post(route('admin.posts.store'));
    }

    return (
        <AdminLayout header={<h2 className="text-xl font-semibold">Tambah Post Baru</h2>}>
            <Head title="Tambah Post Baru" />

            <div className="bg-base-100 rounded-lg p-6 shadow-lg">
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Judul */}
                    <div className="form-control w-full">
                        <label htmlFor="title" className="label mb-2">
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

                    {/* Body / Isi Post dengan Editor Tiptap */}
                    <div className="form-control w-full">
                        <label className="label mb-2">
                            <span className="label-text font-semibold">Isi Post</span>
                        </label>
                        <div className={`border-base-300 rounded-lg border ${errors.body ? 'border-error' : ''}`}>
                            <MenuBar editor={editor} />
                            <EditorContent editor={editor} />
                        </div>
                        {errors.body && <span className="text-error mt-1 text-xs">{errors.body}</span>}
                    </div>

                    {/* Grid untuk Gambar & Status */}
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        {/* Gambar */}
                        <div className="form-control w-full">
                            <label htmlFor="image" className="label mb-2">
                                <span className="label-text font-semibold">Gambar Unggulan</span>
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
                            <label htmlFor="status" className="label mb-2">
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

                    {/* Tombol Aksi */}
                    <div className="border-base-200 flex items-center gap-4 border-t pt-4">
                        <button type="submit" className="btn btn-primary" disabled={processing}>
                            {processing && <span className="loading loading-spinner"></span>}
                            Simpan Post
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
