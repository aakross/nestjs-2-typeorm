import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoriaDto } from 'src/dto/categoria.dto';
import { Categoria } from 'src/modelos/categorias.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoriasService {
    constructor(
        @InjectRepository(Categoria)//InjectRepository toma el modelo mque vayamos a usar
        private repositorio: Repository<Categoria>//Con la variable repositorio vamos a hacer las comunicaciones con la aplicacion
    ) { }
    //Se crea el metodo de consulta hacia categorias
    async getDatos(): Promise<Categoria[]> {//Se retornan como promesas del tipo de modelo que se vaya a utilizar y se ponen corchetes porque te va a entregar "n" registros
        return await this.repositorio.find({
            order: {
                id: "DESC"
            }
        });
    }
    async getDato(id: number): Promise<Categoria> {
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

    async addDatos(dto: CategoriaDto) {
        let existe = await this.repositorio.findOne(
            {
                where: {
                    nombre: dto.nombre
                }
            });
        if (existe) {
            throw new HttpException(`La categoria ${dto.nombre} ya existe en el sistema`, HttpStatus.BAD_REQUEST);
        } else {
            try {
                let save = this.repositorio.create(dto);
                return this.repositorio.save(save);
            } catch (error) {
                throw new HttpException(`Ocurrio un error inesperado`, HttpStatus.BAD_REQUEST);
            }

        }
    }
    async updateDatos(id: number, dto: CategoriaDto) {
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

}
