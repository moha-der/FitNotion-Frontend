'use client'
import { useState } from "react"
import { NewRocker } from "@/app/ui/fonts";
import NavLinks from "./NavLinks";
import Link from "next/link";
import { Bars3CenterLeftIcon } from '@heroicons/react/24/outline';
import MobileNav from "./MobileNav";


export default function Header() {
    const [isOpenMobileNav, setIsOpenMobileNav] = useState(false);
    return (
        <div className="w-screen bg-cardOverlay backdrop-blur-md md:p-3 md:px-4 lg:px-16 shadow-md border-b">
            {/* Tablets y Escritorio */}
            <div className="hidden md:flex w-full justify-between items-center">
                <a className={`${NewRocker.className} antialiased text-3xl text-webColor`}>FitNotion</a>
                <div className="flex flex-row justify-center items-center">
                    <NavLinks Mobile={false}/>
                    <Link href={'/'} className="text-xs uppercase text-white font-medium ml-2 px-4 py-2 bg-webColor rounded-full">Iniciar Sesión</Link>
                </div>
            </div>
            {/* Movil */}
            {isOpenMobileNav ? (
                <MobileNav isOpen={isOpenMobileNav} setIsOpen={setIsOpenMobileNav}/>
            ) : (
                <div className="flex md:hidden flex-row justify-between items-center ml-2 mr-2 py-2">
                    <Bars3CenterLeftIcon className="h-8 w-8 text-black" onClick={ () => setIsOpenMobileNav(!isOpenMobileNav)} />
                    <a className={`${NewRocker.className} antialiased text-3xl text-webColor`}>FitNotion</a>
                    <div className="border-solid border-2 border-gray-200 rounded-lg pl-2 py-1">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15M12 9l3 3m0 0-3 3m3-3H2.25" />
                        </svg>
                    </div>
                </div>
            )
            }
        </div>
    );
}