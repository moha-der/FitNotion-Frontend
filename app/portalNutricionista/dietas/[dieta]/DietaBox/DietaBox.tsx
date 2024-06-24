'use client'
import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

interface Nota {
  usuario: string;
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
  notas: {
    nota: Nota;
  };
}

export default function DietaBox({ idDieta }: { idDieta: string }) {
  const [data, setData] = useState<DatosDieta>();
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

  if (!data) {
    return <div>loading....</div>;
  }

  return (
    <MealData data={data} />
  );
}

const MealData = ({ data }: { data: any }) => {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4 text-webColor">Detalle dieta</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {Object.keys(data).map((mealType: any, index) => {
          if (mealType === "notas") {
            return null;
          }

          const { opciones, hora } = data[mealType];

          // Verificar si todas las opciones de la comida son null o undefined
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
    </div>
  );
};
