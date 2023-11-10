import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
  .addBearerAuth()
  .setTitle('pms-integration-test')
  .setVersion('0.0.1')
  .build();
