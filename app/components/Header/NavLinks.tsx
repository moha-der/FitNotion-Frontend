'use client'
import Link from "next/link";
import { useSession } from "next-auth/react";

const links = [
    { name: 'Inicio', href: '/' },
    { name: 'Alimentos', href: '/alimentos' },
    { name: 'Ejercicio', href: '/ejercicio' },
    { name: 'Acerca De', href: '/about' },
];

export default function NavLinks({
    Mobile
}: {
    Mobile: boolean;
}) {
    const { data: session } = useSession();
    const isNutricionista = session?.user.permiso === 2;
    const isCliente = session?.user.permiso === 1;


    return (
        <nav className={`flex ${Mobile ? 'flex-col gap-6' : 'gap-4'}`}>
            {links.map((link, index) => {
                const ultimoLink = index === (links.length - 1);
                return (
                    <Link
                        key={link.name}
                        href={link.href}
                        className={`text-sm font-medium px-4 ${Mobile ? '' : (ultimoLink ? 'border-r border-gray-300' : 'border-r border-gray-300')}`}
                    >
                        {link.name}
                    </Link>
                );
            })}
            {isCliente && (
                <>
                    <Link href='/panel/dietas' className="text-sm font-medium px-4 md:border-r md:border-gray-300">
                        Dietas
                    </Link>
                    <Link href='/panel' className="text-sm font-medium px-4 md:border-r md:border-gray-300">
                        Registro Diario
                    </Link>
                </>
            )}
            {isNutricionista && (
                <Link href='/portalNutricionista' className="text-sm font-medium px-4 md:border-r md:border-gray-300">
                    Dietas
                </Link>
            )}
        </nav>
    );
}
