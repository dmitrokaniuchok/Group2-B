import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import cookieParser from 'cookie-parser';
// import path from 'path';

import { initMongoConnection } from './db/initMongoConnection.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { swaggerDocs } from './middlewares/swaggerDocs.js';

import router from './routers/index.js';

const PORT = process.env.PORT || 5000;

export async function setupServer() {
  const app = express();

  await initMongoConnection();

  app.use(
    cors({
      origin: ['http://localhost:5173', 'https://group2-b.onrender.com'],
      credentials: true,
    }),
  );

  app.use(pino());
  app.use(express.json());
  app.use(cookieParser());

  app.use('/api-docs', swaggerDocs());

  // app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

  app.use('/', router);

  app.use(notFoundHandler);
  app.use(errorHandler);

  app.listen(PORT, (error) => {
    if (error) throw error;
    console.log(`Server started on port ${PORT}`);
  });
}
