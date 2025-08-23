import { setupServer } from './server.js';
import { initMongoConnection } from './db/initMongoConnection.js';
import dotenv from 'dotenv';

dotenv.config();

async function bootstrap() {
  await initMongoConnection();
  setupServer();
}

bootstrap();
