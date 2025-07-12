// resources/js/Layouts/backend/AdminAuthLayout.tsx
import React from 'react';

export default function AdminAuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <main className="bg-base-200 flex min-h-screen flex-col items-center p-4 sm:justify-center sm:p-6">
            <div className="w-full sm:max-w-md">
                {/* Di sini nanti kartu login akan muncul */}
                {children}
            </div>
        </main>
    );
}
