import { Type, applyDecorators } from '@nestjs/common';
import {
  ApiExtraModels,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  getSchemaPath,
} from '@nestjs/swagger';

import { PageDTO } from '../../../../utils';

export function GetAll<TModel extends Type<any>>(model: TModel) {
  return applyDecorators(
    ApiOperation({
      summary: 'Get All available unit groups.',
      description: 'This route is provided to get all available unit groups.',
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
    ApiQuery({
      name: 'address',
      required: false,
      type: String,
      description: 'Search address.',
    }),
    ApiQuery({
      name: 'staydays',
      required: false,
      type: Number,
      description: 'Search staydays.',
    }),
  );
}
