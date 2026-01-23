import { Controller } from '@nestjs/common';
import { ProtfolioService } from './protfolio.service';

@Controller('protfolio')
export class ProtfolioController {
  constructor(private readonly protfolioService: ProtfolioService) {}
}
