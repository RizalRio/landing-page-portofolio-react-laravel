// resources/js/Pages/frontend/Blog/Show.tsx

import MasterLayout from '@/layouts/frontend/master-layout';
import { Post } from '@/types'; // Kita akan definisikan tipe 'Post'
import { Head, Link } from '@inertiajs/react';

interface ShowProps {
    post: Post;
}

export default function Show({ post }: ShowProps) {
    return (
        <>
            <Head title={post.title} /> {/* Judul tab browser jadi dinamis, bagus untuk SEO! */}
            <MasterLayout>
                <div className="bg-base-200 py-24">
                    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                        <div className="bg-base-100 overflow-hidden p-6 shadow-xl sm:rounded-lg md:p-10">
                            <h1 className="mb-4 text-3xl font-bold md:text-4xl">{post.title}</h1>
                            <p className="mb-6 text-gray-500">
                                Dipublikasikan pada{' '}
                                {new Date(post.published_at).toLocaleDateString('id-ID', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                })}
                            </p>

                            <img src={post.image} alt={post.title} className="mb-8 h-auto w-full rounded-lg object-cover shadow-lg md:h-[450px]" />

                            {/* Kelas 'prose' dari Tailwind akan otomatis membuat artikel rapi */}
                            <div className="prose prose-lg max-w-none">
                                <p>{post.body}</p>
                            </div>

                            <div className="mt-12 border-t pt-6 text-center">
                                <Link href="/" className="btn btn-primary btn-outline">
                                    &larr; Kembali ke Halaman Depan
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </MasterLayout>
        </>
    );
}
