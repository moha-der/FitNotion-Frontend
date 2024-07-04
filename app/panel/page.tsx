'use client'
import React, { useState, useEffect } from 'react'
import ButtonAuth from '../components/SignOut/SignOut';
import EatTime from '../ui/EatTimeCard';
import { useSession } from "next-auth/react";
import { TiposComida } from '../types/TiposComida';
import { DonutChart, Legend, ProgressCircle } from '@tremor/react';




type DataItem = {
  name: string;
  value: number;
};


type SearchParamProps = {
  searchParams: Record<string, string> | null | undefined;
};

export default function Panel({ searchParams }: SearchParamProps) {
  const [fecha, setFecha] = useState(new Date());
  const show = searchParams?.show;
  const [comidas, setComidas] = useState<TiposComida[]>([]);
  const { data: session, status } = useSession();
  const [renderizarDatos, setRenderizarDatos] = useState(false);
  const [caloriasConsumidas, setCaloriasConsumidas] = useState(0);
  const [caloriasObjetivo, setCaloriasObjetivo] = useState(0);
  const [proteinasTotal, setProteinasTotal] = useState(0);
  const [carbohidratosTotal, setCarbohidratosTotal] = useState(0);
  const [grasasTotal, setGrasasTotal] = useState(0);

  const [graficoResumen, setGraficoResumen] = useState<DataItem[]>([
    {
      name: 'Vacio',
      value: 100,
    },
    {
      name: 'Carbohidratos',
      value: 0,
    },
    {
      name: 'Grasas',
      value: 0,
    },
  ]);

  const dataFormatter = (number: any) =>
    `${number.toFixed(2)}%`;


  const email = session ? session.user?.email : null

  const dia = String(fecha.getDate()).padStart(2, '0')
  const mes = String(fecha.getMonth() + 1).padStart(2, '0')
  const anio = fecha.getFullYear()

  const fechaFormateada = `${dia}-${mes}-${anio}`

  useEffect(() => {
    if (!email) return;

    async function fetchComidas() {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/Alimentos/getAlimentosDia?email=${email}&fecha=${fechaFormateada}`);
        if (response.ok) {
          const data = await response.json();
          setComidas(data.detalleComidas);
          setCaloriasConsumidas(data.caloriasConsumidas);
          setCaloriasObjetivo(data.caloriasObjetivo);
          setProteinasTotal(data.proteinasConsumidas);
          setCarbohidratosTotal(data.hidratosConsumidos);
          setGrasasTotal(data.grasasConsumidas);

          if (data.caloriasConsumidas > 0) {
            const dataResumen: DataItem[] = [
              {
                name: 'Proteínas',
                value: ((data.proteinasConsumidas * 4) / data.caloriasConsumidas) * 100,
              },
              {
                name: 'Carbohidratos',
                value: ((data.hidratosConsumidos * 4) / data.caloriasConsumidas) * 100,
              },
              {
                name: 'Grasas',
                value: ((data.grasasConsumidas * 9) / data.caloriasConsumidas) * 100,
              },
            ];


            setGraficoResumen(dataResumen);
          } else {
            const dataResumen: DataItem[] = [
              {
                name: 'Vacio',
                value: 1000,
              },
              {
                name: 'Carbohidratos',
                value: 0,
              },
              {
                name: 'Grasas',
                value: 0,
              },
            ];

            setGraficoResumen(dataResumen);
          }
        } else {
          console.error('Error al obtener las comidas:', response.statusText);
        }
      } catch (error) {
        console.error('Error al obtener las comidas:', error);
      }
    }

    fetchComidas();
    setRenderizarDatos(false);

  }, [email, fechaFormateada, renderizarDatos]);



  const restaDia = () => {
    setFecha(new Date(fecha.setDate(fecha.getDate() - 1)))
  }

  const sumaDia = () => {
    setFecha(new Date(fecha.setDate(fecha.getDate() + 1)))
  }

  const weekdays = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
  const FechaFormateada = weekdays[fecha.getDay()] + ' ' + fecha.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' });

  if (!comidas) return (
    <div>Loading data...</div>
  );


  return (
    <div className='sm:container mx-auto sm:mt-4 mb-4'>
      <div className='w-full bg-webColor p-4 sm:rounded-xl text-white flex justify-between mb-1'>
        <h3>Resumen Diario</h3>
        <div className='flex flex-row justify-center items-center'>
          <span onClick={() => restaDia()}>
            <svg className='w-5 h-5' data-slot="icon" fill="none" strokeWidth={1.5} stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
            </svg>
          </span>
          <span className='mx-4'>{FechaFormateada}</span>
          <span onClick={() => sumaDia()}>
            <svg className='w-5 h-5' data-slot="icon" fill="none" strokeWidth={1.5} stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
            </svg>
          </span>
        </div>
      </div>

      <div className='grid grid-cols-12 gap-2'>
        <div className='col-span-12 md:col-span-8'>
          <div className='grid grid-cols-12 gap-4'>
            <div className='col-span-12 px-4 flex flex-col py-2 border-y-2 md:rounded-xl md:border-2 md:mx-0'>
              <span>Calorías Restantes</span>
              <div className='flex justify-around my-2 text-xs'>
                <div className='flex flex-col items-center'>
                  <span>{caloriasObjetivo}</span>
                  <span>Objetivo</span>
                </div>
                <span className='text-base'>-</span>
                <div className='flex flex-col items-center'>
                  <span>{Math.ceil(caloriasConsumidas)}</span>
                  <span>Consumido</span>
                </div>
                <span className='text-base'>=</span>
                <div className='flex flex-col items-center'>
                  <span>{Math.ceil(caloriasObjetivo - caloriasConsumidas)}</span>
                  <span>Restante</span>
                </div>
              </div>
            </div>
            <div className='col-span-12 px-4 flex flex-col py-2 md:hidden'>
              <div className="">
                <div className="space-y-3">
                  <div className="flex justify-around">
                    <ProgressCircle value={(caloriasConsumidas / caloriasObjetivo) * 100} size="lg" color="green">
                      <span className="text-xs text-center font-medium text-slate-700">
                        {
                          Math.ceil(caloriasObjetivo - caloriasConsumidas) > 0 ?
                            <span className="text-xs text-center font-medium text-slate-700"> {caloriasObjetivo - caloriasConsumidas} <br /> Restantes </span> :
                            <span className="text-xs text-center font-medium text-slate-700"> Objetivo <br /> Alcanzado </span>
                        }
                      </span>
                    </ProgressCircle>
                    <DonutChart
                      className='max-w-[120px]'
                      data={graficoResumen}
                      variant="pie"
                      valueFormatter={dataFormatter}
                      onValueChange={(v) => console.log(v)}
                      colors={[
                        'green-300',
                        'green-600',
                        'green-900'
                      ]}
                    />
                  </div>
                </div>
                <div className="space-y-3 mt-4">
                  <div className="flex flex-col justify-center items-center ">
                    <Legend
                      categories={[`${Math.ceil(proteinasTotal)} gr Proteínas`, `${Math.ceil(carbohidratosTotal)} gr Carbohidratos`, `${Math.ceil(grasasTotal)} gr Grasas`]}
                      colors={['green-300', 'green-600', 'green-900']}
                      className="mt-2 "
                    />
                  </div>
                </div>
              </div>
            </div>
            <EatTime title='Desayuno' caloriasTotal={comidas.find(comida => comida.tipoComida == 'Desayuno')?.caloriasTotal || 0} param={show} alimentos={comidas.find(comida => comida.tipoComida == 'Desayuno')?.alimentos || []} fecha={fecha} setRenderizarDatos={setRenderizarDatos} />
            <EatTime title='Almuerzo' caloriasTotal={comidas.find(comida => comida.tipoComida == 'Almuerzo')?.caloriasTotal || 0} param={show} alimentos={comidas.find(comida => comida.tipoComida == 'Almuerzo')?.alimentos || []} fecha={fecha} setRenderizarDatos={setRenderizarDatos} />
            <EatTime title='Comida' caloriasTotal={comidas.find(comida => comida.tipoComida == 'Comida')?.caloriasTotal || 0} param={show} alimentos={comidas.find(comida => comida.tipoComida == 'Comida')?.alimentos || []} fecha={fecha} setRenderizarDatos={setRenderizarDatos} />
            <EatTime title='Merienda' caloriasTotal={comidas.find(comida => comida.tipoComida == 'Merienda')?.caloriasTotal || 0} param={show} alimentos={comidas.find(comida => comida.tipoComida == 'Merienda')?.alimentos || []} fecha={fecha} setRenderizarDatos={setRenderizarDatos} />
            <EatTime title='Cena' caloriasTotal={comidas.find(comida => comida.tipoComida == 'Cena')?.caloriasTotal || 0} param={show} alimentos={comidas.find(comida => comida.tipoComida == 'Cena')?.alimentos || []} fecha={fecha} setRenderizarDatos={setRenderizarDatos} />

          </div>
        </div>
        <div className='hidden md:block md:col-span-4 py-4'>
          <div className="mx-auto space-y-12">
            <div className="space-y-3">
              <div className="flex justify-center">
                <ProgressCircle value={(caloriasConsumidas / caloriasObjetivo) * 100} size="xl" color="green">

                  {
                    Math.ceil(caloriasObjetivo - caloriasConsumidas) > 0 ?
                      <span className="text-xs text-center font-medium text-slate-700"> {caloriasObjetivo - caloriasConsumidas} <br /> Restantes </span> :
                      <span className="text-xs text-center font-medium text-slate-700"> Objetivo <br /> Alcanzado </span>
                  }

                </ProgressCircle>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex justify-center">
                <DonutChart
                  data={graficoResumen}
                  variant="pie"
                  valueFormatter={dataFormatter}
                  onValueChange={(v) => console.log(v)}
                  colors={[
                    'green-300',
                    'green-600',
                    'green-900'
                  ]}
                />
                <Legend
                  categories={[`${Math.ceil(proteinasTotal)}gr Proteínas`, `${Math.ceil(carbohidratosTotal)}gr Carbohidratos`, `${Math.ceil(grasasTotal)}gr Grasas`]}
                  colors={['green-300', 'green-600', 'green-900']}
                  className="max-w-xs"
                />
              </div>
            </div>
          </div>
        </div>

      </div>


    </div>

  )
};


