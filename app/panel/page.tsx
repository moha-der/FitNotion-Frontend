'use client'
import React, { useState } from 'react'
import ButtonAuth from '../components/SignOut/SignOut';
import EatTime from '../ui/EatTimeCard';

export default function Panel() {
  const [fecha, setFecha] = useState(new Date());


  const restaDia = () => {
    setFecha(new Date(fecha.setDate(fecha.getDate() - 1)))
  }

  const sumaDia = () => {
    setFecha(new Date(fecha.setDate(fecha.getDate() + 1)))
  }

  const weekdays = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
  const FechaFormateada = weekdays[fecha.getDay()] + ' ' + fecha.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' });

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
        <EatTime title='Desayuno' />
        <EatTime title='Almuerzo' />
        <EatTime title='Comida' />
        <EatTime title='Merienda' />
        <EatTime title='Cena' />
      </div>
      <ButtonAuth />
    </div>

  )
}
