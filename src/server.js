import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import cookieParser from 'cookie-parser';

import { initMongoConnection } from './db/initMongoConnection.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { errorHandler } from './middlewares/errorHandler.js';

import router from './routers/index.js';

const PORT = process.env.PORT || 5000;

export async function setupServer() {
  const app = express();

  await initMongoConnection();

  app.use(cors());
  app.use(pino());
  app.use(express.json());
  app.use(cookieParser());

  // Підключення всіх маршрутів через глобальний роутер
  app.use(router);

  app.use((err, req, res, next) => {
    console.error(err); // в консолі буде реальна помилка
    res.status(err.status || 500).json({
      status: err.status || 500,
      message: err.message || 'Server Error',
    });
  });

  app.use(notFoundHandler);
  app.use(errorHandler);

  app.listen(PORT, (error) => {
    if (error) throw error;
    console.log(`Server started on port ${PORT}`);
  });
}
