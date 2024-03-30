'use client'
import Link from "next/link";
import SearchResult from "./SearchResult";
import { useState } from "react";
import { useSearchParams } from 'next/navigation'

export default function FoodModal({
    fecha,
    setRenderizarDatos,
} : {
    fecha: Date,
    setRenderizarDatos: any
}) {

    const [inputValue, setInputValue] = useState("");
    const [buscar, setBuscar] = useState(false);
    const searchParams = useSearchParams()
 
    const tipo = searchParams.get('tipo')

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
        setBuscar(false);
      };

      const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault(); 
        setBuscar(true); 
      };


    return (
        <div className="fixed inset-0 z-100 bg-gray-600 bg-opacity-20 overflow-y-auto h-full w-full flex items-center justify-center">
            <div className="bg-gray-200 text-webColor max-h-[90%] md:h-[80%] md:w-1/4 rounded-3xl">
                <div className="absolute ml-4 mt-2">
                    <Link href={'/panel'}>
                        <ChevronLeftIcon className="text-black" />
                    </Link>
                </div>
                <div className="px-4 py-2 flex flex-col items-center justify-between border-b border-gray-700">
                    <h2 className="text-xl font-semibold">{tipo}</h2>
                </div>
                <div className="p-4">
                    <div className="flex items-center">
                        <form className="relative mt-6 " onSubmit={handleSubmit}>
                            <input
                                type="text"
                                placeholder="Pan integral"
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
                    {buscar && <SearchResult value={inputValue} setBuscar={setBuscar} fecha={fecha} setRenderizarDatos={setRenderizarDatos}/>}                    
                </div>
            </div>
        </div>
    );
}

function ChevronLeftIcon(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="m15 18-6-6 6-6" />
        </svg>
    )
}


function CircleEllipsisIcon(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <circle cx="12" cy="12" r="10" />
            <path d="M17 12h.01" />
            <path d="M12 12h.01" />
            <path d="M7 12h.01" />
        </svg>
    )
}