import { Entity, Column, OneToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

import { Base } from '../../config';
import { UnitGroup } from '../unitGroup/unitGroup.entity';

@Entity('properties')
export class Property extends Base {
  @ApiProperty()
  @Column()
  address: string;

  @OneToMany(() => UnitGroup, (unitGroups) => unitGroups.property)
  unitGroups: UnitGroup[];
}
