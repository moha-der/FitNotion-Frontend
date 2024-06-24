import DietaBox from "./DietaBox/DietaBox"

export default function Page({ params }: { params: { dieta: string}}) {
    return (
        <div className="container mx-auto">
           <DietaBox idDieta = {params.dieta}/>  
        </div>
    )
}
