'use client'

import { useState, useEffect } from "react";
import axios from "axios";

interface SearchResult {
    food: {
        foodId: string;
        label:  string;
        nutrients: {
            ENERC_KCAL:    string;
            FAT:    string;
            CHOCDF:   string;
            FIBTG:   string;
            PROCNT:  string;
        };
    };
}

const API_ID = 'de378d1f'; 
const API_KEY = '4c03d8d168a893312398253db520be1b';

export default function page() {
    const [searchResult, setSearchResult] = useState<SearchResult[]>();

    useEffect(() => {
        const fetchData = async () => {
            const query = 'pollo';
            const response = await axios.get(`https://api.edamam.com/api/food-database/v2/parser?app_id=${API_ID}&app_key=${API_KEY}&ingr=${query}&nutrition-type=logging`);
            setSearchResult(response.data.hints);
        };
        fetchData();
    }, []);

    console.log(searchResult);

    if (!searchResult) return null;


    return (
        <div className="mt-4">
      <h2 className="text-sm font-semibold">Resultados de búsqueda</h2>
      {searchResult.map((result) => (
        <div key={result.food.foodId}>
          <div className="flex items-center justify-between mt-2">
            <div className="text-sm font-semibold">{result.food.label}</div>
            <button className={`text-webColor ${result.food.label.length > 0 ? 'bg-[#1c1c1e] text-white' : ''}`}>
              +
            </button>
          </div>
          <div className="text-xs text-gray-400">
            {parseFloat(result.food.nutrients.ENERC_KCAL).toFixed(2)} cal, {parseFloat(result.food.nutrients.FAT).toFixed(2)} Líp, {parseFloat(result.food.nutrients.CHOCDF).toFixed(2)} Carb, {parseFloat(result.food.nutrients.FIBTG).toFixed(2)} Fib, {parseFloat(result.food.nutrients.PROCNT).toFixed(2)} Prot
          </div>
        </div>
      ))}
    </div>
    );
}