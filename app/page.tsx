import AcmeLogo from '@/app/ui/acme-logo';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { lusitana } from '@/app/ui/fonts';
import Image from 'next/image';
import Banner from 'public/images/banner.png'
import { Button } from './ui/button';

export default function Page() {
  return (
    <main className="grid grid-rows-1 p-6 bg-gray-50">
      <div className='grid grid-cols-10 gap-4 mx-auto '>
          <div className='col-span-10 md:col-span-5 min-w-full'>
            <div className='flex flex-col items-center py-4 px-5'>
              <h1 className='text-3xl sm:text-4xl lg:text-6xl font-bold'>Equilibra tu Plato <br/> Equilibra tu Vida</h1>
              <p className='text-base mt-2 text-center'>¿Estás listo para transformar tu relación con la comida? En FitNotion, cada bocado cuenta hacia un estilo de vida más saludable. </p>
              <button className="flex h-10 flex-col justify-center items-center rounded-lg mt-4 px-4 text-base font-medium text-white transition-colors aria-disabled:cursor-not-allowed aria-disabled:opacity-50 w-full bg-webColor uppercase" > Empieza Gratis
              </button> 
            </div>
          </div>
          <div className='col-span-10 md:col-span-5 p-4'>
            <Image className='rounded-lg' src={Banner} alt={'Texto'} width={476} height={328} />
          </div>
      </div>
    </main>
  );
}
