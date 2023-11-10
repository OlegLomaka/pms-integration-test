import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsRelations, ILike, Repository } from 'typeorm';

import { UnitGroup } from './unitGroup.entity';
import { GetAllUnitGroupsQueryDTO, UpdateUnitGroupDTO } from './dto';
import { PageDTO, PageMetaDTO, PaginationDTO, updateObject } from '../../utils';

@Injectable()
export class UnitGroupService {
  constructor(
    @InjectRepository(UnitGroup)
    private readonly unitGroupRepository: Repository<UnitGroup>,
  ) {}

  public async getAll(
    { address }: GetAllUnitGroupsQueryDTO,
    pagination: PaginationDTO,
  ) {
    const [entities, count] = await this.unitGroupRepository.findAndCount({
      relations: { units: true },
      where: {
        property: { address: ILike(`%${address}%`) },
        units: { isOccupied: false },
      },
      skip: pagination.skip,
      take: pagination.take,
    });

    return new PageDTO(entities, new PageMetaDTO({ pagination, count }));
  }

  public async getOneById(
    id: string,
    relations?: FindOptionsRelations<UnitGroup>,
  ): Promise<UnitGroup> {
    const unitGroup = await this.unitGroupRepository.findOne({
      relations: { ...relations },
      where: { id },
    });

    if (!unitGroup) throw new NotFoundException();

    return unitGroup;
  }

  public async update({
    id,
    amountOfUnits,
    numberOfBeds,
    numberOfFreeUnits,
    restrictions,
    rateTypes,
  }: UpdateUnitGroupDTO): Promise<UnitGroup> {
    const unitGroup = await this.getOneById(id, { ratePlan: true });

    if (amountOfUnits) unitGroup.amountOfUnits = amountOfUnits;
    if (numberOfBeds) unitGroup.numberOfBeds = numberOfBeds;
    if (numberOfFreeUnits) unitGroup.numberOfFreeUnits = numberOfFreeUnits;
    if (restrictions) updateObject(unitGroup.restrictions, restrictions);
    if (rateTypes?.length) {
      rateTypes.forEach((r) => {
        const index = unitGroup.ratePlan.rate.findIndex(
          (el) => el.currency === r.currency,
        );

        unitGroup.ratePlan.rate[index] = r;
      });
    }

    return await unitGroup.save();
  }
}
