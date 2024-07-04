'use client'
import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

interface Nota {
  usuario: string;
  fecha: string;
  nota: string;
}

interface DatosComida {
  opciones: OpcionesComida | null;
  hora: string | null;
}

interface OpcionesComida {
  opcionA: string | null;
  opcionB: string | null;
  opcionC: string | null;
}

interface DatosDieta {
  desayuno: DatosComida;
  almuerzo: DatosComida;
  comida: DatosComida;
  merienda: DatosComida;
  cena: DatosComida;
  notas: Nota[];
}

export default function DietaBox({ idDieta }: { idDieta: string }) {
  const [data, setData] = useState<DatosDieta | null>(null);
  const [newNote, setNewNote] = useState<string>("");
  const [isAddingNote, setIsAddingNote] = useState<boolean>(false);
  const { data: session } = useSession();

  useEffect(() => {
    async function fetchDietas() {
      try {
        if (session) {
          const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/Dietas/DetalleDieta/${idDieta}`, {
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
  }, [session, idDieta]);

  const handleNoteSubmit = async () => {
    try {
      if (session) {
        const isNutricionista = false; 
        const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/Dietas/AddNota`, {
          idDieta,
          isNutricionista,
          nota: newNote,
        }, {
          headers: {
            Authorization: `Bearer ${session?.user.token}`
          }
        });
        setData(prevData => {
          if (prevData) {
            return {
              ...prevData,
              notas: [...prevData.notas, response.data]
            };
          }
          return prevData;
        });
        setNewNote("");
        setIsAddingNote(false);
      }
    } catch (error) {
      console.error('Error adding note:', error);
    }
  };

  const handleCancel = () => {
    setNewNote("");
    setIsAddingNote(false);
  };

  if (!data) {
    return <div>loading....</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4 text-webColor">Detalle dieta</h1>
      <MealData data={data} />
      <NotesData notas={data.notas} />
      <div className="mt-2 flex flex-col items-end">
        {isAddingNote ? (
          <>
            <textarea
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
              placeholder="Añadir una nota..."
              className="w-full p-2 border rounded mb-2"
            ></textarea>
            <div className="flex">
              <button
                onClick={handleNoteSubmit}
                className="bg-webColor text-white px-4 py-2 rounded"
              >
                Guardar Nota
              </button>
              <button
                onClick={handleCancel}
                className="bg-gray-300 text-black px-4 py-2 rounded ml-2"
              >
                Cancelar
              </button>
            </div>
          </>
        ) : (
          <button
            onClick={() => setIsAddingNote(true)}
            className="bg-webColor text-white px-4 py-2 rounded"
          >
            Añadir Nota
          </button>
        )}
      </div>
    </div>
  );
}

const MealData = ({ data }: { data: any }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {Object.keys(data).map((mealType: any, index) => {
        if (mealType === "notas") {
          return null;
        }

        const { opciones, hora } = data[mealType];

        const hasOptions = opciones && (opciones.opcionA !== null || opciones.opcionB !== null || opciones.opcionC !== null);

        if (!hasOptions) {
          return null;
        }

        return (
          <div key={index} className="col-span-12 flex flex-col border-y-2 md:rounded-xl md:border-2 md:mx-0">
            <div className="flex justify-between border-b-2 px-4 py-2 bg-webColor md:rounded-t-xl text-white">
              <span className="font-semibold text-lg">{hora}: {mealType}</span>
            </div>
            <ul>
              {Object.keys(opciones).map((optionKey, optionIndex) => {
                const optionValue = opciones[optionKey as keyof OpcionesComida];
                if (optionValue === null || optionValue === '') {
                  return null;
                }
                return (
                  <li className="py-2" key={optionIndex}>
                    <span className="font-bold ml-4">{optionKey}:</span> {optionValue}
                  </li>
                );
              })}
            </ul>
          </div>
        );
      })}
    </div>
  );
};

const NotesData = ({ notas }: { notas: Nota[] }) => {
  if (!Array.isArray(notas)) {
    return null;
  }

  return (
    <div className="mt-6">
      <div className="flex justify-between border-b-2 px-4 py-2 bg-webColor md:rounded-t-xl text-white">
        <span className="font-semibold text-lg">Notas</span>
      </div>
      <div className="grid grid-cols-1 gap-4">
        {notas.map((nota, index) => (
          <div key={index} className="col-span-12 flex flex-col border-y-2 md:rounded-xl md:border-2 md:mx-0">
            <div className="px-4 py-2">
              <p>{nota.nota}</p>
              <div className="flex flex-row justify-between">
                <span className="text-sm">Autor: {nota.usuario}</span>
                <span className="text-sm">Fecha: {new Date(nota.fecha).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
