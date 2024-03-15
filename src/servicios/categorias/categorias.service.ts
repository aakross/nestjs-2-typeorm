import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
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
}
