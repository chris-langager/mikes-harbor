export const ENV = {
  PORT: process.env.PORT || '3000',
  POSTGRES_DATABASE_URL: process.env.POSTGRES_DATABASE_URL || 'postgres://user:password@localhost:5432/postgres',
};
