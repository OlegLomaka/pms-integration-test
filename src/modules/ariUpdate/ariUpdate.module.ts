import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { WinstonLogger } from '../../config';
import { ARIUpdate } from './ariUpdate.entity';
import { ARIUpdateService } from './ariUpdate.service';
import { ARIUpdateController } from './ariUpdate.controller';
import { UnitGroupModule } from '../unitGroup/unitGroup.module';

@Module({
  imports: [TypeOrmModule.forFeature([ARIUpdate]), UnitGroupModule],
  controllers: [ARIUpdateController],
  providers: [ARIUpdateService, WinstonLogger],
})
export class ARIUpdateModule {}
