import { Controller, Get } from '@nestjs/common';
import { ProductosService } from 'src/servicios/productos/productos.service';

@Controller('productos')
export class ProductosController {
    constructor(private productosService: ProductosService) { }
    @Get()
    metodoGet() {
        return this.productosService.getDatos();
    }
}
