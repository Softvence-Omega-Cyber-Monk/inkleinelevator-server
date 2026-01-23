import { Test, TestingModule } from '@nestjs/testing';
import { ProtfolioController } from './protfolio.controller';
import { ProtfolioService } from './protfolio.service';

describe('ProtfolioController', () => {
  let controller: ProtfolioController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProtfolioController],
      providers: [ProtfolioService],
    }).compile();

    controller = module.get<ProtfolioController>(ProtfolioController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
