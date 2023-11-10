import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { typeOrmAsyncConfig } from './config';
import { PropertyModule } from './modules/property/property.module';
import { UnitGroupModule } from './modules/unitGroup/unitGroup.module';
import { ARIUpdateModule } from './modules/ariUpdate/ariUpdate.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync(typeOrmAsyncConfig),
    PropertyModule,
    UnitGroupModule,
    ARIUpdateModule,
  ],
})
export class AppModule {}
