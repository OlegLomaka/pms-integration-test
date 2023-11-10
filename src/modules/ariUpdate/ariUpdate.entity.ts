import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity } from 'typeorm';

import { Base } from '../../config';
import { RestrictionsGroupType } from '../unitGroup/unitGroup.entity';
import { RateType } from '../unitGroup/ratePlan.entity';

@Entity('ari-update')
export class ARIUpdate extends Base {
  @ApiProperty()
  @Column()
  unitGroupId: string;

  @ApiProperty({ type: RestrictionsGroupType })
  @Column({ type: 'json' })
  restrictions: RestrictionsGroupType;

  @ApiProperty()
  @Column()
  availability: number;

  @ApiProperty({ type: [RateType] })
  @Column({ type: 'json' })
  prices: RateType[];
}
