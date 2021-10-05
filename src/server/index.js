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
  const someTextField = req.body.someTextField || 'n/a';
  const someNumberField = req.body.someNumberField || 0;

  const entry = await db.createEntry({ someTextField, someNumberField });
  return res.json(entry);
});

app.delete('/entries/:id', async (req, res, next) => {
  await db.deleteEntry(req.params.id);
  res.json({});
});

app.use(express.static('public'));

export function start() {
  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}...`);
  });
}
