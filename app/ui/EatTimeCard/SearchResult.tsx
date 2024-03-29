import { useSession } from "next-auth/react";

import { useState, useEffect } from "react";
import axios from "axios";
import { useSearchParams, useRouter } from 'next/navigation'

interface SearchResult {
    food: {
        foodId: string;
        label: string;
        nutrients: {
            ENERC_KCAL: string;
            FAT: string;
            CHOCDF: string;
            FIBTG: string;
            PROCNT: string;
        };
    };
}

const API_ID = 'de378d1f';
const API_KEY = '4c03d8d168a893312398253db520be1b';


export default function SearchResult({
    value,
    setBuscar,
    fecha,
    setRenderizarDatos,
}: {
    value: string;
    setBuscar: any;
    fecha: Date
    setRenderizarDatos: any
}) {
    const [searchResult, setSearchResult] = useState<SearchResult[]>();
    const [modalOpen, setModalOpen] = useState(false);
    const [quantity, setQuantity] = useState(0);
    const [selectedFood, setSelectedFood] = useState<SearchResult | null>(null);
    const searchParams = useSearchParams()
    const router = useRouter()
 
    const tipo = searchParams.get('tipo')


    const { data: session, status } = useSession();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const query = value;
                const response = await axios.get(`https://api.edamam.com/api/food-database/v2/parser?app_id=${API_ID}&app_key=${API_KEY}&ingr=${query}&nutrition-type=logging`);
                setSearchResult(response.data.hints);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, [value]);

    const handleOpenModal = (food: SearchResult) => {
        setSelectedFood(food);
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue: string = e.target.value; 
        const parsedValue: number = parseFloat(inputValue); 
        setQuantity(parsedValue);
        
    };

    const handleSubmit = async(e: React.FormEvent) => {
        e.preventDefault();
        try {
            await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/Alimentos`, {
                alimento: {
                    id: selectedFood?.food.foodId,
                    nombre: selectedFood?.food.label,
                    proteinas: selectedFood?.food.nutrients.PROCNT ? parseFloat(selectedFood.food.nutrients.PROCNT).toFixed(2) : 0,
                    carbohidratos: selectedFood?.food.nutrients.CHOCDF ? parseFloat(selectedFood?.food.nutrients.CHOCDF).toFixed(2) : 0,
                    grasas: selectedFood?.food.nutrients.FAT ? parseFloat(selectedFood?.food.nutrients.FAT).toFixed(2) : 0,
                    calorias: selectedFood?.food.nutrients.ENERC_KCAL ? parseFloat(selectedFood?.food.nutrients.ENERC_KCAL).toFixed(2) : 0,
                    fibra: selectedFood?.food.nutrients.FIBTG ? parseFloat(selectedFood?.food.nutrients.FIBTG).toFixed(2) : 0,
                    racion: 100, 
                },
                email: session ? session.user?.email : null, 
                tipoComida: tipo, 
                fecha: fecha.toISOString(), 
                cantidad: quantity ? quantity : 1, 
            });
        } catch (error) {
            console.error("Error al enviar los datos al backend:", error);
        }
        setRenderizarDatos(true);
        setModalOpen(false);
    };

    if (!searchResult) return null;

    return (
        <div className="mt-4 overflow-y-auto h-[550px] md:h-[400px]">
            <h2 className="text-sm font-semibold">Resultados de búsqueda</h2>
            {searchResult.map((result) => (
                <div key={result.food.foodId}>
                    <div className="flex items-center justify-between mt-2">
                        <div className="text-sm font-semibold" onClick={() => handleOpenModal(result)}>
                            {result.food.label}
                        </div>
                    </div>
                    <div className="text-xs text-gray-400">
                        {parseFloat(result.food.nutrients.ENERC_KCAL).toFixed(2)} cal,
                        {parseFloat(result.food.nutrients.FAT).toFixed(2)} Líp,
                        {parseFloat(result.food.nutrients.CHOCDF).toFixed(2)} Carb,
                        {parseFloat(result.food.nutrients.FIBTG).toFixed(2)} Fib,
                        {parseFloat(result.food.nutrients.PROCNT).toFixed(2)} Prot
                    </div>
                </div>
            ))}
            {modalOpen && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center ">
                    <div className="bg-gray-200 text-black md:w-1/4 rounded-3xl ">
                        <div className="px-4 py-2 flex flex-col items-center justify-between border-b border-gray-700">
                            <h2 className="text-xl font-semibold">Añadir alimento</h2>
                        </div>
                        <div className="mt-4">
                        <span className="ml-4 md:hidden font-medium">{selectedFood?.food.label}</span>
                        </div>
                        
                        <div className="flex justify-between items-center p-4">
                            <span className="hidden md:block font-medium">{selectedFood?.food.label}</span>
                            <div className="flex flex-col text-xs">
                                <span className="text-center text-orange-800">{selectedFood?.food.nutrients.ENERC_KCAL ? parseFloat(selectedFood?.food.nutrients.ENERC_KCAL).toFixed(2) : 0}</span>
                                <span className="text-orange-800">Calorías</span>
                            </div>
                            <div className="flex flex-col text-xs">
                                <span className="text-center text-green-800">{selectedFood?.food.nutrients.CHOCDF ? parseFloat(selectedFood?.food.nutrients.CHOCDF).toFixed(2) : 0}</span>
                                <span className="text-green-800">Carbohidratos</span>
                            </div>
                            <div className="flex flex-col text-xs">
                                <span className="text-center text-fuchsia-800">{selectedFood?.food.nutrients.PROCNT ? parseFloat(selectedFood?.food.nutrients.PROCNT).toFixed(2) : 0}</span>
                                <span className="text-fuchsia-800">Proteínas</span>
                            </div>
                            <div className="flex flex-col text-xs">
                                <span className="text-center text-blue-800">{selectedFood?.food.nutrients.FAT ? parseFloat(selectedFood?.food.nutrients.FAT).toFixed(2) : 0}</span>
                                <span className="text-blue-800">Grasas</span>
                            </div>
                        </div>

                        <div className="p-4">
                            <div className="flex items-center">
                                <form className="w-full text-black" onSubmit={handleSubmit}>

                                    <div className="flex justify-between items-center p-2">
                                        <label className='text-sm font-medium text-black'>
                                            Tamaño de la ración
                                        </label>
                                        <input
                                            type='text'
                                            placeholder='100gr'
                                            className='w-[100px] bg-transparent p-1 px-2 text-right rounded-md border border-stroke outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 disabled:border-gray-2'
                                            readOnly={true}
                                        />
                                    </div>
                                    <div className="flex justify-between items-center p-2">
                                        <label className='text-sm font-medium text-black'>
                                            Cantidad de la ración
                                        </label>
                                        <input
                                            type='number'
                                            placeholder='1'
                                            className='w-[100px] bg-transparent p-1 px-2 text-right rounded-md border border-stroke outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 disabled:border-gray-2'
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="flex justify-center items-center p-2">
                                        <button className='m-2 bg-transparent border-webColor border rounded-md inline-flex items-center justify-center py-2 px-6 text-center text-base font-medium text-black hover:bg-[#0BB489] hover:border-[#0BB489] disabled:bg-gray-3 disabled:border-gray-3 disabled:text-dark-5'>
                                            Cancelar
                                        </button>
                                        <button className='m-2 bg-webColor border-webColor border rounded-md inline-flex items-center justify-center py-2 px-6 text-center text-base font-medium text-white hover:bg-[#0BB489] hover:border-[#0BB489] disabled:bg-gray-3 disabled:border-gray-3 disabled:text-dark-5'>
                                            Guardar
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
