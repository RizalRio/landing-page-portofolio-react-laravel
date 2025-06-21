import Footer from '@/components/frontend/footer';
import Navbar from '@/components/frontend/navbar';
import React from 'react';

export default function MasterLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Navbar></Navbar>
            <div className="main-content">{children}</div>
            <Footer></Footer>
        </>
    );
}
