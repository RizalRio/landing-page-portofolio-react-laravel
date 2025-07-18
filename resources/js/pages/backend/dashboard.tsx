// resources/js/Pages/Backend/Dashboard.tsx

import AdminLayout from '@/layouts/backend/admin-layout';
import { PageProps, Post } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { BookOpen, Folder, Users } from 'lucide-react';

interface Stats {
    posts: number;
    categories: number;
    users: number;
}

export default function Dashboard({ stats, recentPosts }: PageProps<{ stats: Stats; recentPosts: Post[] }>) {
    const { auth } = usePage<PageProps>().props;

    return (
        <AdminLayout header={<h2 className="text-xl font-semibold">Dashboard</h2>}>
            <Head title="Admin Dashboard" />

            {/* Kartu Statistik */}
            <div className="stats stats-vertical lg:stats-horizontal bg-base-100 w-full shadow">
                <div className="stat">
                    <div className="stat-figure text-primary">
                        <BookOpen className="inline-block h-8 w-8 stroke-current" />
                    </div>
                    <div className="stat-title">Total Posts</div>
                    <div className="stat-value">{stats.posts}</div>
                </div>

                <div className="stat">
                    <div className="stat-figure text-secondary">
                        <Folder className="inline-block h-8 w-8 stroke-current" />
                    </div>
                    <div className="stat-title">Total Kategori</div>
                    <div className="stat-value">{stats.categories}</div>
                </div>

                <div className="stat">
                    <div className="stat-figure text-accent">
                        <Users className="inline-block h-8 w-8 stroke-current" />
                    </div>
                    <div className="stat-title">Total Users</div>
                    <div className="stat-value">{stats.users}</div>
                </div>
            </div>

            {/* Post Terbaru */}
            <div className="mt-8">
                <div className="bg-base-100 rounded-lg p-6 shadow">
                    <h3 className="mb-4 text-lg font-medium">Post Terbaru</h3>
                    <div className="overflow-x-auto">
                        <table className="table w-full">
                            <thead>
                                <tr>
                                    <th>Judul</th>
                                    <th>Author</th>
                                    <th>Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {recentPosts.map((post) => (
                                    <tr key={post.id} className="hover">
                                        <td className="font-bold">{post.title}</td>
                                        <td>{post.user.name}</td>
                                        <td>
                                            <Link href={route('admin.posts.edit', post.id)} className="btn btn-xs btn-info">
                                                Lihat & Edit
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
