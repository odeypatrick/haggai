import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from './users/schemas/user.schema';

export const getCurrentUserByContext = (context: ExecutionContext): User => {
  if (context.getType() === 'http') {
    return context.switchToHttp().getRequest().user;
  }
  if (context.getType() === 'rpc') {
    return context.switchToRpc().getData().user;
  }

  throw new Error('Invalid context type'); // Adding an explicit throw in case of unexpected context type
};

export const CurrentUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext) =>
    getCurrentUserByContext(context),
);