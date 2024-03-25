import { Body, Controller, FileTypeValidator, Get, MaxFileSizeValidator, Param, ParseFilePipe, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ProductosFotosService } from 'src/servicios/productos_fotos/productos_fotos.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { Producto } from 'src/modelos/productos.entity';

export class SampleDto {
    producto_id: Producto;
}
export const fecha = Date.now();

export const storage = diskStorage({
    destination: './assets/uploads/productos',
    filename: (req, file, callback) => {
        let nombre = `${fecha}${extname(file.originalname)}`;
        callback(null, nombre);
    },
});


@Controller('productos-fotos')
export class ProductosFotosController {
    constructor(private productosFotosService: ProductosFotosService) { }
    @Get(':id')
    metodoGet(@Param() params) {
        return this.productosFotosService.getDatosPorProducto(params.id)
    }
    @Post()
    @UseInterceptors(FileInterceptor('file', { storage }))
    metoddoPost(@Body() dto: SampleDto, @UploadedFile(
        new ParseFilePipe(
            {
                validators:
                    [
                        new FileTypeValidator({ fileType: '.(png|jpeg|jpg)' }),
                        new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 4 }),
                    ]
            }),
    ) file: Express.Multer.File) {
        let nombre = `${fecha}${extname(file.originalname)}`;
        this.productosFotosService.addDatos({ foto: nombre, producto_id: dto.producto_id });
        return { estado: 'ok', mensaje: "Se creo el registro exitosamente" }
    }
}