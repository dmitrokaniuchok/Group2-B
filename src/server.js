import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import cookieParser from 'cookie-parser';

import { initMongoConnection } from './db/initMongoConnection.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import recipesRouter from './routers/recipes.js';

import swaggerUi from 'swagger-ui-express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const PORT = process.env.PORT || 5000;

export async function setupServer() {
  const app = express();

  // Підключення до MongoDB
  await initMongoConnection();

  // Middleware
  app.use(cors());
  app.use(pino());
  app.use(express.json());
  app.use(cookieParser());

  // Swagger
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const swaggerPath = path.join(__dirname, '../docs/swagger.json');
  if (fs.existsSync(swaggerPath)) {
    const swaggerDocument = JSON.parse(fs.readFileSync(swaggerPath, 'utf-8'));
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  }

  // Тестові маршрути
  app.get('/', (req, res) => {
    res.send('Server is working!');
  });

  app.use('/recipes', recipesRouter);

  // Хендлери
  app.use(notFoundHandler);

  app.listen(PORT, (error) => {
    if (error) throw error;
    console.log(`Server started on port ${PORT}`);
  });
}
