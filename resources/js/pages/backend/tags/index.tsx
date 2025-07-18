// resources/js/Pages/Backend/Tags/Index.tsx

import AdminLayout from '@/layouts/backend/admin-layout';
import { PageProps } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import React, { useState } from 'react';

// Definisikan tipe data untuk Tag
interface Tag {
    id: number;
    name: string;
    slug: string;
}

export default function Index({ tags }: PageProps<{ tags: Tag[] }>) {
    // useForm untuk handle form tambah tag
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
    });

    // Form untuk Edit Tag
    const {
        data: editData,
        setData: setEditData,
        put,
        processing: processingEdit,
        errors: errorsEdit,
        reset: resetEdit,
    } = useForm({ id: 0, name: '' });

    // State untuk menyimpan tag yang sedang diedit
    const [editingTag, setEditingTag] = useState<Tag | null>(null);

    // Fungsi untuk submit form tambah
    const handleAddSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('admin.tags.store'), {
            onSuccess: () => reset('name'),
        });
    };

    // Fungsi untuk submit form edit
    const handleEditSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(route('admin.tags.update', editData.id), {
            onSuccess: () => {
                setEditingTag(null); // Kosongkan state
                (document.getElementById('edit_tag_modal') as HTMLDialogElement)?.close(); // Tutup modal
            },
        });
    };

    // Fungsi untuk membuka modal edit
    const openEditModal = (tag: Tag) => {
        setEditingTag(tag);
        setEditData({ id: tag.id, name: tag.name });
        (document.getElementById('edit_tag_modal') as HTMLDialogElement)?.showModal();
    };

    return (
        <AdminLayout header={<h2 className="text-xl font-semibold">Manajemen Tag</h2>}>
            <Head title="Manajemen Tag" />

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                {/* Kolom Kiri: Form Tambah Tag */}
                <div className="lg:col-span-1">
                    <div className="bg-base-100 rounded-lg p-6 shadow">
                        <h3 className="mb-4 text-lg font-medium">Tambah Tag Baru</h3>
                        <form onSubmit={handleAddSubmit} className="space-y-4">
                            <div className="form-control">
                                <label htmlFor="name" className="label mb-3">
                                    <span className="label-text">Nama Tag</span>
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    className={`input input-bordered ${errors.name ? 'input-error' : ''}`}
                                />
                                {errors.name && (
                                    <label className="label">
                                        <span className="label-text-alt text-error">{errors.name}</span>
                                    </label>
                                )}
                            </div>
                            <button type="submit" className="btn btn-primary" disabled={processing}>
                                {processing && <span className="loading loading-spinner"></span>}
                                Simpan
                            </button>
                        </form>
                    </div>
                </div>

                {/* Kolom Kanan: Tabel Daftar Tag */}
                <div className="lg:col-span-2">
                    <div className="bg-base-100 overflow-x-auto rounded-lg p-6 shadow">
                        <table className="table w-full">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Nama</th>
                                    <th>Slug</th>
                                    <th>Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tags.map((tag) => (
                                    <tr key={tag.id} className="hover">
                                        <th>{tag.id}</th>
                                        <td>{tag.name}</td>
                                        <td>{tag.slug}</td>
                                        <td className="flex gap-2">
                                            <button onClick={() => openEditModal(tag)} className="btn btn-xs btn-info">
                                                Edit
                                            </button>
                                            <Link
                                                href={route('admin.tags.destroy', tag.id)}
                                                method="delete"
                                                as="button"
                                                onBefore={() => confirm('Yakin ingin hapus tag ini?')}
                                                className="btn btn-xs btn-error"
                                            >
                                                Hapus
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Modal untuk Edit Tag */}
            <dialog id="edit_tag_modal" className="modal">
                <div className="modal-box">
                    <h3 className="text-lg font-bold">Edit Tag</h3>
                    <form onSubmit={handleEditSubmit} className="mt-4 space-y-4">
                        <div className="form-control">
                            <label htmlFor="edit_name" className="label mb-3">
                                <span className="label-text">Nama Tag</span>
                            </label>
                            <br />
                            <input
                                type="text"
                                id="edit_name"
                                value={editData.name}
                                onChange={(e) => setEditData('name', e.target.value)}
                                className={`input input-bordered w-100 ${errorsEdit.name ? 'input-error' : ''}`}
                            />
                            {errorsEdit.name && (
                                <label className="label">
                                    <span className="label-text-alt text-error mt-1 text-xs">{errorsEdit.name}</span>
                                </label>
                            )}
                        </div>
                        <div className="modal-action">
                            <form method="dialog">
                                <button className="btn">Batal</button>
                            </form>
                            <button type="submit" className="btn btn-primary" disabled={processingEdit}>
                                Simpan
                            </button>
                        </div>
                    </form>
                </div>
            </dialog>
        </AdminLayout>
    );
}
