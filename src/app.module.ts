import { Module } from '@nestjs/common';
//ConfigModule manda a llamar al archivo .env
import { ConfigModule } from '@nestjs/config';
//Typeorm
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Categoria } from './modelos/categorias.entity';
import { Producto } from './modelos/productos.entity';
import { ProductoFoto } from './modelos/productos_fotos.entity';
import { CategoriasService } from './servicios/categorias/categorias.service';
import { CategoriasController } from './controladores/categorias/categorias.controller';
import { ProductosController } from './controladores/productos/productos.controller';
import { ProductosService } from './servicios/productos/productos.service';
import { ProductosFotosService } from './servicios/productos_fotos/productos_fotos.service';
import { ProductosFotosController } from './controladores/productos_fotos/productos_fotos.controller';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forFeature([Categoria, Producto, ProductoFoto]), //Esto permite informar los modelos con los que se va a trabajar
    TypeOrmModule.forRoot(
      {
        type: 'mysql',
        host: process.env.DATABASE_SERVER,
        port: parseInt(process.env.DATABASE_PORT),
        username: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABESE_DATABASE,
        entities: [],
        synchronize: true,
        autoLoadEntities: true

      }
    )
  ],
  controllers: [AppController, CategoriasController, ProductosController, ProductosFotosController],
  providers: [AppService, CategoriasService, ProductosService, ProductosFotosService],
})
export class AppModule { }
