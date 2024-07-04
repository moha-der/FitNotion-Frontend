'use client';

import { useState } from 'react';
import axios from 'axios';

interface Food {
    foodId: string;
    label: string;
    nutrients: {
        ENERC_KCAL: number;
        PROCNT: number;
        FAT: number;
        CHOCDF: number;
        FIBTG?: number;
    };
    brand?: string;
    category?: string;
    image?: string;
}

export default function NutritionalInfo() {
    const [query, setQuery] = useState('');
    const [foods, setFoods] = useState<Food[]>([]);
    const [error, setError] = useState('');

    const fetchNutritionData = async () => {
        try {
            const response = await axios.get(`https://api.edamam.com/api/food-database/v2/parser?app_id=${process.env.NEXT_PUBLIC_EDAMAM_API_ID}&app_key=${process.env.NEXT_PUBLIC_EDAMAM_API_KEY}&ingr=${query}&nutrition-type=logging`);
            const data = response.data;
            setFoods(data.hints.map((hint: any) => hint.food));
            setError('');
        } catch (err) {
            setError('Error fetching nutritional information');
            setFoods([]);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        fetchNutritionData();
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl text-webColor font-bold mb-4">Consulta Información Nutricional</h1>
            <form onSubmit={handleSubmit} className="mb-4">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Ingresa el nombre del alimento"
                    className="mr-2 p-2 border border-gray-300 rounded-md"
                />
                <button
                    type="submit"
                    className="px-4 py-2 bg-webColor text-white rounded-full"
                >
                    Buscar
                </button>
            </form>
            {error && <p className="text-red-500">{error}</p>}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {foods.map((food) => (
                    <div key={food.foodId} className="bg-green-50 p-4 rounded-md shadow-md">
                        <h2 className="text-xl font-bold mb-2">{food.label}</h2>
                        <p><strong>Calorías:</strong> {food.nutrients.ENERC_KCAL.toFixed(2)}</p>
                        <p><strong>Proteínas:</strong> {food.nutrients.PROCNT.toFixed(2)} g</p>
                        <p><strong>Grasas:</strong> {food.nutrients.FAT.toFixed(2)} g</p>
                        <p><strong>Carbohidratos:</strong> {food.nutrients.CHOCDF.toFixed(2)} g</p>
                        {food.nutrients.FIBTG !== undefined && <p><strong>Fibra:</strong> {food.nutrients.FIBTG.toFixed(2)} g</p>}
                        {food.brand && <p><strong>Marca:</strong> {food.brand}</p>}
                        {food.category && <p><strong>Categoría:</strong> {food.category}</p>}
                    </div>
                ))}
            </div>
        </div>
    );
}
