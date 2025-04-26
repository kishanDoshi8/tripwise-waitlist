import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./navbar";

export default function AppLayout() {
    return (
        <React.Fragment>
            <header className={`fixed top-0 w-full bg-slate-950 z-50`}>
                <Navbar />
            </header>

            <main className={`min-h-screen w-full bg-[radial-gradient(at_50%_95%,_theme('colors.emerald.900'),_theme('colors.slate.950'))] pt-28 pb-12 px-8 font-mono`}>
                <Outlet />
            </main>
        </React.Fragment>
    )
}