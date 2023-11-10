import { IsNotEmpty, IsString } from 'class-validator';

export class GetAllUnitGroupsQueryDTO {
  @IsString({ message: 'Query param address must be a string' })
  @IsNotEmpty({ message: 'Query param address should not be empty' })
  address: string;
}
