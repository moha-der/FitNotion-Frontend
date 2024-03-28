export interface TiposComida {
    tipoComida: String,
    alimentos: Alimentos[],
}


export interface Alimentos {
    id: string,
    nombre: string,
    calorias: number,
    cantidad: number
}