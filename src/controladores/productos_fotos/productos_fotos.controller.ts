import { Controller, Get, Param, Post } from '@nestjs/common';
import { ProductosFotosService } from 'src/servicios/productos_fotos/productos_fotos.service';

@Controller('productos-fotos')
export class ProductosFotosController {
    constructor(private productosFotosService: ProductosFotosService) { }
    @Get(':id')
    metodoGet(@Param() params) {
        return this.productosFotosService.getDatosPorProducto(params.id)
    }
    @Post()
    metoddoPost()
    {

    }
}
