import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

import winston from 'winston';
import dotenv from 'dotenv';

import modelRoutes from './routes/modelRoutes.js';
import loginRoutes from './routes/loginRoutes.js';

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT;

app.use(cors());

const httpLogger = winston.createLogger({
  format: winston.format.json(),
  transports: [
    new winston.transports.File({
      filename: './logs/http-requests.log',
      flags: 'a',
    }),
  ],
});

app.use(
  morgan('combined', {
    stream: {
      write: (message) => {
        httpLogger.info(message.trim());
      },
    },
  })
);

app.listen(PORT, () => {
  console.log(
    `Server running in ${process.env.NODE_ENV} and listening on PORT ${PORT}`
      .blue
  );
});

app.get('/', (req, res) => {
  httpLogger.info(`HTTP ${req.method} ${req.url}`);
  res.send('API is running...');
});

app.use('/api/models', modelRoutes);

app.use('/api/auth', loginRoutes);
