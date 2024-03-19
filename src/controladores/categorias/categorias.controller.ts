import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { CategoriaDto } from 'src/dto/categoria.dto';
import { CategoriasService } from 'src/servicios/categorias/categorias.service';
import slugify from 'slugify';

@Controller('categorias')
export class CategoriasController {
    constructor(private CategoriasService: CategoriasService) { }

    @Get()
    metodoGet(): {} {
        return this.CategoriasService.getDatos();
    }
    @Get(':id')
    metodoGetPorId(@Param() params): {} {
        return this.CategoriasService.getDato(params.id);
    }
    @Post()
    metodoPost(@Body() dto: CategoriaDto) {
        return this.CategoriasService.addDatos(dto);
    }
    @Put(':id')
    metodoPut(@Param() params, @Body() dto: CategoriaDto) {
        this.CategoriasService.updateDatos(params.id, { nombre: dto.nombre, slug: slugify(dto.nombre.toLowerCase()) });
        return { estado: "ok", mensaje: "Se modifico el registro exitosamente"}
    }
}
