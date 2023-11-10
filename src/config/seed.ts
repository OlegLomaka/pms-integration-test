import { dataSource } from './typeorm.config';
import { WinstonLogger } from './winston.logger';

const logger = new WinstonLogger();

export const runSeed = async () => {
  logger.log('Seed starts');

  await dataSource.initialize();

  try {
    const propertyRepository = dataSource.getRepository('properties');

    const exists = await propertyRepository.findOne({
      where: { address: 'test address' },
    });

    if (!exists) {
      const property = await propertyRepository
        .create({ address: 'test address' })
        .save();

      const ratePlanRepository = dataSource.getRepository('rate-plan');
      const ratePlan1 = await ratePlanRepository
        .create({
          cancellationPolicy: 'some cencellation policy',
          rate: [
            {
              currency: 'USD',
              price: 12.99,
              isDayRate: false,
            },
            {
              currency: 'EURO',
              price: 10.99,
              isDayRate: false,
            },
          ],
        })
        .save();

      const ratePlan2 = await ratePlanRepository
        .create({
          cancellationPolicy: 'some cencellation policy',
          rate: [
            {
              currency: 'USD',
              price: 42.99,
              isDayRate: false,
            },
            {
              currency: 'EURO',
              price: 35.99,
              isDayRate: false,
            },
          ],
        })
        .save();

      const unitGroupRepository = dataSource.getRepository('unit-groups');
      const unitGroup1 = await unitGroupRepository
        .create({
          amountOfUnits: 3,
          numberOfBeds: 3,
          numberOfFreeUnits: 2,
          property,
          ratePlan: ratePlan1,
          restrictions: {
            arrivalRestriction: {
              isClosed: false,
              minLOSException: 2,
              maxLOSException: 10,
            },
          },
        })
        .save();

      const unitGroup2 = await unitGroupRepository
        .create({
          amountOfUnits: 5,
          numberOfBeds: 5,
          numberOfFreeUnits: 4,
          property,
          ratePlan: ratePlan2,
          restrictions: {
            arrivalRestriction: {
              isClosed: false,
              minLOSException: 4,
              maxLOSException: 8,
            },
          },
        })
        .save();

      const unitRepository = dataSource.getRepository('units');
      const unitsToSave = unitRepository.create([
        {
          roomNumber: 1,
          isDirty: false,
          isOccupied: false,
          unitGroup: unitGroup1,
        },
        {
          roomNumber: 2,
          isDirty: false,
          isOccupied: false,
          unitGroup: unitGroup1,
        },
        {
          roomNumber: 3,
          isDirty: false,
          isOccupied: true,
          unitGroup: unitGroup1,
        },
        {
          roomNumber: 1,
          isDirty: false,
          isOccupied: false,
          unitGroup: unitGroup2,
        },
        {
          roomNumber: 2,
          isDirty: false,
          isOccupied: false,
          unitGroup: unitGroup2,
        },
        {
          roomNumber: 3,
          isDirty: false,
          isOccupied: true,
          unitGroup: unitGroup2,
        },
        {
          roomNumber: 4,
          isDirty: false,
          isOccupied: false,
          unitGroup: unitGroup2,
        },
        {
          roomNumber: 5,
          isDirty: false,
          isOccupied: false,
          unitGroup: unitGroup2,
        },
      ]);

      await unitRepository.save(unitsToSave);
    }
  } catch (error) {
    logger.error(JSON.stringify(error));
    console.log(error);
    await dataSource.destroy();
  }

  await dataSource.destroy();

  logger.log('Seed successful!');
};
