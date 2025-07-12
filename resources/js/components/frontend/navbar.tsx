import ThemeController from '@/components/frontend/theme-controller';
import { Link, usePage } from '@inertiajs/react';
const Navbar = () => {
    const { auth } = usePage().props;

    return (
        <nav className="navbar bg-base-100 sticky top-0 z-50 shadow-lg">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            {' '}
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" />{' '}
                        </svg>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                        <li>
                            <Link href={route('home')} className="text-base-content">
                                Homepage
                            </Link>
                        </li>
                        <li>
                            <Link href={'#features'} className="text-base-content">
                                Features
                            </Link>
                        </li>
                        <li>
                            <Link href={'#portofolio'} className="text-base-content">
                                Portofolio
                            </Link>
                        </li>
                        <li>
                            <Link href={route('posts.index')}>Blog</Link>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="navbar-center">
                <a className="btn btn-ghost text-xl">Project Webify</a>
            </div>
            <div className="navbar-end">
                {auth.user ? (
                    // Jika user SUDAH LOGIN, tampilkan ini
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
                                <Link href={route('admin.dashboard')}>Dashboard</Link>
                            </li>
                            <li>
                                {/* INI TOMBOL LOGOUT-NYA */}
                                <Link
                                    href={route('logout')}
                                    method="post" // Kirim sebagai request POST
                                    as="button" // Tampilkan sebagai tombol, bukan link biasa
                                    className="w-full text-left"
                                >
                                    Logout
                                </Link>
                            </li>
                        </ul>
                    </div>
                ) : (
                    // Jika user BELUM LOGIN, tampilkan ini
                    <div className="mr-3 space-x-2">
                        <Link href={route('login')} className="btn btn-soft btn-primary">
                            Log in
                        </Link>
                    </div>
                )}
                <ThemeController></ThemeController>
                <button className="btn btn-ghost btn-circle ml-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        {' '}
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />{' '}
                    </svg>
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
