'use client'
import { useSession } from 'next-auth/react';
import { useState, ChangeEvent } from 'react';

interface Meal {
  option: string;
  food: string;
  quantity: string;
  time: string;
  mealType: MealType;
}

type MealType = 'desayuno' | 'comida' | 'almuerzo' | 'merienda' | 'cena';



export default function NuevaDieta({ params }: { params: { cliente: string}}){
  const [meals, setMeals] = useState<Record<MealType, Meal[]>>({
    desayuno: [],
    comida: [],
    almuerzo: [],
    merienda: [],
    cena: [],
  });

  const [savedMeals, setSavedMeals] = useState<Meal[]>([]);
  const [activeMealType, setActiveMealType] = useState<MealType | null>(null);
  const { data: session } = useSession();
  const [successMessage, setSuccessMessage] = useState<string | null>(null); 
  const [emailCliente, setEmailCliente] = useState<string>(decodeURIComponent(params.cliente)); // Estado para el email del cliente

  const handleAddMeal = (mealType: MealType) => {
    if (activeMealType !== mealType) {
      setActiveMealType(mealType);
      setMeals((prevMeals) => ({
        ...prevMeals,
        [mealType]: [
          ...prevMeals[mealType],
          { option: '', food: '', quantity: '', time: '', mealType }
        ]
      }));
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>, mealType: MealType, index: number) => {
    const { name, value } = e.target;
    const updatedMeals = meals[mealType].map((meal, i) =>
      i === index ? { ...meal, [name]: value } : meal
    );
    setMeals({
      ...meals,
      [mealType]: updatedMeals
    });
  };

  const handleSaveMeal = (mealType: MealType, index: number) => {
    const mealToSave = meals[mealType][index];
    setSavedMeals((prevMeals) => [...prevMeals, mealToSave]);
    setMeals((prevMeals) => ({
      ...prevMeals,
      [mealType]: prevMeals[mealType].filter((_, i) => i !== index)
    }));
    setActiveMealType(null);
  };

  const handleCloseMeal = (mealType: MealType, index: number) => {
    setMeals((prevMeals) => ({
      ...prevMeals,
      [mealType]: prevMeals[mealType].filter((_, i) => i !== index)
    }));
    setActiveMealType(null);
  };

  const handleSaveDiet = async () => {
    try {
      const mealsToSend = savedMeals.map((meal) => ({
        comida: meal.mealType,
        opcion: meal.option,
        alimento: meal.food,
        cantidad: meal.quantity,
        hora: meal.time
      }));

      if(session && emailCliente) {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/Dietas/AddDieta`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${session?.user.token}`
            },
            body: JSON.stringify({
              emailCliente: emailCliente,
              comidasDieta: mealsToSend
            })
          });

        if (response.ok) {
          setSuccessMessage('Dieta guardada exitosamente'); 
          setSavedMeals([]); 
          setMeals({
            desayuno: [],
            comida: [],
            almuerzo: [],
            merienda: [],
            cena: [],
          }); 
        } else {
          console.error('Error al guardar la dieta');
        }
      }
    } catch (error) {
      console.error('Error al procesar la solicitud:', error);
    }
  };

  const renderMeals = (mealType: MealType) => (
    <div>
      {meals[mealType].map((meal, index) => (
        <div key={index} className="flex flex-col p-2 border-b border-gray-200">
          <label className="mb-1">
            Opción:
            <select
              name="option"
              value={meal.option}
              onChange={(e) => handleChange(e, mealType, index)}
              className="mb-2 p-2 border w-full"
            >
              <option value="">Seleccionar Opción</option>
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
            </select>
          </label>
          <label className="mb-1">
            Alimento:
            <input
              type="text"
              name="food"
              value={meal.food}
              onChange={(e) => handleChange(e, mealType, index)}
              placeholder="Alimento"
              className="mb-2 p-2 border w-full"
            />
          </label>
          <label className="mb-1">
            Cantidad:
            <input
              type="text"
              name="quantity"
              value={meal.quantity}
              onChange={(e) => handleChange(e, mealType, index)}
              placeholder="Cantidad"
              className="mb-2 p-2 border w-full"
            />
          </label>
          <label className="mb-1">
            Hora:
            <input
              type="time"
              name="time"
              value={meal.time}
              onChange={(e) => handleChange(e, mealType, index)}
              placeholder="Hora"
              className="mb-2 p-2 border w-full"
            />
          </label>
          <div className="flex justify-between">
            <button
              type="button"
              onClick={() => handleSaveMeal(mealType, index)}
              className="bg-webColor text-white p-2 rounded mt-2"
            >
              Añadir
            </button>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="container mx-auto mt-12 mb-12 p-4 md:p-0">
      <h1 className="text-2xl font-bold mb-6">Crear Nueva Dieta</h1>
      {(['desayuno', 'comida', 'almuerzo', 'merienda', 'cena'] as MealType[]).map((mealType) => (
        <div key={mealType} className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-xl font-semibold capitalize">{mealType}</h2>
            <div>
              <button
                type="button"
                onClick={() => handleAddMeal(mealType)}
                className={`bg-webColor text-white p-2 rounded ${activeMealType === mealType ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={activeMealType !== null && activeMealType !== mealType}
              >
                +
              </button>
              {activeMealType === mealType && (
                <button
                  type="button"
                  onClick={() => handleCloseMeal(mealType, meals[mealType].length - 1)}
                  className="bg-red-500 text-white p-2 rounded ml-2"
                >
                  X
                </button>
              )}
            </div>
          </div>
          {activeMealType === mealType && renderMeals(mealType)}
        </div>
      ))}
      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-4">Comidas Guardadas:</h2>
        {savedMeals.length > 0 ? (
          <ul>
            {savedMeals.map((meal, index) => (
              <li key={index} className="mb-2 p-2 border border-gray-300">
                <p>Comida: {meal.mealType}</p>
                <p>Opción: {meal.option}</p>
                <p>Alimento: {meal.food}</p>
                <p>Cantidad: {meal.quantity}</p>
                <p>Hora: {meal.time}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No hay comidas guardadas.</p>
        )}
      </div>
      {successMessage && (
        <div className="mt-4 bg-green-200 text-green-800 p-2 rounded">
          {successMessage}
        </div>
      )}
      <div className="mt-6">
        <button
          type="button"
          onClick={handleSaveDiet}
          className="bg-webColor text-white p-2 rounded"
        >
          Guardar Dieta
        </button>
      </div>
    </div>
  );
};

