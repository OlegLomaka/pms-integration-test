import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiOperation } from '@nestjs/swagger';

import { ReturnMessage } from '../../../../utils';
import { WebhookDTO } from '../../dto';

export function Webhook() {
  return applyDecorators(
    ApiOperation({
      summary: 'ARIUpdate.',
      description: 'This route is provided to update booking information.',
    }),
    ApiBody({ type: WebhookDTO }),
    ApiOkResponse({
      description: 'Update successful.',
      type: ReturnMessage,
    }),
  );
}
