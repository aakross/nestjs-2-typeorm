import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert, ManyToOne, JoinColumn } from "typeorm";
import { Producto } from "./productos.entity";

@Entity("producto_foto")
export class ProductoFoto {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({ name: "foto", type: "varchar", length: 100 })
    foto: string;
    @ManyToOne((type) => Producto, producto => producto.id, { cascade: true, nullable: false })
    @JoinColumn({ name: "producto_id" })
    producto_id: Producto;
}