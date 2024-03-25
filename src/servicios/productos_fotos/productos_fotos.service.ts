import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductoFoto } from 'src/modelos/productos_fotos.entity';
import { Repository } from 'typeorm';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { Producto } from 'src/modelos/productos.entity';
import * as fs from 'fs';

export class SampleDto {
    producto_id: Producto
}
export const fecha = Date.now();

@Injectable()
export class ProductosFotosService {
    constructor(
        @InjectRepository(ProductoFoto)
        private repositorio: Repository<ProductoFoto>
    ) { }

    async getDatosPorProducto(id: number): Promise<ProductoFoto[]> {
        return await this.repositorio.find(
            {
                where:
                {
                    producto_id: { id: id }
                },
                order:
                {
                    id: 'DESC'
                }
            });
    }
    async addDatos(dto: ProductoFoto) {
        try {
            return this.repositorio.save(this.repositorio.create(dto));
        } catch (error) {
            throw new HttpException(
                'Ocurrio un error inesperado',
                HttpStatus.BAD_REQUEST
            );
        }
    }
    async deleteDato(id: number) {
        let datos = await this.repositorio.findOne({
            where: {
                id: id,
            },
        });
        if (datos) {
            fs.unlinkSync(`./assets/uploads/productos/${datos.foto}`);
            await this.repositorio.delete(id);
            return { estado: 'ok', mensaje: 'Se elimino el registro exitosamente' };
        } else {
            throw new HttpException(
                'Ocurrio un error, por favor vuelva a intentarlo mas tarde',
                HttpStatus.BAD_REQUEST
            );
        }
    }
}
