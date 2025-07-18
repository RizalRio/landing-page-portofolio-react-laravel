// resources/js/Pages/Backend/Users/Edit.tsx

import AdminLayout from '@/layouts/backend/admin-layout';
import { PageProps, User } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import React from 'react';

export default function Edit({ user }: PageProps<{ user: User }>) {
    // Inisialisasi form dengan data user yang ada
    const { data, setData, post, processing, errors } = useForm({
        name: user.name,
        email: user.email,
        role: user.role,
        password: '', // Password dikosongkan demi keamanan
        password_confirmation: '',
        _method: 'PUT', // Method spoofing untuk update
    });

    // Fungsi untuk handle submit
    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        // Kirim ke route update dengan menyertakan ID user
        post(route('admin.users.update', user.id));
    }

    return (
        <AdminLayout header={<h2 className="truncate text-xl font-semibold">Edit User: {user.name}</h2>}>
            <Head title={`Edit User: ${user.name}`} />

            <div className="bg-base-100 rounded-lg p-6 shadow-lg">
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Name */}
                    <div className="form-control w-full">
                        <label htmlFor="name" className="label">
                            <span className="label-text font-semibold">Nama</span>
                        </label>
                        <input
                            id="name"
                            type="text"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            className={`input input-bordered w-full ${errors.name ? 'input-error' : ''}`}
                        />
                        {errors.name && <span className="text-error mt-1 text-xs">{errors.name}</span>}
                    </div>

                    {/* Email */}
                    <div className="form-control w-full">
                        <label htmlFor="email" className="label">
                            <span className="label-text font-semibold">Email</span>
                        </label>
                        <input
                            id="email"
                            type="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            className={`input input-bordered w-full ${errors.email ? 'input-error' : ''}`}
                        />
                        {errors.email && <span className="text-error mt-1 text-xs">{errors.email}</span>}
                    </div>

                    {/* Role */}
                    <div className="form-control w-full">
                        <label htmlFor="role" className="label">
                            <span className="label-text font-semibold">Role</span>
                        </label>
                        <select
                            id="role"
                            value={data.role}
                            onChange={(e) => setData('role', e.target.value)}
                            className={`select select-bordered w-full ${errors.role ? 'select-error' : ''}`}
                        >
                            <option value="user">User</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>

                    <div className="divider">Ubah Password (Opsional)</div>

                    {/* Password */}
                    <div className="form-control w-full">
                        <label htmlFor="password" className="label">
                            <span className="label-text font-semibold">Password Baru</span>
                        </label>
                        <input
                            id="password"
                            type="password"
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            className={`input input-bordered w-full ${errors.password ? 'input-error' : ''}`}
                        />
                        {errors.password && <span className="text-error mt-1 text-xs">{errors.password}</span>}
                    </div>

                    {/* Password Confirmation */}
                    <div className="form-control w-full">
                        <label htmlFor="password_confirmation" className="label">
                            <span className="label-text font-semibold">Konfirmasi Password Baru</span>
                        </label>
                        <input
                            id="password_confirmation"
                            type="password"
                            value={data.password_confirmation}
                            onChange={(e) => setData('password_confirmation', e.target.value)}
                            className="input input-bordered w-full"
                        />
                    </div>

                    {/* Tombol Aksi */}
                    <div className="border-base-200 flex items-center gap-4 border-t pt-4">
                        <button type="submit" className="btn btn-primary" disabled={processing}>
                            {processing && <span className="loading loading-spinner"></span>}
                            Simpan Perubahan
                        </button>
                        <Link href={route('admin.users.index')} className="btn btn-ghost">
                            Batal
                        </Link>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}
