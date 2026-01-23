import { Test, TestingModule } from '@nestjs/testing';
import { ProtfolioService } from './protfolio.service';

describe('ProtfolioService', () => {
  let service: ProtfolioService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProtfolioService],
    }).compile();

    service = module.get<ProtfolioService>(ProtfolioService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
