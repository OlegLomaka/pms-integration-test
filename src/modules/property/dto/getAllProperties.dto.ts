import { Transform } from 'class-transformer';
import { IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class GetAllPropertiesQueryDTO {
  @IsString({ message: 'Query param address must be a string' })
  @IsOptional()
  address: string;

  @Transform(({ value }) => (value !== undefined ? +value : undefined))
  @IsNumber({}, { message: 'Query param staydays must be a number' })
  @Min(1)
  @IsOptional()
  staydays: number;
}
