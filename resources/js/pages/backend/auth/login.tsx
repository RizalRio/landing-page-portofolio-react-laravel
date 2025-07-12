// resources/js/Pages/Backend/Auth/Login.tsx
import AdminAuthLayout from '@/layouts/backend/admin-auth-layout';
import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

export default function Login() {
    // useForm dari Inertia, cara terbaik handle form!
    const { data, setData, post, processing, errors } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        // Kirim data ke route 'login' yang sudah dibuatkan Breeze
        post(route('login'));
    };

    return (
        <AdminAuthLayout>
            <Head title="Admin Log in" />

            <div className="card bg-base-100 w-full shadow-xl">
                <div className="card-body">
                    <h2 className="card-title mb-4 justify-center text-2xl">Admin Login</h2>

                    <form onSubmit={submit}>
                        {/* Email */}
                        <div className="form-control">
                            <label htmlFor="email" className="input input-bordered w-full">
                                <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                    <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor">
                                        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                                        <circle cx="12" cy="7" r="4"></circle>
                                    </g>
                                </svg>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Email address"
                                    value={data.email}
                                    autoComplete="username"
                                    onChange={(e) => setData('email', e.target.value)}
                                    className={`${errors.email && 'input-error'}`}
                                />
                            </label>
                            {errors.email && <span className="text-error mt-1 text-xs">{errors.email}</span>}
                        </div>

                        {/* Password */}
                        <div className="form-control mt-4">
                            <label htmlFor="password" className="input input-bordered w-full">
                                <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                    <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor">
                                        <path d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                                    </g>
                                </svg>
                                <input
                                    placeholder="Password"
                                    type="password"
                                    name="password"
                                    value={data.password}
                                    autoComplete="current-password"
                                    onChange={(e) => setData('password', e.target.value)}
                                    className={`${errors.password && 'input-error'}`}
                                />
                            </label>
                            {errors.password && <span className="text-error mt-1 text-xs">{errors.password}</span>}
                        </div>

                        {/* Remember Me */}
                        <div className="form-control mt-4">
                            <label className="label cursor-pointer justify-start space-x-2">
                                <input
                                    type="checkbox"
                                    className="checkbox"
                                    name="remember"
                                    checked={data.remember}
                                    onChange={(e) => setData('remember', e.target.checked)}
                                />
                                Remember me
                            </label>
                        </div>

                        {/* Tombol Submit */}
                        <div className="form-control mt-6">
                            <button className="btn btn-primary" disabled={processing}>
                                {processing ? <span className="loading loading-spinner"></span> : 'Log in'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AdminAuthLayout>
    );
}
