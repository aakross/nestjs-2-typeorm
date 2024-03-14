import { Module } from '@nestjs/common';
//ConfigModule manda a llamar al archivo .env
import { ConfigModule } from '@nestjs/config';
//Typeorm
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forFeature([]), //Esto permite informar los modelos con los que se va a trabajar
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
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
