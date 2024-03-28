import FoodModal from "./FoodModal";
import { useSession } from "next-auth/react";
import { Alimentos } from "@/app/types/TiposComida";
import { useRouter } from "next/navigation";



export default function EatTime({
    title,
    param,
    alimentos,
    fecha,
    setRenderizarDatos,
}: {
    title: string
    param: any
    alimentos: Alimentos[]
    fecha: Date
    setRenderizarDatos: any
}) {

    const { data: session, status } = useSession();
    const router = useRouter();

    const email = session ? session.user?.email : null


    return (
        <>
            <div className='col-span-12 flex flex-col border-y-2 md:col-span-8 md:rounded-xl md:border-2 md:mx-0'>
                <span className='border-b-2 px-4 py-2 bg-webColor md:rounded-t-xl text-white'>{title}</span>
                {alimentos.length !== 0 && (
                    <div className="mt-1">
                        {alimentos.map(alimento => (
                            <div key={alimento.id} className="px-4 py-2 flex flex-row justify-between">
                                <span>{alimento.nombre}</span>
                                <span className="">{alimento.calorias}</span>
                            </div>
                        ))}
                    </div>
                )}
                <a className='px-4 py-2 text-blue-500' onClick={()=> router.push(`/panel?show=true&tipo=${title}`)} href="#">Agregar alimento</a>
            </div>
            {param && <FoodModal fecha={fecha} setRenderizarDatos={setRenderizarDatos}/>}

        </>
    );
}