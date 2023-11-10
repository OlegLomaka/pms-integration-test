import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import * as AriUpdatesDecorators from './decorators';
import { PageDTO, PaginationDTO, ReturnMessage } from '../../utils';
import { ARIUpdateService } from './ariUpdate.service';
import { ARIUpdate } from './ariUpdate.entity';
import { WebhookDTO } from './dto';

@ApiTags('ARIUpdate')
@Controller('ari-update')
export class ARIUpdateController {
  constructor(private readonly ariUpdateService: ARIUpdateService) {}

  @Get()
  @AriUpdatesDecorators.GetAll(ARIUpdate)
  async getAll(
    @Query() pagination: PaginationDTO,
  ): Promise<PageDTO<ARIUpdate>> {
    return this.ariUpdateService.getAll(pagination);
  }

  @Post('webhook')
  @AriUpdatesDecorators.Webhook()
  async webhook(@Body() body: WebhookDTO): Promise<ReturnMessage> {
    return this.ariUpdateService.webhook(body);
  }
}
