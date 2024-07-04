'use client'
import { useEffect } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import NavLinks from './NavLinks';
import { NewRocker } from "@/app/ui/fonts";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from 'next/navigation';

export default function MobileNav({
    isOpen,
    setIsOpen,
}: {
    isOpen: boolean;
    setIsOpen: any;
}) {
    const { data: session } = useSession();
    const router = useRouter();

    const handleLogout = () => {
        signOut({ callbackUrl: '/login' });
    };

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }

        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isOpen]);

    return (
        <div className={`fixed inset-0 flex flex-col bg-green-50 bg-opacity-100 backdrop-blur-md justify-center gap-16 w-screen h-screen overflow-hidden z-50 ${isOpen ? 'block' : 'hidden'}`}>
            <XMarkIcon className="h-8 w-8 fixed right-4 top-4" onClick={() => setIsOpen(!isOpen)} />
            <div className='flex items-center justify-center w-full h-72 gap-10 flex-col'>
                <NavLinks Mobile={true} />
                {session && (
                    <button
                        onClick={handleLogout}
                        className="text-xs uppercase text-white font-medium ml-2 px-4 py-2 bg-red-600 rounded-full"
                    >
                        Cerrar Sesión
                    </button>
                )}
            </div>
            <a className={`${NewRocker.className} antialiased text-3xl text-webColor flex items-center justify-center w-full italic`}>FitNotion</a>
        </div>
    );
}
