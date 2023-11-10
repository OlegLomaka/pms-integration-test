import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { UnitGroupService } from './unitGroup.service';
import { GetAllUnitGroupsQueryDTO } from './dto';
import * as UnitGroupDecorators from './decorators';
import { GetAllUnitGroupOutput } from './output';
import { PageDTO, PaginationDTO } from '../../utils';

@ApiTags('UnitGroup')
@Controller('unit-group')
export class UnitGroupController {
  constructor(private readonly unitGroupService: UnitGroupService) {}

  @Get()
  @UnitGroupDecorators.GetAll(GetAllUnitGroupOutput)
  async getAll(
    @Query() query: GetAllUnitGroupsQueryDTO,
    @Query() pagination: PaginationDTO,
  ): Promise<PageDTO<GetAllUnitGroupOutput>> {
    return this.unitGroupService.getAll(query, pagination);
  }
}
