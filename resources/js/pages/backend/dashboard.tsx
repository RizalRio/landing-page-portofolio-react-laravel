// resources/js/Pages/Backend/Dashboard.tsx

import AdminLayout from '@/layouts/backend/admin-layout';
import { PageProps } from '@/types';
import { usePage } from '@inertiajs/react';

export default function Dashboard() {
    const { auth } = usePage<PageProps>().props;

    return (
        <AdminLayout header={<h2 className="text-xl leading-tight font-semibold text-gray-800">Admin Dashboard</h2>}>
            <div className="bg-base-100 rounded-lg p-6 shadow">
                <h3 className="text-lg font-medium">Selamat datang kembali, {auth.user.name}!</h3>
                <p className="mt-2 text-gray-600">Ini adalah halaman utama panel admin. Dari sini, kamu bisa mengelola semua konten website.</p>
            </div>
        </AdminLayout>
    );
}
