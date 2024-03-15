import { Categoria } from "src/modelos/categorias.entity";
export class ProductoDto {
    nombre: string;
    slug?: string;
    precio: number;
    descripcion: string;
    stock: number;
    categoria_id: Categoria;
}