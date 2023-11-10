import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Property } from './property.entity';
import { GetAllPropertiesQueryDTO } from './dto';
import { PageDTO, PageMetaDTO, PaginationDTO } from '../../utils';
import { GetAllPropertyOutput } from './output';

@Injectable()
export class PropertyService {
  constructor(
    @InjectRepository(Property)
    private readonly propertyRepository: Repository<Property>,
  ) {}

  public async getAll(
    { address, staydays }: GetAllPropertiesQueryDTO,
    pagination: PaginationDTO,
  ): Promise<PageDTO<GetAllPropertyOutput>> {
    const query = this.propertyRepository
      .createQueryBuilder('properties')
      .select()
      .leftJoinAndSelect('properties.unitGroups', 'unitGroups')
      .leftJoinAndSelect('unitGroups.units', 'units')
      .leftJoinAndSelect('unitGroups.ratePlan', 'ratePlan')
      .where('units.isOccupied = false');

    if (address)
      query.andWhere('properties.address LIKE :address', {
        address: `%${address}%`,
      });

    if (staydays)
      query
        .andWhere(
          "JSON_EXTRACT(`unitGroups`.`restrictions`, '$.arrivalRestriction.minLOSException') <= :staydays",
          { staydays },
        )
        .andWhere(
          "JSON_EXTRACT(`unitGroups`.`restrictions`, '$.arrivalRestriction.maxLOSException') >= :staydays",
          { staydays },
        );

    const [entities, count] = await query
      .skip(pagination.skip)
      .take(pagination.take)
      .getManyAndCount();

    return new PageDTO(entities, new PageMetaDTO({ pagination, count }));
  }
}
