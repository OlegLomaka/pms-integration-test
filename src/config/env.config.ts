import { validate } from 'class-validator';
import { config } from 'dotenv';

import { EnvConfigDTO } from './dto/env.dto';

config();

export const envConfig = new EnvConfigDTO();

envConfig.PORT = parseInt(process.env.PORT || '');
envConfig.HOST = process.env.HOST || '';

envConfig.DB_HOST = process.env.DB_HOST || '';
envConfig.DB_PORT = parseInt(process.env.DB_PORT || '');
envConfig.DB_USERNAME = process.env.DB_USERNAME || '';
envConfig.DB_NAME = process.env.DB_NAME || '';
envConfig.DB_PASSWORD = process.env.DB_PASSWORD || '';

export const validateDotEnvConfig = async () => {
  const validationErrors = await validate(envConfig);

  if (validationErrors.length > 0) {
    console.error('Validation failed for environment variables:');
    validationErrors.forEach((error: any) => {
      console.error(`- ${error.property}: ${error.constraints}`);
    });
    throw new Error('Environment variable validation failed');
  }
};
