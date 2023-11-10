import {
  Entity,
  Column,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

import { Base } from '../../config';
import { Property } from '../property/property.entity';
import { Unit } from './unit.entity';
import { RatePlan } from './ratePlan.entity';

export class RestrictionType {
  @ApiProperty()
  isClosed: boolean;

  @ApiProperty()
  minLOSException: number;

  @ApiProperty()
  maxLOSException: number;
}

export class RestrictionsGroupType {
  @ApiProperty({ type: RestrictionType })
  arrivalRestriction?: RestrictionType;

  @ApiProperty({ type: RestrictionType })
  departureRestriction?: RestrictionType;

  @ApiProperty({ type: RestrictionType })
  stayRestriction?: RestrictionType;
}

@Entity('unit-groups')
export class UnitGroup extends Base {
  @ApiProperty()
  @Column()
  amountOfUnits: number;

  @ApiProperty()
  @Column()
  numberOfBeds: number;

  @ApiProperty()
  @Column()
  numberOfFreeUnits: number;

  @ApiProperty({ type: RestrictionsGroupType })
  @Column({ type: 'json' })
  restrictions: RestrictionsGroupType;

  @ManyToOne(() => Property, (property) => property.unitGroups)
  @JoinColumn()
  property: Property;

  @OneToMany(() => Unit, (units) => units.unitGroup)
  units: Unit[];

  @OneToOne(() => RatePlan, (ratePlan) => ratePlan.unitGroup, {
    cascade: true,
  })
  ratePlan: RatePlan;
}
