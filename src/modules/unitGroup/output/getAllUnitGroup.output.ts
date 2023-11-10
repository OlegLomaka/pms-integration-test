import { ApiProperty } from '@nestjs/swagger';

import { Unit } from '../unit.entity';
import { RatePlan } from '../ratePlan.entity';
import { Property } from '../../property/property.entity';
import { RestrictionsGroupType } from '../unitGroup.entity';

export class GetAllUnitGroupOutput {
  @ApiProperty()
  amountOfUnits: number;

  @ApiProperty()
  numberOfBeds: number;

  @ApiProperty()
  numberOfFreeUnits: number;

  @ApiProperty()
  property: Property;

  @ApiProperty()
  restrictions: RestrictionsGroupType;

  @ApiProperty({ type: [Unit] })
  units: Unit[];

  @ApiProperty()
  ratePlan: RatePlan;
}
