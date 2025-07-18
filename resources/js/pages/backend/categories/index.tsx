// resources/js/Pages/Backend/Categories/Index.tsx

import AdminLayout from '@/layouts/backend/admin-layout';
import { PageProps } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import React, { useState } from 'react';

// Definisikan tipe data untuk Kategori
interface Category {
    id: number;
    name: string;
    slug: string;
}

export default function Index({ categories }: PageProps<{ categories: Category[] }>) {
    // Form untuk Tambah Kategori
    const { data, setData, post, processing, errors, reset } = useForm({ name: '' });

    // Form untuk Edit Kategori
    const {
        data: editData,
        setData: setEditData,
        put,
        processing: processingEdit,
        errors: errorsEdit,
        reset: resetEdit,
    } = useForm({ id: 0, name: '' });

    const [editingCategory, setEditingCategory] = useState<Category | null>(null);

    const handleAddSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('admin.categories.store'), { onSuccess: () => reset('name') });
    };

    const handleEditSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(route('admin.categories.update', editData.id), {
            onSuccess: () => {
                setEditingCategory(null); // Tutup modal
                (document.getElementById('edit_modal') as HTMLDialogElement)?.close();
            },
        });
    };

    const openEditModal = (category: Category) => {
        setEditingCategory(category);
        setEditData({ id: category.id, name: category.name });
        (document.getElementById('edit_modal') as HTMLDialogElement)?.showModal();
    };

    return (
        <AdminLayout header={<h2 className="text-xl font-semibold">Manajemen Kategori</h2>}>
            <Head title="Manajemen Kategori" />

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                {/* Kolom Kiri: Form Tambah Kategori */}
                <div className="lg:col-span-1">
                    <div className="bg-base-100 rounded-lg p-6 shadow">
                        <h3 className="mb-4 text-lg font-medium">Tambah Kategori Baru</h3>
                        <form onSubmit={handleAddSubmit} className="space-y-4">
                            <div className="form-control">
                                <label htmlFor="name" className="label mb-3">
                                    <span className="label-text">Nama Kategori</span>
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

                {/* Kolom Kanan: Tabel Daftar Kategori */}
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
                                {categories.map((category) => (
                                    <tr key={category.id} className="hover">
                                        <th>{category.id}</th>
                                        <td>{category.name}</td>
                                        <td>{category.slug}</td>
                                        <td className="flex gap-2">
                                            <button onClick={() => openEditModal(category)} className="btn btn-xs btn-info">
                                                Edit
                                            </button>
                                            <Link
                                                href={route('admin.categories.destroy', category.id)}
                                                method="delete"
                                                as="button"
                                                onBefore={() => confirm('Yakin ingin hapus?')}
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

            {/* Modal untuk Edit Kategori */}
            <dialog id="edit_modal" className="modal">
                <div className="modal-box">
                    <h3 className="text-lg font-bold">Edit Kategori</h3>
                    <form onSubmit={handleEditSubmit} className="mt-4 space-y-4">
                        <div className="form-control">
                            <label htmlFor="edit_name" className="label mb-3">
                                <span className="label-text">Nama Kategori</span>
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
                            <button
                                type="button"
                                className="btn"
                                onClick={() => (document.getElementById('edit_modal') as HTMLDialogElement)?.close()}
                            >
                                Batal
                            </button>
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
