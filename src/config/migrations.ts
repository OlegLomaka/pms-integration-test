import { dataSource } from './typeorm.config';
import { WinstonLogger } from './winston.logger';

const logger = new WinstonLogger();

export const runMigrations = async () => {
  logger.log('Migration starts');

  try {
    await dataSource.initialize();
    await dataSource.runMigrations();
    await dataSource.destroy();
  } catch (error) {
    await dataSource.destroy();
    logger.error(JSON.stringify(error));
    console.log(error);
  }

  logger.log('Migration successful!');
};
