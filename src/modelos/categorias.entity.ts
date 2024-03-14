import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert } from "typeorm";
import slugify from "slugify";

@Entity()
export class Categoria {
    @PrimaryGeneratedColumn() //Esto genera un campo de tipo autoincrementable y genera que el primer campo tenga la llave primaria
    id: number;
    @Column({ name: 'nombre', type: "varchar", length: 100 })
    nombre: string;
    @Column({ unique: true, name: 'slug', type: "varchar", length: 100 })
    slug: string;
    @BeforeInsert()
    alCrear() {
        this.slug = slugify(this.nombre);
    }
}