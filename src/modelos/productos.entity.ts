import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert, ManyToOne, JoinColumn } from "typeorm";
import slugify from "slugify";
import { Categoria } from "./categorias.entity";

@Entity()
export class Producto {
    @PrimaryGeneratedColumn() //Esto genera un campo de tipo autoincrementable y genera que el primer campo tenga la llave primaria
    id: number;
    @Column({ name: 'nombre', type: "varchar", length: 100 })
    nombre: string;
    @Column({ unique: true, name: 'slug', type: "varchar", length: 100 })
    slug: string;
    @Column({ name: "precio" })
    precio: number;
    @Column({ name: "descripcion", type: "longtext" })
    descripcion: string;
    @Column({ name: "stock" })
    stock: number;

    @ManyToOne((type) => Categoria, categoria => categoria.id, { cascade: true, eager: true, nullable: false }) //Aqui se esta haciendo la relacion 
    @JoinColumn({ name: "categoria_id" })
    categoria_id: Categoria //Aqui se hace la relacion de la columna que se va a utilizar para la relacion



    @BeforeInsert()
    alCrear() {
        this.slug = slugify(this.nombre);
    }
}