import { Test, TestingModule } from '@nestjs/testing';
import { ProductosFotosController } from './productos_fotos.controller';

describe('ProductosFotosController', () => {
  let controller: ProductosFotosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductosFotosController],
    }).compile();

    controller = module.get<ProductosFotosController>(ProductosFotosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
