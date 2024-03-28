'use client'
import React, { useState, useEffect } from 'react'
import ButtonAuth from '../components/SignOut/SignOut';
import EatTime from '../ui/EatTimeCard';
import { useSession } from "next-auth/react";
import { TiposComida } from '../types/TiposComida';


type SearchParamProps = {
  searchParams: Record<string, string> | null | undefined;
};

export default function Panel({ searchParams }: SearchParamProps) {
  const [fecha, setFecha] = useState(new Date());
  const show = searchParams?.show;
  const tipo = searchParams?.tipo;
  const [comidas, setComidas] = useState <TiposComida[]>([]);
  const { data: session, status } = useSession();
  const [renderizarDatos, setRenderizarDatos] = useState(false);

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
          setComidas(data);
        } else {
          console.error('Error al obtener las comidas:', response.statusText);
        }
      } catch (error) {
        console.error('Error al obtener las comidas:', error);
      }
    }

    fetchComidas();

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
    <div className='sm:container mx-auto sm:mt-4'>
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
      <div className='grid grid-cols-12 gap-4'>
        <div className='col-span-12 px-4 flex flex-col py-2 border-y-2 md:col-span-8 md:rounded-xl md:border-2 md:mx-0'>
          <span>Calorías Restantes</span>
          <div className='flex justify-around my-2 text-xs'>
            <div className='flex flex-col items-center'>
              <span>1000</span>
              <span>Objetivo</span>
            </div>
            <span className='text-base'>-</span>
            <div className='flex flex-col items-center'>
              <span>1000</span>
              <span>Consumido</span>
            </div>
            <span className='text-base'>+</span>
            <div className='flex flex-col items-center'>
              <span>1000</span>
              <span>Ejercicio</span>
            </div>
            <span className='text-base'>=</span>
            <div className='flex flex-col items-center'>
              <span>1000</span>
              <span>Restante</span>
            </div>
          </div>
        </div>
        <EatTime title='Desayuno' param={show} alimentos={comidas.find(comida => comida.tipoComida == 'Desayuno')?.alimentos || []} fecha={fecha} setRenderizarDatos={setRenderizarDatos}/>
        <EatTime title='Almuerzo' param={show} alimentos={comidas.find(comida => comida.tipoComida == 'Almuerzo')?.alimentos || []} fecha={fecha} setRenderizarDatos={setRenderizarDatos}/>
        <EatTime title='Comida' param={show}  alimentos={comidas.find(comida => comida.tipoComida == 'Comida')?.alimentos || []} fecha={fecha} setRenderizarDatos={setRenderizarDatos}/>
        <EatTime title='Merienda' param={show} alimentos={comidas.find(comida => comida.tipoComida == 'Merienda')?.alimentos || []} fecha={fecha} setRenderizarDatos={setRenderizarDatos}/>
        <EatTime title='Cena' param={show} alimentos={comidas.find(comida => comida.tipoComida == 'Cena')?.alimentos|| []} fecha={fecha} setRenderizarDatos={setRenderizarDatos}/>
      </div>
      <ButtonAuth />
    </div>

  )
};


