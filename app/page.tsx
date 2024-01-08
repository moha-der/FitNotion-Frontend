import AcmeLogo from '@/app/ui/acme-logo';
import { CheckIcon, FlagIcon, StarIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { lusitana } from '@/app/ui/fonts';
import Image from 'next/image';
import Banner from 'public/images/banner.png'
import { Button } from './ui/button';

export default function Page() {
  return (
    <>
    <section className="grid grid-rows-1 p-6 bg-gray-50">
      <div className='grid grid-cols-10 gap-4 md:max-w-6xl mx-auto '>
          <div className='col-span-10 md:col-span-5 min-w-full md:flex md:flex-col md:justify-center'>
            <div className='flex flex-col items-center py-4 px-5'>
              <h1 className='text-3xl sm:text-4xl md:text-4xl lg:text-5xl font-bold md:mb-4'>Equilibra tu Plato <br/> Equilibra tu Vida</h1>
              <p className='text-base sm:text-lg md:text-lg font-normal mt-4 text-center'>¿Estás listo para transformar tu relación con la comida? En FitNotion, cada bocado cuenta hacia un estilo de vida más saludable. </p>
              <button className="flex h-10 flex-col justify-center items-center rounded-lg mt-4 px-4 text-base sm:text-lg md:text-lg font-medium text-white transition-colors aria-disabled:cursor-not-allowed aria-disabled:opacity-50 w-full bg-webColor uppercase" > 
                Empieza Gratis
              </button> 
            </div>
          </div>
          <div className='col-span-10 mx-auto md:col-span-5 p-4 md:flex md:flex-col md:justify-center'>
            <Image className='rounded-lg md:flex md:flex-col md:items-center' src={Banner} alt={'Texto'} width={476} height={328} />
          </div>
      </div>
    </section>
    <section className='p-6 lg:max-w-6xl mx-auto'>
       <div className='grid grid-rows-1 place-items-center'>
          <div className='grid grid-cols-1'>
              <h2 className='text-2xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-center'>
                Herramientas para conseguir tus objetivos
              </h2>
          </div>
       </div>
       <div className='grid grid-rows-1 place-items-stretch mt-5'>
          <div className='grid grid-cols-12 text-center gap-2 sm:gap-5'>
              <div className='col-span-12 sm:col-span-6 md:col-span-4 p-4'>
                  <div className='flex flex-col items-center my-4'>
                    <span className='bg-webColor w-20 h-20 rounded-full flex flex-col justify-center items-center shadow-[rgba(0,_0,_0,_0.2)_0px_20px_10px_-7px]'>
                      <CheckIcon className="h-10 w-10 rounded-3xl  text-white" />
                    </span>
                  </div>
                  <div className='flex flex-col items-center my-4'>
                    <h4 className='text-xl md:text-2xl font-bold'>
                      Registra y aprende
                    </h4>
                    <p className='my-4 text-lg font-normal'>
                      Puedes realizar un seguimiento de tu ingesta diaria y ajustar tu dieta según tus objetivos de salud
                    </p>
                  </div>
              </div>
              <div className='col-span-12 sm:col-span-6 md:col-span-4 p-4'>
                  <div className='flex flex-col items-center my-4'>
                    <span className='bg-webColor w-20 h-20 rounded-full flex flex-col justify-center items-center shadow-[rgba(0,_0,_0,_0.2)_0px_20px_10px_-7px]'>
                      <FlagIcon className="h-10 w-10 rounded-3xl  text-white" />
                    </span>
                  </div>
                  <div className='flex flex-col items-center my-4'>
                    <h4 className='text-xl md:text-2xl font-bold'>
                      Consigue tus metas
                    </h4>
                    <p className='my-4 text-lg font-normal'>
                      Gracias a nuestra herramienta puedes ver tu progreso y así alcanzar tus objetivos
                    </p>
                  </div>
              </div>
              <div className='col-span-12 sm:col-start-4 sm:col-span-6 md:col-span-4 p-4'>
                  <div className='flex flex-col items-center my-4'>
                    <span className='bg-webColor w-20 h-20 rounded-full flex flex-col justify-center items-center shadow-[rgba(0,_0,_0,_0.2)_0px_20px_10px_-7px]'>
                      <StarIcon className="h-10 w-10 rounded-3xl text-white" />
                    </span>
                  </div>
                  <div className='flex flex-col items-center my-4'>
                    <h4 className='text-xl md:text-2xl font-bold'>
                      Asesoramiento experto
                    </h4>
                    <p className='my-4 text-lg font-normal'>
                      Con nuestra herramienta puedes interaccionar con nutricionistas y obtener un feedback de los mismos
                    </p>
                  </div>
              </div>
          </div>
       </div>
    </section>

    
    </>
    
  );
}
