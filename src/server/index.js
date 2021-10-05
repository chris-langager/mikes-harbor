import express from 'express';
import * as db from '../database';

import { ENV } from '../env';

const app = express();
const port = parseInt(ENV.PORT);

app.use(express.json());

app.use('/api', (req, res, next) => {
  res.setHeader('Content-Type', 'application/json');
  next();
});

app.get('/entries', async (req, res, next) => {
  const entries = await db.listEntries();
  res.json(entries);
});

app.post('/entries', async (req, res, next) => {
  const { someTextField, someNumberField } = req.body;
  if (!someTextField || !someNumberField) {
    res.statusCode = 400;
    res.json({
      code: 400,
      message: 'missing required properties',
    });
    return;
  }

  const entry = await db.createEntry({ someTextField, someNumberField });
  return res.json(entry);
});

app.use(express.static('public'));

export function start() {
  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}...`);
  });
}
