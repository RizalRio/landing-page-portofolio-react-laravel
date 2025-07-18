// resources/js/Layouts/backend/AdminLayout.tsx

import { PageProps, User } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { ReactNode } from 'react';
// Import ikon-ikon yang akan kita pakai
import { LayoutDashboard, Newspaper, Settings, Users } from 'lucide-react';
import { useEffect } from 'react';
import Swal from 'sweetalert2';

interface AdminLayoutProps {
    children: ReactNode;
    header: ReactNode;
}

// Komponen kecil untuk setiap item menu utama, agar lebih rapi
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
    const { auth } = usePage<{ auth: { user: User } }>().props;
    const { flash } = usePage<PageProps<{ flash: { message?: string; error?: string } }>>().props;

    useEffect(() => {
        if (flash?.message) {
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
        if (flash?.error) {
            Swal.fire({
                toast: true,
                position: 'top-end',
                icon: 'error',
                title: flash.error,
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
            });
        }
    }, [flash]); // Bergantung pada 'flash'

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
                        <div className="flex-1 px-4 text-xl font-semibold">{header}</div>
                        <div className="flex-none">
                            <div className="dropdown dropdown-end">
                                <div tabIndex={0} role="button" className="btn btn-ghost">
                                    <div>{auth.user.name}</div>
                                    <svg width="12px" height="12px" className="ml-1 h-3 w-3 fill-current" viewBox="0 0 2048 2048">
                                        {' '}
                                        <path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z"></path>{' '}
                                    </svg>
                                </div>
                                <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
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

                    {/* -- Sidebar Menu -- */}
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
                                <details
                                    className="group"
                                    // 'open' akan membuat dropdown ini terbuka secara default
                                    open
                                >
                                    <summary
                                        className={`menu-item hover:bg-base-300 flex items-center justify-between rounded-lg p-3 transition-colors ${
                                            route().current('admin.posts.*') ||
                                            route().current('admin.categories.*') ||
                                            route().current('admin.tags.*')
                                                ? 'active bg-primary text-primary-content'
                                                : ''
                                        }`}
                                    >
                                        {/* Kita bungkus ikon dan teks dalam satu div agar tetap menyatu */}
                                        <div className="flex items-center gap-4">
                                            <Newspaper size={20} />
                                            <span>Blog</span>
                                        </div>
                                        {/* Panah dari DaisyUI akan otomatis mengisi ruang sisa di kanan */}
                                    </summary>
                                    <ul className="menu-item mt-2 space-y-2 pl-8">
                                        <li>
                                            <Link
                                                href={route('admin.posts.index')}
                                                className={
                                                    route().current('admin.posts.index') ||
                                                    route().current('admin.posts.edit') ||
                                                    route().current('admin.posts.create')
                                                        ? 'active'
                                                        : ''
                                                }
                                            >
                                                Semua Post
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                href={route('admin.categories.index')}
                                                className={route().current('admin.categories.index') ? 'active' : ''}
                                            >
                                                Kategori
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href={route('admin.tags.index')} className={route().current('admin.tags.*') ? 'active' : ''}>
                                                Tag
                                            </Link>
                                        </li>
                                    </ul>
                                </details>
                            </li>
                            <li>
                                <NavLink href={route('admin.users.index')} active={route().current('admin.users.*')}>
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
