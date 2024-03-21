import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import slugify from 'slugify';
import { ProductoDto } from 'src/dto/producto.dto';
import { ProductosService } from 'src/servicios/productos/productos.service';

@Controller('productos')
export class ProductosController {
    constructor(private productosService: ProductosService) { }
    @Get()
    metodoGet() {
        return this.productosService.getDatos();
    }
    @Post()
    metodoPost(@Body() dto: ProductoDto) {
        return this.productosService.addDatos(dto);
    }
    @Get(":id")
    metodoGetId(@Param() params): {} {
        return this.productosService.getDato(params.id);
    }
    @Put(':id')
    metodoPut(@Param() params, @Body() dto: ProductoDto) {
        this.productosService.updateDatos(params.id, { nombre: dto.nombre, slug: slugify(dto.nombre.toLowerCase()), precio: dto.precio, descripcion: dto.descripcion, stock: dto.stock, categoria_id: dto.categoria_id });
        return { estado: "ok", mensaje: "Se modifico el registro exitosamente" }
    }
    @Delete(":id")
    metodoDelete(@Param() params) {
        return this.productosService.deleteDato(params.id);
    }
}