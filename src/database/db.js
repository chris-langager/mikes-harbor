import pgPromise from 'pg-promise';
import { ENV } from '../env';

const pgp = pgPromise({
  // Initialization Options
});

export const db = pgp({
  connectionString: ENV.POSTGRES_DATABASE_URL,
});
