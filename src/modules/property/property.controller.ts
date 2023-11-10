import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { PropertyService } from './property.service';
import { GetAllPropertiesQueryDTO } from './dto';
import { GetAllPropertyOutput } from './output';
import * as PropertyDecorators from './decorators';
import { PageDTO, PaginationDTO } from '../../utils';

@ApiTags('Property')
@Controller('property')
export class PropertyController {
  constructor(private readonly propertyService: PropertyService) {}

  @Get()
  @PropertyDecorators.GetAll(GetAllPropertyOutput)
  async getAll(
    @Query() query: GetAllPropertiesQueryDTO,
    @Query() pagination: PaginationDTO,
  ): Promise<PageDTO<GetAllPropertyOutput>> {
    return this.propertyService.getAll(query, pagination);
  }
}
