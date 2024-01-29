import React from 'react'
import ButtonAuth from '../components/SignOut/SignOut';

export default function Panel() {
  return (
    <div className='ml-4 mt-4'>
      <div>PÁGINA SOLO ACCESIBLE MEDIANTE SESION</div>
      <ButtonAuth/>
    </div>
    
  )
}
