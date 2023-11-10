import { Entity, Column, JoinColumn, ManyToOne, Index } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

import { Base } from '../../config';
import { UnitGroup } from './unitGroup.entity';

@Entity('units')
@Index(['roomNumber', 'unitGroupId'], { unique: true })
export class Unit extends Base {
  @ApiProperty()
  @Column()
  roomNumber: number;

  @ApiProperty()
  @Column()
  isDirty: boolean;

  @ApiProperty()
  @Column()
  isOccupied: boolean;

  @ApiProperty()
  @Column()
  unitGroupId: boolean;

  @ManyToOne(() => UnitGroup, (unitGroup) => unitGroup.units)
  @JoinColumn({ name: 'unitGroupId' })
  unitGroup: UnitGroup;
}
