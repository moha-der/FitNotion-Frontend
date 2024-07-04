'use client'
import { useState, useEffect } from "react";
import axios, { AxiosError } from "axios";
import { useSession } from "next-auth/react";
import ButtonAuth from '../components/SignOut/SignOut';
import { DocumentPlusIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import Link from "next/link";


interface IDietas {
    id_Dieta: number;
    nombreCliente: string;
    emailCliente: string;
    fecha: Date;

}

interface IClientes {
    nombreCliente: string;
    emailCliente: string;
}


var tokenConstante: string;


export default function Portal() {
    const [data, setData] = useState<IDietas[]>([]);
    const { data: session } = useSession();
    const [inputValue, setInputValue] = useState("");
    const [clientes, setClientes] = useState<IClientes[]>([]);
    const [error, setError] = useState("");
    const [clientesAsignados, setClienteAsignados] = useState<IClientes[]>([]);


    useEffect(() => {

        async function fetchDietas() {
            try {
                if (session) {
                    console.log(session.user.token)
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

        async function fetchClientes() {
            try {
                if (session) {
                    const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/Dietas/getClientesAsignados`, {
                        headers: {
                            Authorization: `Bearer ${session?.user.token}`
                        }
                    });
                    console.log(response.data)
                    setClienteAsignados(response.data);

                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }

        }

        fetchDietas();
        fetchClientes();

        if (session) {
            tokenConstante = session?.user.token;
        }
    }, [session]);

    async function getCliente() {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/Dietas/getCliente?emailCliente=${inputValue}`, {
                headers: {
                    Authorization: `Bearer ${session?.user.token}`
                }
            });
            if (response.data == 'Sin Clientes') {
                setError("No se han encontrado clientes");
            } else {
                setClientes(response.data);
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const axiosError = error as AxiosError;

                if (axiosError.response) {
                    if (axiosError.response.status === 400) {
                        setError("No se han encontrado clientes");
                    }
                }
            }
        }
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log(inputValue);
        getCliente();
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
        setError("");
    };

    const addCliente = (cliente: IClientes) => {

        const clientesNuevosSinAsignar = clientes.filter((x) => x.emailCliente !== cliente.emailCliente);
        setClientes(clientesNuevosSinAsignar);
        setClienteAsignados([...clientesAsignados, cliente]);
    }

    const deleteCliente = (cliente: IClientes) => {

        const clientesNuevosAsignados = clientesAsignados.filter((x) => x.emailCliente !== cliente.emailCliente);
        setClienteAsignados(clientesNuevosAsignados);
        console.log(clientesNuevosAsignados);
    }


    return (
        <div className="container mx-auto">
            <div className="flex justify-end mt-10">
                <Link className="text-xs uppercase text-white font-medium ml-2 px-4 py-2 bg-webColor rounded-full" href={'portalNutricionista/nuevaDieta'}>Nueva Dieta</Link>
            </div>
            <div className='col-span-12 flex my-4 flex-col border-y-2 md:rounded-xl md:border-2 md:mx-0'>
                <div className="flex justify-between border-b-2 px-4 py-2 bg-webColor md:rounded-t-xl text-white">
                    <span>Seguimiento dietas</span>
                </div>
                <TablaDesktop dietas={data} />
                <TablaMobile dietas={data} />
            </div>
            <div className="flex flex-col md:flex-row justify-between px-2s">
                <div className='flex my-4 flex-col border-y-2 md:rounded-xl md:border-2 md:mx-0 md:w-[49%]'>
                    <div className="flex justify-between border-b-2 px-4 py-2 bg-webColor md:rounded-t-xl text-white">
                        <span>Ver clientes asignados</span>
                    </div>
                    {clientesAsignados.length > 0 && (
                        <TablaCliente clientes={clientesAsignados} asignados={true} addCliente={addCliente} deleteCliente={deleteCliente} tokenSession={session?.user.token ? session?.user.token : ""} />
                    )}

                </div>
                <div className='flex my-4 flex-col border-y-2 md:rounded-xl md:border-2 md:mx-0 md:w-[49%]'>
                    <div className="flex justify-between border-b-2 px-4 py-2 bg-webColor md:rounded-t-xl text-white">
                        <span>Añadir clientes</span>
                    </div>
                    <div className="flex items-center">
                        <form className="relative w-full m-4 mt-6 " onSubmit={handleSubmit}>
                            <input
                                type="text"
                                placeholder="ejemplo@gmail.com"
                                className="block w-full h-4 rounded-2xl border border-neutral-300 bg-transparent py-4 pl-6 pr-20 text-base/6 text-neutral-950 ring-4 ring-transparent transition placeholder:text-neutral-500 focus:border-neutral-950 focus:outline-none focus:ring-neutral-950/5"
                                value={inputValue}
                                onChange={handleInputChange}
                            />
                            <div className="absolute inset-y-1 right-1 flex justify-end">
                                <button
                                    type="submit"
                                    className="flex aspect-square h-full items-center justify-center rounded-xl bg-webColor text-white transition hover:bg-neutral-800"

                                >
                                    <svg viewBox="0 0 16 6" aria-hidden="true" className="w-4">
                                        <path
                                            fill="currentColor"
                                            fillRule="evenodd"
                                            clipRule="evenodd"
                                            d="M16 3 10 .5v2H0v1h10v2L16 3Z"
                                        ></path>
                                    </svg>
                                </button>
                            </div>
                        </form>
                    </div>
                    {error && <p className="text-red-500 mx-4">{error}</p>}
                    {clientes.length > 0 && (
                        <TablaCliente clientes={clientes} asignados={false} addCliente={addCliente} deleteCliente={deleteCliente} tokenSession={session?.user.token ? session?.user.token : ""} />
                    )}

                </div>
            </div>

            <ButtonAuth />
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
                                                <DetalleIcon id_Dieta={item.id_Dieta} />
                                            </div>
                                        </td>
                                        <td className="whitespace-nowrap px-6 py-2">
                                            <div className="flex justify-center">
                                                <HistoricoIcon emailCliente={item.emailCliente}/>
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
                                                <DetalleIcon id_Dieta={item.id_Dieta}/>
                                            </span>
                                            <span className="">
                                                <HistoricoIcon emailCliente={item.emailCliente}/>
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

const TablaCliente = ({ clientes, asignados, addCliente, deleteCliente, tokenSession }: {
    clientes: IClientes[],
    asignados: boolean,
    addCliente: (cliente: IClientes) => void,
    deleteCliente: (cliente: IClientes) => void,
    tokenSession: string
}) => {

    const addClienteApi = async (cliente: IClientes) => {
        try {
            const response = await axios.put(`${process.env.NEXT_PUBLIC_BACKEND_URL}/Dietas/AsignarCliente/${cliente.emailCliente}`, null, {
                headers: { Authorization: `Bearer ${tokenSession}` },
            });

            addCliente(cliente);

            console.log(response.data); // Maneja la respuesta como desees
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const deleteClienteApi = async (cliente: IClientes) => {
        try {
            const response = await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_URL}/Dietas/DesAsignarCliente/${cliente.emailCliente}`, {
                headers: { Authorization: `Bearer ${tokenSession}` },
            });

            deleteCliente(cliente);

            console.log(response.data); // Maneja la respuesta como desees
        } catch (error) {
            console.error('Error:', error);
        }
    };
    return (
        <div className="flex flex-col">
            <div className="overflow-x-auto">
                <div className="inline-block min-w-full py-2 ">
                    <div className="overflow-hidden">
                        <table className="min-w-full text-left text-sm font-light text-surface ">
                            <tbody>
                                {clientes ?
                                    clientes.map((item, index) => (
                                        <tr key={index} className="border-b border-neutral-200 ">
                                            <td className="whitespace-nowrap px-6 py-2">
                                                <div className="flex flex-col">
                                                    <span className="font-semibold">{item.nombreCliente}</span>
                                                    <span>{item.emailCliente}</span>
                                                </div>
                                            </td>
                                            <td className="whitespace-nowrap">
                                                <div className="flex flex-row">
                                                    {
                                                        asignados &&
                                                        <Link href={`portalNutricionista/nuevaDieta/${item.emailCliente}`}>
                                                            <span className="px-2 flex flex-col items-center md:px-0">
                                                                <DocumentPlusIcon  className="h-6 w-6 text-[#388e3c]" />
                                                                Nueva Dieta
                                                            </span>
                                                        </Link>
                                                        
                                                    }
                                                </div>
                                            </td>
                                            <td className="whitespace-nowrap">
                                                <div className="flex flex-row">
                                                    {
                                                        !asignados &&
                                                        <span className="px-2 md:px-0" onClick={() => addClienteApi(item)}>
                                                            <PlusIcon className="h-6 w-6 text-[#388e3c]" />
                                                        </span>
                                                    }
                                                    {
                                                        asignados &&
                                                        <span className="px-2 md:px-0" onClick={() => deleteClienteApi(item)}>
                                                            <TrashIcon className="h-6 w-6 text-[#388e3c]" />
                                                        </span>
                                                    }
                                                </div>
                                            </td>
                                            
                                        </tr>
                                    )) :
                                    (
                                        <tr>
                                            <td colSpan={5} className="text-center py-4">No hay datos disponibles</td>
                                        </tr>
                                    )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>);
}

const HistoricoIcon = ({emailCliente} : {emailCliente : string}) => {
    return (
        <Link href={`portalNutricionista/historicoDietas?email=${emailCliente}`}>
            <svg className="w-6 h-6" fill="#388e3c" strokeWidth={1.5} stroke="#388e3c" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
            </svg>
        </Link>
    );
}

const DetalleIcon = ({id_Dieta} : {
    id_Dieta: number
}) => {
    return (
        <Link href={`portalNutricionista/dietas/${id_Dieta}`}>
        <svg className="w-6 h-6" fill="#388e3c" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
            <path clipRule="evenodd" fillRule="evenodd" d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 0 1 0-1.113ZM17.25 12a5.25 5.25 0 1 1-10.5 0 5.25 5.25 0 0 1 10.5 0Z" />
        </svg>
        </Link>
        
    );
}