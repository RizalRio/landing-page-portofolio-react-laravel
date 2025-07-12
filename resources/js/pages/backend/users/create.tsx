// resources/js/Pages/Backend/Users/Create.tsx

import AdminLayout from '@/layouts/backend/admin-layout';
import { PageProps } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import React from 'react';

export default function Create({ auth }: PageProps) {
    // Gunakan useForm untuk state management
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        role: 'user', // Nilai default
    });

    // Fungsi untuk handle submit
    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        post(route('admin.users.store'));
    }

    return (
        <AdminLayout header={<h2 className="text-xl font-semibold">Tambah User Baru</h2>}>
            <Head title="Tambah User Baru" />

            <div className="bg-base-100 rounded-lg p-6 shadow-lg">
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Name */}
                    <div className="form-control w-full">
                        <label htmlFor="name" className="label mb-2">
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
                        <label htmlFor="email" className="label mb-2">
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

                    {/* Password */}
                    <div className="form-control w-full">
                        <label htmlFor="password" className="label mb-2">
                            <span className="label-text font-semibold">Password</span>
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
                        <label htmlFor="password_confirmation" className="label mb-2">
                            <span className="label-text font-semibold">Konfirmasi Password</span>
                        </label>
                        {/* INI BARIS YANG DIPERBAIKI */}
                        <input
                            id="password_confirmation"
                            type="password"
                            value={data.password_confirmation}
                            onChange={(e) => setData('password_confirmation', e.target.value)}
                            className="input input-bordered w-full"
                        />
                    </div>

                    {/* Role */}
                    <div className="form-control w-full">
                        <label htmlFor="role" className="label mb-2">
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

                    {/* Tombol Aksi */}
                    <div className="border-base-200 flex items-center gap-4 border-t pt-4">
                        <button type="submit" className="btn btn-primary" disabled={processing}>
                            {processing && <span className="loading loading-spinner"></span>}
                            Simpan User
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
