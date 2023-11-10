import { Type, applyDecorators } from '@nestjs/common';
import {
  ApiExtraModels,
  ApiOkResponse,
  ApiOperation,
  getSchemaPath,
} from '@nestjs/swagger';

import { PageDTO } from '../../../../utils';

export function GetAll<TModel extends Type<any>>(model: TModel) {
  return applyDecorators(
    ApiOperation({
      summary: 'Get All AriUpdates.',
      description: 'This route is provided to get all AriUpdates.',
    }),
    ApiExtraModels(PageDTO, model),
    ApiOkResponse({
      description: 'Get successful.',
      schema: {
        allOf: [
          { $ref: getSchemaPath(PageDTO) },
          {
            properties: {
              data: {
                type: 'array',
                items: { $ref: getSchemaPath(model) },
              },
            },
          },
        ],
      },
    }),
  );
}
