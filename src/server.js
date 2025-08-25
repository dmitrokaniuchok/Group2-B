import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import cookieParser from 'cookie-parser';

import { initMongoConnection } from './db/initMongoConnection.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import recipesRouter from './routers/recipes.js';
import router from './routers/index.js';
import ingredientsRoutes from './routers/ingredients.js';
import categoriesRoutes from './routers/categories.js';

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
  router.use('/recipes', recipesRouter);
  router.use("/ingredients", ingredientsRoutes);
  router.use("/categories",categoriesRoutes);

  app.use(notFoundHandler);

  app.listen(PORT, (error) => {
    if (error) throw error;
    console.log(`Server started on port ${PORT}`);
  });
}
