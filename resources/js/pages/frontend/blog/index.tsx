import MasterLayout from '@/layouts/frontend/master-layout';
import { Post } from '@/types';
import { Head, Link } from '@inertiajs/react';

// Definisikan tipe untuk data paginator dari Laravel
interface PostPaginator {
    data: Post[];
    links: {
        url: string | null;
        label: string;
        active: boolean;
    }[];
}

// Komponen untuk satu kartu post, agar kode lebih rapi
function PostCard({ post }: { post: Post }) {
    return (
        <div className="card bg-base-100 shadow-xl transition-all duration-300 hover:scale-105">
            <figure>
                <Link href={`/blog/${post.slug}`}>
                    <img src={post.image} alt={post.title} className="h-56 w-full object-cover" />
                </Link>
            </figure>
            <div className="card-body">
                <h2 className="card-title h-14 overflow-hidden">{post.title}</h2>
                <p className="h-24 overflow-hidden">{post.excerpt}</p>
                <div className="card-actions mt-4 justify-end">
                    <Link href={`/blog/${post.slug}`} className="btn btn-primary">
                        Baca Selengkapnya
                    </Link>
                </div>
            </div>
        </div>
    );
}

// Komponen utama untuk halaman Index
export default function Index({ posts }: { posts: PostPaginator }) {
    return (
        <>
            <Head title="Blog" />
            <MasterLayout>
                <div className="bg-base-200 py-24">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        {/* Judul Halaman */}
                        <div className="mb-16 text-center">
                            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Wawasan & Cerita Terbaru</h1>
                            <p className="mt-4 text-xl text-gray-500">Jelajahi semua artikel kami untuk mendapatkan tips dan trik terbaru.</p>
                        </div>

                        {/* Grid untuk daftar artikel */}
                        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                            {posts.data.map((post) => (
                                <PostCard key={post.id} post={post} />
                            ))}
                        </div>

                        {/* Navigasi Paginasi */}
                        <div className="mt-16 flex items-center justify-center space-x-2">
                            {posts.links.map((link, index) => (
                                <Link
                                    key={index}
                                    href={link.url || '#'}
                                    className={`btn ${link.active ? 'btn-primary' : 'btn-outline'} ${!link.url ? 'btn-disabled' : ''}`}
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </MasterLayout>
        </>
    );
}
