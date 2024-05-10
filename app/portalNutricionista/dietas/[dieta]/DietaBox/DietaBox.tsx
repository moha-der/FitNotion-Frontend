
const data = {
    usuario: "moha",
    desayuno: {
        opcionA: 'Arroz con pollo',
        opcionB: 'Arroz con pollo',
        opcionC: 'Arroz con pollo',
    },
    almuerzo: {
        opcionA: 'Arroz con pollo',
        opcionB: 'Arroz con pollo',
        opcionC: 'Arroz con pollo',
    },
    comida: {
        opcionA: 'Arroz con pollo',
        opcionB: 'Arroz con pollo',
        opcionC: 'Arroz con pollo',
    },
    merienda: {
        opcionA: 'Arroz con pollo',
        opcionB: 'Arroz con pollo',
        opcionC: 'Arroz con pollo',
    },
    cena: {
        opcionA: 'Arroz con pollo',
        opcionB: 'Arroz con pollo',
        opcionC: 'Arroz con pollo',
    },
    nota: {
        usuario: 'moha',
        nota: 'hola mundo'
    }
}

export default function DietaBox() {
    return(
        <div className='col-span-12 flex flex-col border-y-2 md:rounded-xl md:border-2 md:mx-0'>
                <div className="flex justify-between border-b-2 px-4 py-2 bg-webColor md:rounded-t-xl text-white">
                <span>{data.usuario} </span>
                <span>2434</span>
                </div>
                
                <a className='px-4 py-2 text-webColor' href="#">Agregar alimento</a>
            </div>
    );
}