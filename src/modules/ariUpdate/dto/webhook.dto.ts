import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsObject, IsUUID } from 'class-validator';

import { RestrictionsGroupType } from '../../unitGroup/unitGroup.entity';
import { RateType } from '../../unitGroup/ratePlan.entity';

export class WebhookDTO {
  @ApiProperty()
  @IsUUID()
  unitGroupId: string;

  @ApiProperty({ type: RestrictionsGroupType })
  @IsObject()
  restrictions: RestrictionsGroupType;

  @ApiProperty()
  @IsInt()
  availability: number;

  @ApiProperty({ type: [RateType] })
  @IsObject({ each: true })
  prices: RateType[];
}
