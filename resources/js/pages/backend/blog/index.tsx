// resources/js/Pages/Backend/Blog/Index.tsx

import AdminLayout from '@/layouts/backend/admin-layout';
import { PageProps, Post } from '@/types';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useEffect, useState } from 'react';

// Definisikan tipe untuk data paginator dari Laravel
interface PostPaginator {
    data: Post[];
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

export default function Index({ posts, filters }: { posts: PostPaginator; filters: Filters }) {
    const { auth } = usePage<PageProps>().props;

    // State untuk search term, diisi dengan nilai dari filter jika ada
    const [searchTerm, setSearchTerm] = useState(filters.search || '');
    /**
     * Fungsi yang akan dipanggil saat header tabel di-klik.
     * Ia akan mengirim request baru ke server dengan parameter sorting yang diperbarui.
     */
    const handleSort = (column: string) => {
        // Jika kolom yang diklik sama dengan yang aktif, balik arahnya. Jika tidak, mulai dengan 'asc'.
        const newDirection = filters.sort_by === column && filters.sort_direction === 'asc' ? 'desc' : 'asc';

        router.get(
            route('admin.posts.index'),
            {
                // Kita sertakan parameter yang sudah ada agar tidak hilang
                search: filters.search,
                sort_by: column,
                sort_direction: newDirection,
            },
            {
                preserveState: true, // Jaga state lain seperti isi kotak pencarian
                replace: true, // Ganti history browser agar tidak menumpuk
            },
        );
    };

    /**
     * Komponen kecil untuk membuat header tabel bisa diklik dan menampilkan ikon panah.
     */
    const SortableHeader = ({ column, label }: { column: string; label: string }) => {
        // Cek apakah kolom ini sedang aktif di-sort
        const isActive = filters.sort_by === column;

        return (
            <button
                className={`flex w-full items-center gap-2 rounded-lg p-2 transition-colors duration-200 ${
                    isActive
                        ? 'bg-primary text-primary-content' // Style saat kolom AKTIF
                        : 'hover:bg-base-200' // Style saat di-HOVER
                }`}
                onClick={() => handleSort(column)}
            >
                <span>{label}</span>
                {/* Tampilkan ikon hanya jika kolom ini aktif */}
                {isActive && (filters.sort_direction === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />)}
            </button>
        );
    };

    // !! INI LOGIKA BARUNYA: useEffect untuk debounce !!
    useEffect(() => {
        // Buat timer
        const debounce = setTimeout(() => {
            // Kirim request ke server dengan search term yang baru
            router.get(
                route('admin.posts.index'),
                {
                    // Sertakan semua filter yang ada
                    search: searchTerm,
                    sort_by: filters.sort_by,
                    sort_direction: filters.sort_direction,
                },
                {
                    preserveState: true,
                    replace: true,
                },
            );
        }, 300); // Tunggu 300ms setelah user berhenti mengetik

        // Bersihkan timer jika user mengetik lagi sebelum 300ms
        return () => clearTimeout(debounce);
    }, [searchTerm]); // Jalankan efek ini setiap kali 'searchTerm' berubah

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    return (
        <AdminLayout header={<h2 className="text-xl font-semibold">Manajemen Blog</h2>}>
            <Head title="Manajemen Blog" />

            <div className="bg-base-100 rounded-lg p-6 shadow">
                <div className="mb-6 flex items-center justify-between">
                    <Link href={route('admin.posts.create')} className="btn btn-primary">
                        + Tambah Post Baru
                    </Link>
                    <input
                        type="text"
                        placeholder="Cari post..."
                        className="input input-bordered w-full max-w-xs"
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />
                </div>

                <div className="overflow-x-auto">
                    <table className="table-zebra table w-full">
                        <thead>
                            <tr>
                                <th>
                                    <SortableHeader column="id" label="ID" />
                                </th>
                                <th>
                                    <SortableHeader column="title" label="Judul" />
                                </th>
                                <th>Author</th>
                                <th>
                                    <SortableHeader column="status" label="Status" />
                                </th>
                                <th>Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {posts.data.map((post) => (
                                <tr key={post.id} className="hover">
                                    <th>{post.id}</th>
                                    <td className="font-bold">{post.title}</td>
                                    <td>{post.user.name}</td>
                                    <td>
                                        <div
                                            className={`badge font-semibold ${
                                                post.status === 'published'
                                                    ? 'badge-success'
                                                    : post.status === 'draft'
                                                      ? 'badge-warning'
                                                      : 'badge-ghost'
                                            }`}
                                        >
                                            {post.status}
                                        </div>
                                    </td>
                                    <td className="space-x-2">
                                        <Link href={route('admin.posts.edit', post.id)} className="btn btn-sm btn-info">
                                            Edit
                                        </Link>
                                        <Link
                                            href={route('admin.posts.destroy', post.id)}
                                            method="delete"
                                            as="button"
                                            className="btn btn-sm btn-error"
                                            onBefore={() => confirm('Apakah Anda yakin ingin menghapus post ini?')}
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
                        {posts.links.map((link, index) => (
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
