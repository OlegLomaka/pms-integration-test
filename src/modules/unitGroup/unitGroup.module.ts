import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { WinstonLogger } from '../../config';
import { UnitGroup } from './unitGroup.entity';
import { UnitGroupController } from './unitGroup.controller';
import { UnitGroupService } from './unitGroup.service';

@Module({
  imports: [TypeOrmModule.forFeature([UnitGroup])],
  controllers: [UnitGroupController],
  providers: [UnitGroupService, WinstonLogger],
  exports: [UnitGroupService],
})
export class UnitGroupModule {}
