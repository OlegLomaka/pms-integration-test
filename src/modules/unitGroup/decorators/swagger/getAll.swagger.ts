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
      summary: 'Get All Unti Groups.',
      description: 'This route is provided to get all Unti Groups.',
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
  );
}
