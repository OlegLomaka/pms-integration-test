import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Property } from './property.entity';
import { PropertyService } from './property.service';
import { WinstonLogger } from '../../config';
import { PropertyController } from './property.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Property])],
  controllers: [PropertyController],
  providers: [PropertyService, WinstonLogger],
})
export class PropertyModule {}
