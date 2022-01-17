import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export const CurrentUserGql = createParamDecorator(
  (_, context: ExecutionContext) => {
    const graphqlContext = GqlExecutionContext.create(context);
    const { req } = graphqlContext.getContext();

    return req.user;
  },
);
