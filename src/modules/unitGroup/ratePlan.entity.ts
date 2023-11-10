import { Entity, Column, JoinColumn, OneToOne } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

import { Base } from '../../config';
import { UnitGroup } from './unitGroup.entity';

export class RateType {
  @ApiProperty()
  currency: string;

  @ApiProperty()
  price: number;

  @ApiProperty()
  isDayRate: boolean;
}

@Entity('rate-plan')
export class RatePlan extends Base {
  @ApiProperty()
  @Column()
  cancellationPolicy: string;

  @ApiProperty({ type: [RateType] })
  @Column({ type: 'json' })
  rate: RateType[];

  @OneToOne(() => UnitGroup, (unitGroup) => unitGroup.ratePlan)
  @JoinColumn()
  unitGroup: UnitGroup;
}
