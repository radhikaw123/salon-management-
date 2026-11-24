import { createApp } from './app';
import { env } from './config/env';
import { connectDB } from './config/db';
import { logger } from './utils/logger';

const startServer = async () => {
  await connectDB();

  const app = createApp();

  app.listen(env.PORT, () => {
    logger.info(`🚀 Salon Management Server is running on http://localhost:${env.PORT}`);
  });
};

startServer().catch((err) => {
  logger.error({ err }, 'Failed to start server');
  process.exit(1);
});
