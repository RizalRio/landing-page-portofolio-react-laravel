// resources/js/Pages/Backend/Users/Index.tsx

import AdminLayout from '@/layouts/backend/admin-layout';
import { User } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { ChevronDown, ChevronUp } from 'lucide-react';

// Definisikan tipe untuk data paginator dari Laravel untuk User
interface UserPaginator {
    data: User[];
    links: {
        url: string | null;
        label: string;
        active: boolean;
    }[];
}

// Definisikan tipe untuk filter yang datang dari controller
interface Filters {
    search: string | null;
    sort_by: string | null;
    sort_direction: string | null;
}

export default function Index({ users, filters }: { users: UserPaginator; filters: Filters }) {
    /**
     * Fungsi yang akan dipanggil saat header tabel di-klik untuk sorting.
     */
    const handleSort = (column: string) => {
        const newDirection = filters.sort_by === column && filters.sort_direction === 'asc' ? 'desc' : 'asc';

        router.get(
            route('admin.users.index'),
            {
                search: filters.search,
                sort_by: column,
                sort_direction: newDirection,
            },
            {
                preserveState: true,
                replace: true,
            },
        );
    };

    /**
     * Komponen kecil untuk membuat header tabel bisa diklik dan menampilkan ikon.
     */
    const SortableHeader = ({ column, label }: { column: string; label: string }) => {
        const isActive = filters.sort_by === column;
        return (
            <button
                className={`flex w-full items-center gap-2 rounded-lg p-2 transition-colors duration-200 ${
                    isActive ? 'bg-primary text-primary-content' : 'hover:bg-base-200'
                }`}
                onClick={() => handleSort(column)}
            >
                <span>{label}</span>
                {isActive && (filters.sort_direction === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />)}
            </button>
        );
    };

    return (
        <AdminLayout header={<h2 className="text-xl font-semibold">Manajemen User</h2>}>
            <Head title="Manajemen User" />

            <div className="bg-base-100 rounded-lg p-6 shadow">
                <div className="mb-6 flex items-center justify-between">
                    <h3 className="text-lg font-medium">Daftar Semua User</h3>
                    {/* Arahkan ke route untuk membuat user baru */}
                    <Link href={route('admin.users.create')} className="btn btn-primary">
                        + Tambah User Baru
                    </Link>
                </div>

                <div className="overflow-x-auto">
                    <table className="table-zebra table w-full">
                        {/* Header Tabel */}
                        <thead>
                            <tr>
                                <th className="p-2">
                                    <SortableHeader column="id" label="ID" />
                                </th>
                                <th className="p-2">
                                    <SortableHeader column="name" label="Nama" />
                                </th>
                                <th className="p-2">
                                    <SortableHeader column="email" label="Email" />
                                </th>
                                <th className="p-2">Role</th>
                                <th className="p-2">Aksi</th>
                            </tr>
                        </thead>
                        {/* Isi Tabel */}
                        <tbody>
                            {users.data.map((user) => (
                                <tr key={user.id} className="hover">
                                    <th>{user.id}</th>
                                    <td className="font-bold">{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>
                                        <div className={`badge font-semibold ${user.role === 'admin' ? 'badge-primary' : 'badge-ghost'}`}>
                                            {user.role}
                                        </div>
                                    </td>
                                    <td className="space-x-2">
                                        <Link href={route('admin.users.edit', user.id)} className="btn btn-sm btn-info">
                                            Edit
                                        </Link>
                                        <Link
                                            href={route('admin.users.destroy', user.id)}
                                            method="delete"
                                            as="button"
                                            className="btn btn-sm btn-error"
                                            // Tambahkan konfirmasi sebelum request dikirim
                                            onBefore={() => confirm('Apakah Anda yakin ingin menghapus user ini?')}
                                        >
                                            Hapus
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Komponen Paginasi */}
                <div className="mt-6 flex justify-center">
                    <div className="join">
                        {users.links.map((link, index) => (
                            <Link
                                key={index}
                                href={link.url || '#'}
                                className={`join-item btn btn-md ${link.active ? 'btn-primary' : ''} ${!link.url ? 'btn-disabled' : ''}`}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
