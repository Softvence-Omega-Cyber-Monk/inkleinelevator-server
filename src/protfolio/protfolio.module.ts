import { Module } from '@nestjs/common';
import { ProtfolioService } from './protfolio.service';
import { ProtfolioController } from './protfolio.controller';

@Module({
  controllers: [ProtfolioController],
  providers: [ProtfolioService],
})
export class ProtfolioModule {}
