import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ARIUpdate } from './ariUpdate.entity';
import {
  PageDTO,
  PageMetaDTO,
  PaginationDTO,
  ReturnMessage,
} from '../../utils';
import { WebhookDTO } from './dto';
import { UnitGroupService } from '../unitGroup/unitGroup.service';

@Injectable()
export class ARIUpdateService {
  constructor(
    @InjectRepository(ARIUpdate)
    private readonly ariUpdateRepository: Repository<ARIUpdate>,

    private readonly unitGroupService: UnitGroupService,
  ) {}

  public async getAll(pagination: PaginationDTO): Promise<PageDTO<ARIUpdate>> {
    const [entities, count] = await this.ariUpdateRepository.findAndCount({
      order: { createdAt: 'DESC' },
      skip: pagination.skip,
      take: pagination.take,
    });
    return new PageDTO(entities, new PageMetaDTO({ pagination, count }));
  }

  public async webhook(body: WebhookDTO): Promise<ReturnMessage> {
    await this.ariUpdateRepository.create(body).save();

    await this.unitGroupService.update({
      id: body.unitGroupId,
      restrictions: body.restrictions,
      numberOfFreeUnits: body.availability,
      rateTypes: body.prices,
    });

    return { message: 'OK' };
  }
}
