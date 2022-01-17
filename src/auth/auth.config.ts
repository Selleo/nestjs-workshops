import { registerAs } from '@nestjs/config';

export const AuthConfig = registerAs('auth', () => {
  return {
    sessionExpirationTime:
      parseInt(process.env.SESSION_EXPIRATION_TIME) || 1000 * 60 * 60,
  };
});
