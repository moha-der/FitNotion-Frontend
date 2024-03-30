import FoodModal from "./FoodModal";
import { useSession } from "next-auth/react";
import { Alimentos } from "@/app/types/TiposComida";
import { useRouter } from "next/navigation";



export default function EatTime({
    title,
    caloriasTotal,
    param,
    alimentos,
    fecha,
    setRenderizarDatos,
}: {
    title: string
    caloriasTotal: number,
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
            <div className='col-span-12 flex flex-col border-y-2 md:rounded-xl md:border-2 md:mx-0'>
                <div className="flex justify-between border-b-2 px-4 py-2 bg-webColor md:rounded-t-xl text-white">
                <span>{title}</span>
                <span>{Math.ceil(caloriasTotal)}</span>
                </div>
                {alimentos.length !== 0 && (
                    <div className="mt-1">
                        {alimentos.map(alimento => (
                            <div key={alimento.id} className="px-4 py-2 flex flex-row justify-between">
                                <div className="flex flex-col">
                                    <span className="pr-2">{alimento.nombre}</span>
                                    <span className="text-[10px]">Cantidad (x100gr) : {alimento.cantidad}</span>
                                </div>
                                <span className="">{Math.ceil(alimento.calorias)}</span>
                            </div>
                        ))}
                    </div>
                )}
                <a className='px-4 py-2 text-webColor' onClick={()=> router.push(`/panel?show=true&tipo=${title}`)} href="#">Agregar alimento</a>
            </div>
            {param && <FoodModal fecha={fecha} setRenderizarDatos={setRenderizarDatos}/>}

        </>
    );
}