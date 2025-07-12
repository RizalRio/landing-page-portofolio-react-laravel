// resources/js/Layouts/backend/AdminLayout.tsx

import { User } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { ReactNode, useEffect } from 'react';
// Import ikon-ikon yang akan kita pakai
import { LayoutDashboard, Newspaper, Settings, Users } from 'lucide-react';
import Swal from 'sweetalert2';

interface AdminLayoutProps {
    children: ReactNode;
    header: ReactNode;
}

// Komponen kecil untuk setiap item menu, agar lebih rapi
const NavLink = ({ href, active, children }: { href: string; active: boolean; children: ReactNode }) => (
    <Link
        href={href}
        className={`flex items-center gap-4 rounded-lg p-3 transition-colors ${
            active
                ? 'bg-primary text-primary-content' // Style saat aktif
                : 'hover:bg-base-300' // Style saat hover
        }`}
    >
        {children}
    </Link>
);

export default function AdminLayout({ header, children }: AdminLayoutProps) {
    const { auth, flash } = usePage<{ auth: { user: User }; flash: { message?: string } }>().props;

    useEffect(() => {
        // Dari: if (flash.message)
        // Menjadi:
        if (flash?.message) {
            // <-- TAMBAHKAN TANDA TANYA (?) DI SINI
            // Jika ada, tampilkan notifikasi toast dari SweetAlert2
            Swal.fire({
                toast: true,
                position: 'top-end',
                icon: 'success',
                title: flash.message,
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
            });
        }
    }, [flash]); // useEffect ini akan berjalan setiap kali 'flash' berubah

    return (
        <>
            <Head title="Admin Panel" />
            <div className="drawer lg:drawer-open">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content bg-base-200 flex flex-col">
                    {/* -- Header / Navbar Admin -- */}
                    <header className="navbar bg-base-100 sticky top-0 z-40 shadow-md">
                        <div className="flex-none lg:hidden">
                            <label htmlFor="my-drawer-2" className="btn btn-square btn-ghost">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    className="inline-block h-6 w-6 stroke-current"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                                </svg>
                            </label>
                        </div>
                        <div className="flex-1">{header}</div>
                        <div className="flex-none">
                            <div className="dropdown dropdown-end">
                                <div tabIndex={0} role="button" className="btn btn-ghost">
                                    <div>{auth.user.name}</div>
                                </div>
                                <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                                    <li>
                                        <Link href={route('home')} className="flex items-center gap-2">
                                            Halaman Utama
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href={route('logout')} method="post" as="button">
                                            Logout
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </header>

                    {/* -- Konten Utama Halaman -- */}
                    <main className="flex-1 p-6">{children}</main>
                </div>
                <aside className="drawer-side">
                    <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>

                    {/* -- Sidebar Menu BARU YANG LEBIH KEREN -- */}
                    <div className="menu bg-base-100 text-base-content flex min-h-full w-72 flex-col p-4">
                        {/* Logo / Judul Panel */}
                        <div className="mb-4 p-4 text-2xl font-bold">
                            <Link href={route('admin.dashboard')}>Admin Panel</Link>
                        </div>

                        {/* Menu Utama */}
                        <ul className="flex-grow space-y-2">
                            <li>
                                <NavLink href={route('admin.dashboard')} active={route().current('admin.dashboard')}>
                                    <LayoutDashboard size={20} />
                                    <span>Dashboard</span>
                                </NavLink>
                            </li>

                            {/* Menu Blog dengan Dropdown/Collapse */}
                            <li>
                                <NavLink href={route('admin.posts.index')} active={route().current('admin.posts.index')}>
                                    <Newspaper size={20} />
                                    <span>Blog</span>
                                </NavLink>
                            </li>

                            <li>
                                <NavLink href={route('admin.users.index')} active={route().current('admin.users.index')}>
                                    <Users size={20} />
                                    <span>Manajemen Users</span>
                                </NavLink>
                            </li>
                        </ul>

                        {/* Menu Pengaturan di Bawah */}
                        <div className="mt-auto">
                            <ul className="space-y-2">
                                <li>
                                    <NavLink href="#" active={false}>
                                        <Settings size={20} />
                                        <span>Pengaturan</span>
                                    </NavLink>
                                </li>
                            </ul>
                        </div>
                    </div>
                </aside>
            </div>
        </>
    );
}
