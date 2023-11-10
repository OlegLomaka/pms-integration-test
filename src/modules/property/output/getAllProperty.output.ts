import { ApiProperty } from '@nestjs/swagger';
import { GetAllUnitGroupOutput } from '../../unitGroup/output';

export class GetAllPropertyOutput {
  @ApiProperty()
  address: string;

  @ApiProperty({ type: [GetAllUnitGroupOutput] })
  unitGroups: GetAllUnitGroupOutput[];
}
