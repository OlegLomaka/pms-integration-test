import { RateType } from '../ratePlan.entity';
import { RestrictionsGroupType } from '../unitGroup.entity';

export class UpdateUnitGroupDTO {
  id: string;
  amountOfUnits?: number;
  numberOfBeds?: number;
  numberOfFreeUnits?: number;
  restrictions?: RestrictionsGroupType;
  rateTypes?: RateType[];
}
