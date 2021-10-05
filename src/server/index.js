import express from 'express';

import { ENV } from '../env';

const app = express();
const port = parseInt(ENV.PORT);

app.use(express.json());

app.use('/api', (req, res, next) => {
  res.setHeader('Content-Type', 'application/json');
  next();
});

app.use(express.static('public'));

export function start() {
  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}...`);
  });
}
