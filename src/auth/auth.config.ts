import { registerAs } from '@nestjs/config';

export const AuthConfig = registerAs('auth', () => {
  return {
    sessionExpirationTime:
      parseInt(process.env.SESSION_EXPIRATION_TIME) || 3600,

    jwtSecret: process.env.JWT_SECRET || 'jwt-secret',
  };
});
