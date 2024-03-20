import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductoDto } from 'src/dto/producto.dto';
import { Producto } from 'src/modelos/productos.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductosService {
    constructor(
        @InjectRepository(Producto)
        private repositorio: Repository<Producto>
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
}
