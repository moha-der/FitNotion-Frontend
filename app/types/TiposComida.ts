export interface TiposComida {
    tipoComida: String,
    caloriasTotal: number,
    alimentos: Alimentos[],
}


export interface Alimentos {
    id: string,
    nombre: string,
    calorias: number,
    cantidad: number
}