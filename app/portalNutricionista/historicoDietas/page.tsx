'use client'
import axios from "axios";
import { useEffect, useState } from "react";
import Link from 'next/link';

interface DietaHistorico {
    fechaCreacion: string;
    activo: string;
    nutricionista: string;
    idDieta: number;
}

type SearchParamProps = {
    searchParams: Record<string, string> | null | undefined;
};

const TablaHistoricoPorEmail = ({ searchParams }: SearchParamProps) => {
    const [historico, setHistorico] = useState<DietaHistorico[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const email: string | undefined = searchParams?.email;

    useEffect(() => {
        const fetchHistorico = async () => {
            if (!email) {
                setError('No se pudo obtener el email del usuario desde la URL.');
                setLoading(false);
                return;
            }

            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/Dietas/HistorialDietas`, {
                    params: { email: decodeURIComponent(email as string) }
                });
                setHistorico(response.data);
            } catch (err) {
                setError('Error al obtener el historial de dietas');
            } finally {
                setLoading(false);
            }
        };

        fetchHistorico();
    }, [email]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="container mx-auto mt-12 mb-4">
            <div className=" flex justify-between border-b-2 px-4 py-2 bg-webColor md:rounded-t-xl text-white"><span>{decodeURIComponent(email as string)}</span></div>
            <div className="hidden md:flex flex-col">
                <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                        <div className="overflow-hidden">
                            <table className="min-w-full text-center text-sm font-light text-surface">
                                <thead className="border-b border-neutral-200 font-medium">
                                    <tr>
                                        <th scope="col" className="px-6 py-2">Fecha Creación</th>
                                        <th scope="col" className="px-6 py-2">Activo</th>
                                        <th scope="col" className="px-6 py-2">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {historico.length > 0 ? historico.map((item, index) => (
                                        <tr key={index} className="border-b border-neutral-200">
                                            <td className="whitespace-nowrap px-6 py-2">{new Date(item.fechaCreacion).toLocaleDateString()}</td>
                                            <td className="whitespace-nowrap px-6 py-2">{(item.activo === 'S') ? 'Sí' : 'No'}</td>
                                            <td className="whitespace-nowrap px-6 py-2 flex flex-col items-center justify-center">
                                                <Link href={`dietas/${item.idDieta}`}>
                                                    <svg className="w-6 h-6" fill="#388e3c" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                                        <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                                                        <path clipRule="evenodd" fillRule="evenodd" d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 0 1 0-1.113ZM17.25 12a5.25 5.25 0 1 1-10.5 0 5.25 5.25 0 0 1 10.5 0Z" />
                                                    </svg>
                                                </Link>
                                            </td>
                                        </tr>
                                    )) : (
                                        <tr>
                                            <td colSpan={3} className="text-center py-4">No hay datos disponibles</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex flex-col md:hidden mb-28">
                <div className="overflow-x-auto">
                    <div className="inline-block min-w-full py-2">
                        <div className="overflow-hidden">
                            <table className="min-w-full text-left text-sm font-light text-surface">
                                <thead className="border-b border-neutral-200 font-medium px-4">
                                    <tr>
                                        <th scope="col" className="pl-6">Fecha Creación</th>
                                        <th scope="col" className="pl-4">Activo</th>
                                        <th scope="col" className=""></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {historico.length > 0 ? historico.map((item, index) => (
                                        <tr key={index} className="border-b border-neutral-200">
                                            <td className="whitespace-nowrap px-6 py-2">{new Date(item.fechaCreacion).toLocaleDateString()}</td>
                                            <td className="whitespace-nowrap px-6 py-2">{(item.activo === 'S') ? 'Sí' : 'No'}</td>
                                            <td className="whitespace-nowrap px-6 py-2">
                                                <Link href={`dietas/${item.idDieta}`}>
                                                    <svg className="w-6 h-6" fill="#388e3c" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                                        <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                                                        <path clipRule="evenodd" fillRule="evenodd" d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 0 1 0-1.113ZM17.25 12a5.25 5.25 0 1 1-10.5 0 5.25 5.25 0 0 1 10.5 0Z" />
                                                    </svg>
                                                </Link>
                                            </td>
                                        </tr>
                                    )) : (
                                        <tr>
                                            <td colSpan={3} className="text-center py-4">No hay datos disponibles</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TablaHistoricoPorEmail;