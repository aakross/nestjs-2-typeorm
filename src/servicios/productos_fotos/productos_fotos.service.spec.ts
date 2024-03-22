import { Test, TestingModule } from '@nestjs/testing';
import { ProductosFotosService } from './productos_fotos.service';

describe('ProductosFotosService', () => {
  let service: ProductosFotosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductosFotosService],
    }).compile();

    service = module.get<ProductosFotosService>(ProductosFotosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
