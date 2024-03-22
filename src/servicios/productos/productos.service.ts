import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductoDto } from 'src/dto/producto.dto';
import { Producto } from 'src/modelos/productos.entity';
import { ProductoFoto } from 'src/modelos/productos_fotos.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductosService {
    constructor(
        @InjectRepository(Producto)
        private repositorio: Repository<Producto>,
        @InjectRepository(ProductoFoto)
        private repositorioFotos: Repository<ProductoFoto>
    ) { }

    async getDatos(): Promise<Producto[]> {
        return await this.repositorio.find(
            {
                relations: ['categoria_id'],//Cuando no te muestre los registros de las tablas relacionadas haz esto
                order:
                {
                    id: "desc"
                }
            });
    }
    async getDatosPorCategoria(id: number): Promise<Producto[]> {
        return await this.repositorio.find({
            where:
            {
                categoria_id: { id: id }
            },
            order:
            {
                id: 'desc'
            }
        });
    }
    async addDatos(dto: ProductoDto) {
        let existe = await this.repositorio.findOne({
            where: {
                nombre: dto.nombre,
            }
        });
        if (existe) {
            throw new HttpException(`El registro ${dto.nombre} ya existe en el sistema`, HttpStatus.BAD_REQUEST);
        } else {
            try {
                return this.repositorio.save(this.repositorio.create(dto));
            } catch (error) {
                throw new HttpException(`Ocurrio un error inesperado`, HttpStatus.BAD_REQUEST);
            }
        }
    }
    async getDato(id: number): Promise<Producto> {
        let datos = await this.repositorio.findOne(
            {
                where: {
                    id: id
                }
            });
        if (!datos) {
            throw new HttpException(
                {
                    estado: HttpStatus.BAD_REQUEST,
                    mensaje: 'El registro no existe en el sistema'
                }, HttpStatus.BAD_REQUEST, {
                cause: { name: "", message: "" }
            });
        } else {
            return datos;
        }
    }
    async updateDatos(id: number, dto: ProductoDto) {
        let datos = await this.repositorio.findOne(
            {
                where: {
                    id: id
                }
            });
        if (!datos) {
            throw new HttpException(
                {
                    estado: HttpStatus.BAD_REQUEST,
                    mensaje: 'El registro no existe en el sistema'
                }, HttpStatus.BAD_REQUEST, {
                cause: { name: "", message: "" }
            });
        } else {
            await this.repositorio.update({ id }, dto);
        }

    }
    async deleteDato(id: number) {
        let existe = await this.repositorioFotos.find(
            {
                where:
                {
                    producto_id: { id: id }
                }
            });
        if (existe.length >= 1) {
            throw new HttpException(`No es posible eliminar el registro en este momento`, HttpStatus.BAD_REQUEST);
        } else {
            this.repositorio.delete(id);
            return { estado: 'Ok', mensaje: " Se elimino el registro exitosamente" }
        }
    }
}
