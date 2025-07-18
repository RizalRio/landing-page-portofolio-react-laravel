// resources/js/Pages/Frontend/Welcome.tsx

import CardSimple from '@/components/frontend/card-simple';
import Hero from '@/components/frontend/hero';
import MasterLayout from '@/layouts/frontend/master-layout';
import SectionLayout from '@/layouts/frontend/section-layout';

import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';

// Aku asumsikan tipe data features dan posts seperti ini, sesuaikan jika perlu
interface Feature {
    title: string;
    description: string;
    image: string;
}
interface Post {
    id: number;
    title: string;
    excerpt: string;
    slug: string;
    published_at: string;
}

export default function Welcome({ features, posts }: { features: Feature[]; posts: Post[] }) {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head title="Selamat Datang di Webify" />
            <MasterLayout>
                <Hero></Hero>
                {/* ========== STATS SECTION ========== */}
                <section className="body-font bg-base-300 px-12" id="stats">
                    <SectionLayout>
                        <div className="-m-4 flex flex-wrap text-center">
                            <div className="w-1/2 p-4 sm:w-1/4">
                                <h2 className="title-font text-primary text-3xl font-medium sm:text-4xl">15+</h2>
                                <p className="leading-relaxed">Proyek Selesai</p>
                            </div>
                            <div className="w-1/2 p-4 sm:w-1/4">
                                <h2 className="title-font text-primary text-3xl font-medium sm:text-4xl">10+</h2>
                                <p className="leading-relaxed">Klien Puas</p>
                            </div>
                            <div className="w-1/2 p-4 sm:w-1/4">
                                <h2 className="title-font text-primary text-3xl font-medium sm:text-4xl">3+</h2>
                                <p className="leading-relaxed">Tahun Pengalaman</p>
                            </div>
                            <div className="w-1/2 p-4 sm:w-1/4">
                                <h2 className="title-font text-primary text-3xl font-medium sm:text-4xl">24/7</h2>
                                <p className="leading-relaxed">Dukungan Teknis</p>
                            </div>
                        </div>
                    </SectionLayout>
                </section>

                {/* ========== FEATURES SECTION ========== */}
                <section className="body-font bg-base-100 px-12" id="features">
                    <SectionLayout>
                        <div className="mb-20 flex w-full flex-col text-center">
                            <h2 className="title-font text-primary mb-1 text-xs font-medium tracking-widest">KENAPA MEMILIH KAMI?</h2>
                            <h1 className="title-font mb-4 text-2xl font-medium sm:text-3xl">Website Hebat Adalah Investasi Masa Depan</h1>
                            <p className="mx-auto text-base leading-relaxed lg:w-2/3">
                                Kami tidak hanya menciptakan website yang memukau, tetapi juga membangun fondasi digital untuk pertumbuhan bisnis
                                Anda. Dengan desain yang menarik dan fitur yang tepat sasaran, kami membantu Anda mengubah pengunjung menjadi
                                pelanggan setia.
                            </p>
                        </div>
                        <div className="-mx-4 -mt-4 -mb-10 flex flex-wrap space-y-6 sm:-m-4 md:space-y-0">
                            {features.map((feature, index) => (
                                <div className="p-4 md:w-1/3" key={index}>
                                    <CardSimple
                                        data={{
                                            title: feature.title,
                                            description: feature.description,
                                            image: feature.image,
                                        }}
                                    ></CardSimple>
                                </div>
                            ))}
                        </div>
                    </SectionLayout>
                </section>

                {/* ========== CTA SECTION ========== */}
                <section className="body-font bg-primary px-12" id="cta">
                    <SectionLayout>
                        <div className="mx-auto flex flex-col items-center text-center sm:flex-row sm:items-center lg:w-2/3">
                            <h1 className="title-font text-primary-content flex-grow text-2xl font-medium sm:pr-16">
                                Siap Mengubah Ide Anda Menjadi Kenyataan? Mari Berkolaborasi.
                            </h1>
                            <Link href="#contact" className="btn btn-accent mt-10 w-50 flex-shrink-0">
                                Hubungi Kami
                            </Link>
                        </div>
                    </SectionLayout>
                </section>

                {/* ========== BLOG SECTION ========== */}
                <section className="body-font bg-base-300 overflow-hidden px-12" id="blog">
                    <SectionLayout>
                        <div className="mb-20 flex w-full flex-wrap">
                            <div className="mb-6 w-full lg:mb-0 lg:w-1/2">
                                <h2 className="title-font text-primary mb-1 text-xs font-medium tracking-widest">WAWASAN TERBARU</h2>
                                <h1 className="title-font mb-2 text-2xl font-medium sm:text-3xl">Dari Blog Kami</h1>
                                <div className="bg-primary h-1 w-20 rounded"></div>
                            </div>
                        </div>
                        <div className="-my-8 divide-y-2 divide-gray-700">
                            {posts.map((post) => (
                                <div key={post.id} className="flex flex-wrap py-8 md:flex-nowrap">
                                    <div className="mb-6 flex flex-shrink-0 flex-col md:mb-0 md:w-64">
                                        <span className="title-font text-secondary font-semibold">KATEGORI</span>
                                        <span className="mt-1 text-sm text-gray-400">
                                            {new Date(post.published_at).toLocaleDateString('id-ID', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric',
                                            })}
                                        </span>
                                    </div>
                                    <div className="md:flex-grow">
                                        <h2 className="title-font mb-2 text-2xl font-medium">{post.title}</h2>
                                        <p className="leading-relaxed">{post.excerpt}</p>
                                        <Link href={`/blog/${post.slug}`} className="text-accent mt-4 inline-flex items-center">
                                            Baca Selengkapnya
                                            <svg
                                                className="ml-2 h-4 w-4"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                fill="none"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            >
                                                <path d="M5 12h14"></path>
                                                <path d="M12 5l7 7-7 7"></path>
                                            </svg>
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </SectionLayout>
                </section>

                {/* ========== PORTOFOLIO SECTION (UPDATED) ========== */}
                <section className="body-font bg-base-100 px-12" id="portofolio">
                    <SectionLayout>
                        <div className="mb-20 flex w-full flex-wrap">
                            <div className="mb-6 w-full lg:mb-0 lg:w-1/2">
                                <h2 className="title-font text-primary mb-1 text-xs font-medium tracking-widest">KARYA KAMI</h2>
                                <h1 className="title-font mb-2 text-2xl font-medium sm:text-3xl">Proyek yang Telah Kami Wujudkan</h1>
                                <div className="bg-primary h-1 w-20 rounded"></div>
                            </div>
                            <p className="w-full text-base leading-relaxed lg:w-1/2">
                                Setiap proyek adalah cerita. Kami bangga telah membantu berbagai klien dari beragam industri untuk bertransformasi
                                secara digital dan mencapai tujuan bisnis mereka.
                            </p>
                        </div>
                        <div className="-m-4 flex flex-wrap">
                            <div className="p-4 md:w-1/2 xl:w-1/4">
                                <div className="bg-base-300 rounded-lg p-6">
                                    <img
                                        className="mb-6 h-40 w-full rounded object-cover object-center"
                                        src="https://picsum.photos/seed/project1/720/400"
                                        alt="content"
                                    />
                                    <h3 className="text-primary title-font text-xs font-medium tracking-widest">E-COMMERCE</h3>
                                    <h2 className="title-font mb-2 text-lg font-medium">Toko Kopi Senja</h2>
                                    <p className="text-base leading-relaxed">
                                        Platform e-commerce modern untuk brand kopi lokal dengan integrasi pembayaran lengkap.
                                    </p>
                                </div>
                            </div>
                            <div className="p-4 md:w-1/2 xl:w-1/4">
                                <div className="bg-base-300 rounded-lg p-6">
                                    <img
                                        className="mb-6 h-40 w-full rounded object-cover object-center"
                                        src="https://picsum.photos/seed/project2/721/401"
                                        alt="content"
                                    />
                                    <h3 className="text-primary title-font text-xs font-medium tracking-widest">COMPANY PROFILE</h3>
                                    <h2 className="title-font mb-2 text-lg font-medium">Constructa ID</h2>
                                    <p className="text-base leading-relaxed">
                                        Website profil perusahaan konstruksi yang elegan, menonjolkan portofolio proyek skala besar.
                                    </p>
                                </div>
                            </div>
                            <div className="p-4 md:w-1/2 xl:w-1/4">
                                <div className="bg-base-300 rounded-lg p-6">
                                    <img
                                        className="mb-6 h-40 w-full rounded object-cover object-center"
                                        src="https://picsum.photos/seed/project3/722/402"
                                        alt="content"
                                    />
                                    <h3 className="text-primary title-font text-xs font-medium tracking-widest">LANDING PAGE</h3>
                                    <h2 className="title-font mb-2 text-lg font-medium">Webinar Tech 2025</h2>
                                    <p className="text-base leading-relaxed">
                                        Landing page interaktif untuk event teknologi tahunan dengan sistem pendaftaran online.
                                    </p>
                                </div>
                            </div>
                            <div className="p-4 md:w-1/2 xl:w-1/4">
                                <div className="bg-base-300 rounded-lg p-6">
                                    <img
                                        className="mb-6 h-40 w-full rounded object-cover object-center"
                                        src="https://picsum.photos/seed/project4/723/403"
                                        alt="content"
                                    />
                                    <h3 className="text-primary title-font text-xs font-medium tracking-widest">SISTEM INFORMASI</h3>
                                    <h2 className="title-font mb-2 text-lg font-medium">Klinik Sehat Medika</h2>
                                    <p className="text-base leading-relaxed">
                                        Sistem manajemen pasien dan jadwal dokter berbasis web untuk klinik modern.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </SectionLayout>
                </section>

                {/* ========== PRICING SECTION (UPDATED) ========== */}
                <section className="body-font bg-base-200 overflow-hidden px-12" id="pricing">
                    <SectionLayout>
                        <div className="mb-20 flex w-full flex-col text-center">
                            <h1 className="title-font mb-2 text-3xl font-medium sm:text-4xl">Paket Layanan Fleksibel</h1>
                            <p className="mx-auto text-base leading-relaxed lg:w-2/3">
                                Investasi terbaik untuk pertumbuhan digital bisnis Anda. Pilih paket yang paling sesuai dengan kebutuhanmu.
                            </p>
                        </div>
                        <div className="-m-4 flex flex-wrap justify-center">
                            <div className="w-full p-4 md:w-1/2 xl:w-1/3">
                                <div className="relative flex h-full flex-col overflow-hidden rounded-lg border-2 border-gray-700 p-6">
                                    <h2 className="title-font mb-1 text-sm font-medium tracking-widest">STARTER</h2>
                                    <h1 className="mb-4 border-b border-gray-800 pb-4 text-5xl leading-none">Rp 5 Juta</h1>
                                    <p className="mb-2 flex items-center">
                                        <span className="mr-2 inline-flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full bg-gray-800 text-gray-500">
                                            <svg
                                                fill="none"
                                                stroke="currentColor"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                stroke-width="2.5"
                                                className="h-3 w-3"
                                                viewBox="0 0 24 24"
                                            >
                                                <path d="M20 6L9 17l-5-5"></path>
                                            </svg>
                                        </span>
                                        5 Halaman Statis
                                    </p>
                                    <p className="mb-2 flex items-center">
                                        <span className="mr-2 inline-flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full bg-gray-800 text-gray-500">
                                            <svg
                                                fill="none"
                                                stroke="currentColor"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                stroke-width="2.5"
                                                className="h-3 w-3"
                                                viewBox="0 0 24 24"
                                            >
                                                <path d="M20 6L9 17l-5-5"></path>
                                            </svg>
                                        </span>
                                        Desain Responsif
                                    </p>
                                    <p className="mb-6 flex items-center">
                                        <span className="mr-2 inline-flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full bg-gray-800 text-gray-500">
                                            <svg
                                                fill="none"
                                                stroke="currentColor"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                stroke-width="2.5"
                                                className="h-3 w-3"
                                                viewBox="0 0 24 24"
                                            >
                                                <path d="M20 6L9 17l-5-5"></path>
                                            </svg>
                                        </span>
                                        Kontak Form
                                    </p>
                                    <button className="btn btn-outline btn-primary mt-auto">Pilih Paket</button>
                                </div>
                            </div>
                            <div className="w-full p-4 md:w-1/2 xl:w-1/3">
                                <div className="border-primary relative flex h-full flex-col overflow-hidden rounded-lg border-2 p-6">
                                    <span className="bg-primary text-primary-content absolute top-0 right-0 rounded-bl px-3 py-1 text-xs tracking-widest">
                                        PALING POPULER
                                    </span>
                                    <h2 className="title-font mb-1 text-sm font-medium tracking-widest">BUSINESS</h2>
                                    <h1 className="mb-4 flex items-center border-b border-gray-800 pb-4 text-5xl leading-none">
                                        <span>Rp 15 Juta</span>
                                    </h1>
                                    <p className="mb-2 flex items-center">
                                        <span className="mr-2 inline-flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full bg-gray-800 text-gray-500">
                                            <svg
                                                fill="none"
                                                stroke="currentColor"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                stroke-width="2.5"
                                                className="h-3 w-3"
                                                viewBox="0 0 24 24"
                                            >
                                                <path d="M20 6L9 17l-5-5"></path>
                                            </svg>
                                        </span>
                                        10 Halaman Dinamis
                                    </p>
                                    <p className="mb-2 flex items-center">
                                        <span className="mr-2 inline-flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full bg-gray-800 text-gray-500">
                                            <svg
                                                fill="none"
                                                stroke="currentColor"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                stroke-width="2.5"
                                                className="h-3 w-3"
                                                viewBox="0 0 24 24"
                                            >
                                                <path d="M20 6L9 17l-5-5"></path>
                                            </svg>
                                        </span>
                                        CMS Panel Admin
                                    </p>
                                    <p className="mb-2 flex items-center">
                                        <span className="mr-2 inline-flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full bg-gray-800 text-gray-500">
                                            <svg
                                                fill="none"
                                                stroke="currentColor"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                stroke-width="2.5"
                                                className="h-3 w-3"
                                                viewBox="0 0 24 24"
                                            >
                                                <path d="M20 6L9 17l-5-5"></path>
                                            </svg>
                                        </span>
                                        Fitur Blog
                                    </p>
                                    <p className="mb-6 flex items-center">
                                        <span className="mr-2 inline-flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full bg-gray-800 text-gray-500">
                                            <svg
                                                fill="none"
                                                stroke="currentColor"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                stroke-width="2.5"
                                                className="h-3 w-3"
                                                viewBox="0 0 24 24"
                                            >
                                                <path d="M20 6L9 17l-5-5"></path>
                                            </svg>
                                        </span>
                                        Dukungan SEO Dasar
                                    </p>
                                    <button className="btn btn-primary mt-auto">Pilih Paket</button>
                                </div>
                            </div>
                            <div className="w-full p-4 md:w-1/2 xl:w-1/3">
                                <div className="relative flex h-full flex-col overflow-hidden rounded-lg border-2 border-gray-700 p-6">
                                    <h2 className="title-font mb-1 text-sm font-medium tracking-widest">ENTERPRISE</h2>
                                    <h1 className="mb-4 flex items-center border-b border-gray-800 pb-4 text-5xl leading-none">
                                        <span>Hubungi Kami</span>
                                    </h1>
                                    <p className="mb-2 flex items-center">
                                        <span className="mr-2 inline-flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full bg-gray-800 text-gray-500">
                                            <svg
                                                fill="none"
                                                stroke="currentColor"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                stroke-width="2.5"
                                                className="h-3 w-3"
                                                viewBox="0 0 24 24"
                                            >
                                                <path d="M20 6L9 17l-5-5"></path>
                                            </svg>
                                        </span>
                                        Fitur Sesuai Kebutuhan
                                    </p>
                                    <p className="mb-2 flex items-center">
                                        <span className="mr-2 inline-flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full bg-gray-800 text-gray-500">
                                            <svg
                                                fill="none"
                                                stroke="currentColor"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                stroke-width="2.5"
                                                className="h-3 w-3"
                                                viewBox="0 0 24 24"
                                            >
                                                <path d="M20 6L9 17l-5-5"></path>
                                            </svg>
                                        </span>
                                        Integrasi Pihak Ketiga
                                    </p>
                                    <p className="mb-2 flex items-center">
                                        <span className="mr-2 inline-flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full bg-gray-800 text-gray-500">
                                            <svg
                                                fill="none"
                                                stroke="currentColor"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                stroke-width="2.5"
                                                className="h-3 w-3"
                                                viewBox="0 0 24 24"
                                            >
                                                <path d="M20 6L9 17l-5-5"></path>
                                            </svg>
                                        </span>
                                        Dukungan Penuh
                                    </p>
                                    <p className="mb-6 flex items-center">
                                        <span className="mr-2 inline-flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full bg-gray-800 text-gray-500">
                                            <svg
                                                fill="none"
                                                stroke="currentColor"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                stroke-width="2.5"
                                                className="h-3 w-3"
                                                viewBox="0 0 24 24"
                                            >
                                                <path d="M20 6L9 17l-5-5"></path>
                                            </svg>
                                        </span>
                                        Skalabilitas Tinggi
                                    </p>
                                    <button className="btn btn-outline btn-primary mt-auto">Diskusikan Proyek</button>
                                </div>
                            </div>
                        </div>
                    </SectionLayout>
                </section>

                {/* ========== TEAM SECTION (UPDATED) ========== */}
                <section className="body-font bg-base-100 px-12" id="team">
                    <SectionLayout>
                        <div className="mb-20 flex w-full flex-col text-center">
                            <h1 className="title-font mb-4 text-2xl font-medium sm:text-3xl">Tim Profesional Kami</h1>
                            <p className="lg:w-2-3 mx-auto text-base leading-relaxed">
                                Kami adalah sekelompok individu yang bersemangat dalam teknologi dan desain, bekerja sama untuk mengubah ide-ide hebat
                                menjadi kenyataan digital.
                            </p>
                        </div>
                        <div className="-m-4 flex flex-wrap justify-center">
                            {/* --- Anggota Tim 1 --- */}
                            <div className="p-4 md:w-1/2 lg:w-1/3">
                                <div className="bg-base-300 flex h-full flex-col items-center rounded-lg p-8 text-center">
                                    <img
                                        alt="team"
                                        className="border-primary mb-4 h-48 w-48 flex-shrink-0 rounded-full border-4 object-cover object-center sm:mb-0"
                                        src="https://picsum.photos/seed/team1/200/200"
                                    />
                                    <div className="flex-grow pt-4">
                                        <h2 className="title-font text-secondary text-lg font-medium">Rizal Pratama</h2>
                                        <h3 className="mb-3">Lead Developer</h3>
                                        <p className="mb-4 font-light">
                                            Spesialis backend dan arsitektur sistem. Memastikan aplikasi Anda berjalan cepat, aman, dan scalable.
                                        </p>
                                        <span className="inline-flex gap-3">
                                            <a className="hover:text-primary text-gray-500 transition">
                                                {/* Ganti dengan ikon sosial media */}
                                                <svg
                                                    fill="none"
                                                    stroke="currentColor"
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                    stroke-width="2"
                                                    className="h-5 w-5"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                                                </svg>
                                            </a>
                                            <a className="hover:text-primary text-gray-500 transition">
                                                <svg
                                                    fill="none"
                                                    stroke="currentColor"
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                    stroke-width="2"
                                                    className="h-5 w-5"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                                                </svg>
                                            </a>
                                        </span>
                                    </div>
                                </div>
                            </div>
                            {/* --- Anggota Tim 2 --- */}
                            <div className="p-4 md:w-1/2 lg:w-1/3">
                                <div className="bg-base-300 flex h-full flex-col items-center rounded-lg p-8 text-center">
                                    <img
                                        alt="team"
                                        className="border-primary mb-4 h-48 w-48 flex-shrink-0 rounded-full border-4 object-cover object-center sm:mb-0"
                                        src="https://picsum.photos/seed/team2/201/201"
                                    />
                                    <div className="flex-grow pt-4">
                                        <h2 className="title-font text-secondary text-lg font-medium">Citra Lestari</h2>
                                        <h3 className="mb-3">UI/UX Designer</h3>
                                        <p className="mb-4 font-light">
                                            Menerjemahkan ide kompleks menjadi desain yang indah, intuitif, dan ramah pengguna.
                                        </p>
                                        <span className="inline-flex gap-3">
                                            <a className="hover:text-primary text-gray-500 transition">
                                                <svg
                                                    fill="none"
                                                    stroke="currentColor"
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                    stroke-width="2"
                                                    className="h-5 w-5"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                                                </svg>
                                            </a>
                                            <a className="hover:text-primary text-gray-500 transition">
                                                <svg
                                                    fill="none"
                                                    stroke="currentColor"
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                    stroke-width="2"
                                                    className="h-5 w-5"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                                                </svg>
                                            </a>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </SectionLayout>
                </section>

                {/* ========== CONTACT SECTION ========== */}
                <section className="body-font bg-base-200 relative px-12" id="contact">
                    <div className="container mx-auto flex flex-wrap px-5 py-24 sm:flex-nowrap">
                        <div className="bg-base-300 relative flex items-end justify-start overflow-hidden rounded-lg p-10 sm:mr-10 md:w-1/2 lg:w-2/3">
                            <iframe
                                width="100%"
                                height="100%"
                                title="map"
                                className="absolute inset-0"
                                frameBorder="0"
                                marginHeight={0}
                                marginWidth={0}
                                scrolling="no"
                                src="https://maps.google.com/maps?width=100%&height=600&hl=en&q=Jakarta&ie=UTF8&t=&z=14&iwloc=B&output=embed"
                                style={{ filter: 'grayscale(1) contrast(1.2) opacity(0.5)' }}
                            ></iframe>
                            <div className="bg-base-100 relative flex flex-wrap rounded py-6 shadow-md">
                                <div className="px-6 lg:w-1/2">
                                    <h2 className="title-font text-xs font-semibold tracking-widest">ALAMAT</h2>
                                    <p className="mt-1 font-thin">Jl. Jend. Sudirman Kav. 52-53, Jakarta Selatan, Indonesia</p>
                                </div>
                                <div className="mt-4 px-6 lg:mt-0 lg:w-1/2">
                                    <h2 className="title-font text-xs font-semibold tracking-widest">EMAIL</h2>
                                    <a className="text-primary leading-relaxed">kontak@webify.com</a>
                                    <h2 className="title-font mt-4 text-xs font-semibold tracking-widest">TELEPON</h2>
                                    <p className="leading-relaxed font-thin">+62 21 1234 5678</p>
                                </div>
                            </div>
                        </div>
                        <div className="mt-8 flex w-full flex-col md:mt-0 md:ml-auto md:w-1/2 md:py-8 lg:w-1/3">
                            <h2 className="title-font mb-1 text-lg font-medium">Hubungi Kami</h2>
                            <p className="mb-5 leading-relaxed font-light">
                                Punya proyek atau pertanyaan? Jangan ragu untuk mengirim pesan kepada kami.
                            </p>
                            <div className="relative mb-4">
                                <label htmlFor="name" className="label-text">
                                    Nama Lengkap
                                </label>
                                <input type="text" id="name" name="name" className="input input-bordered w-full" />
                            </div>
                            <div className="relative mb-4">
                                <label htmlFor="email" className="label-text">
                                    Email
                                </label>
                                <input type="email" id="email" name="email" className="input input-bordered w-full" />
                            </div>
                            <div className="relative mb-4">
                                <label htmlFor="message" className="label-text">
                                    Pesan
                                </label>
                                <textarea id="message" name="message" className="textarea textarea-bordered h-32 w-full"></textarea>
                            </div>
                            <button className="btn btn-primary">Kirim Pesan</button>
                        </div>
                    </div>
                </section>
            </MasterLayout>
        </>
    );
}
