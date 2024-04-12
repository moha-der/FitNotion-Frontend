'use client'
import { useState, useEffect } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";

const prueba = [
    {
        "nombre": "Juan Pérez",
        "email": "juan@example.com",
        "fecha": "2024-04-07",
        "icono1": "XX",
        "icono2": "YY"
    },
    {
        "nombre": "María García",
        "email": "maria@example.com",
        "fecha": "2024-04-07",
        "icono1": "XX",
        "icono2": "YY"
    },
    {
        "nombre": "Carlos López",
        "email": "carlos@example.com",
        "fecha": "2024-04-07",
        "icono1": "XX",
        "icono2": "YY"
    },
    {
        "nombre": "Ana Martínez",
        "email": "ana@example.com",
        "fecha": "2024-04-07",
        "icono1": "XX",
        "icono2": "YY"
    },
    {
        "nombre": "Pedro Rodríguez",
        "email": "pedro@example.com",
        "fecha": "2024-04-07",
        "icono1": "XX",
        "icono2": "YY"
    }
]

interface IDietas {
    id_Dieta: number;
    nombreCliente: string;
    emailCliente: string;
    fecha: Date;

}

export default function Page() {
    const [data, setData] = useState<IDietas[]>([]);
    const { data: session } = useSession();

    useEffect(() => {

        async function fetchDietas() {
            try {
                if (session) {
                    const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/Dietas/getDietas`, {
                        headers: {
                            Authorization: `Bearer ${session?.user.token}`
                        }
                    });
                    setData(response.data);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }

        }

        fetchDietas();
    }, [session]);

    return (
        <div className="container mx-auto">
            <div className='col-span-12 flex my-4 flex-col border-y-2 md:rounded-xl md:border-2 md:mx-0'>
                <div className="flex justify-between border-b-2 px-4 py-2 bg-webColor md:rounded-t-xl text-white">
                    <span>Seguimiento dietas</span>
                </div>
                <TablaDesktop dietas={data} />
                <TablaMobile dietas={data} />
            </div>

        </div>
    );
}


const TablaDesktop = ({ dietas }: {
    dietas: IDietas[]
}) => {
    return (
        <div className="hidden md:flex flex-col">
            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                    <div className="overflow-hidden">
                        <table className="min-w-full text-center text-sm font-light text-surface ">
                            <thead className="border-b border-neutral-200 font-medium ">
                                <tr>
                                    <th scope="col" className="px-6 py-2">Nombre</th>
                                    <th scope="col" className="px-6 py-2">Email</th>
                                    <th scope="col" className="px-6 py-2">Fecha</th>
                                    <th scope="col" className="px-6 py-2">Detalle dieta</th>
                                    <th scope="col" className="px-6 py-2">Histórico</th>
                                </tr>
                            </thead>
                            <tbody>
                                {dietas ? dietas.map((item, index) => (
                                    <tr key={index} className="border-b border-neutral-200 ">
                                        <td className="whitespace-nowrap px-6 py-2">{item.nombreCliente}</td>
                                        <td className="whitespace-nowrap px-6 py-2">{item.emailCliente}</td>
                                        <td className="whitespace-nowrap px-6 py-2">{new Date(item.fecha).toLocaleDateString()}</td>
                                        <td className="whitespace-nowrap px-6 py-2">
                                            <div className="flex justify-center">
                                                <DetalleIcon />
                                            </div>
                                        </td>
                                        <td className="whitespace-nowrap px-6 py-2">
                                            <div className="flex justify-center">
                                                <HistoricoIcon />
                                            </div>
                                        </td>
                                    </tr>
                                )) : (
                                    <tr>
                                        <td colSpan={5} className="text-center py-4">No hay datos disponibles</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

const TablaMobile = ({ dietas }: {
    dietas: IDietas[]
}) => {
    return (<div className="flex flex-col md:hidden">
        <div className="overflow-x-auto">
            <div className="inline-block min-w-full py-2 ">
                <div className="overflow-hidden">
                    <table className="min-w-full text-left text-sm font-light text-surface ">
                        <thead className="border-b border-neutral-200 font-medium  px-4">
                            <tr>
                                <th scope="col" className="pl-6">Cliente</th>
                                <th scope="col" className="pl-4">Fecha</th>
                                <th scope="col" className=""></th>
                            </tr>
                        </thead>
                        <tbody>
                            {dietas ? dietas.map((item, index) => (
                                <tr key={index} className="border-b border-neutral-200 ">
                                    <td className="whitespace-nowrap px-6 py-2">
                                        <div className="flex flex-col">
                                            <span className="font-semibold">{item.nombreCliente}</span>
                                            <span>{item.emailCliente}</span>
                                        </div>
                                    </td>
                                    <td className="whitespace-nowrap">{new Date(item.fecha).toLocaleDateString()}</td>
                                    <td className="whitespace-nowrap">
                                        <div className="flex flex-row ml-1">
                                            <span className="px-2">
                                                <DetalleIcon />
                                            </span>
                                            <span className="">
                                                <HistoricoIcon />
                                            </span>

                                        </div>
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan={5} className="text-center py-4">No hay datos disponibles</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
    );

}

const HistoricoIcon = () => {
    return (
        <svg className="w-6 h-6" fill="#388e3c" strokeWidth={1.5} stroke="#388e3c" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
        </svg>
    );
}

const DetalleIcon = () => {
    return (
        <svg className="w-6 h-6" fill="#388e3c" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
            <path clipRule="evenodd" fillRule="evenodd" d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 0 1 0-1.113ZM17.25 12a5.25 5.25 0 1 1-10.5 0 5.25 5.25 0 0 1 10.5 0Z" />
        </svg>
    );
}