
const data = {
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
    notas: {
        nota: {
            usuario: 'moha',
            nota: 'hola mundo'
        }
    }
}

export default function DietaBox() {
    return(
        
        <div><MealData data={data} /></div>
    );
}


const MealData = ({ data } : { data: any}) => {
    return (
        <div className="container mx-auto py-8">
        <h1 className="text-2xl font-bold mb-4 text-webColor">Detalle dieta</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {Object.keys(data).map((mealType, index) => {
            if (mealType === "notas") { 
              return null; 
            }
            return (
              <div key={index} className="col-span-12 flex flex-col border-y-2 md:rounded-xl md:border-2 md:mx-0">
                <div className="flex justify-between border-b-2 px-4 py-2 bg-webColor md:rounded-t-xl text-white">
                  <span className="font-semibold text-lg">{mealType}</span>
                </div>
                <ul>
                  {Object.keys(data[mealType]).map((option, optionIndex) => (
                    <li className="py-2" key={optionIndex}>
                      <span className="font-bold ml-4">{option}:</span> {data[mealType][option]}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    );
  };