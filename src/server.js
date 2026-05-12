import express from 'express';
import { router } from './routes/index.js';
import { logger } from './middlewares/logger.js';
import { requestTimer } from './middlewares/requestTimer.js';
import { config, isDevelopment, isProduction } from './config/config.js';
import { startChallengeScheduler } from './schedulers/challenges.scheduler.js';

import { errorHandler } from './middlewares/errorHandler.js';
import { disconnectDB } from './db/prisma.js';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import specs from './config/swagger.config.js';

const app = express();

startChallengeScheduler();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const whiteList = config.FRONT_URL
  ? config.FRONT_URL.split(',').map((url) => url.trim())
  : [];

app.use(
  cors({
    origin: isProduction() ? whiteList : true, // 프로덕션은 화이트리스트, 개발은 모두 허용(true)
    credentials: true,
    optionsSuccessStatus: 200,
  }),
);

if (isDevelopment) {
  app.use(logger);
  app.use(requestTimer);

  // Swagger UI 설정
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
}

app.use('/', router);

app.use(errorHandler);
const server = app.listen(config.PORT, () => {
  console.log(`🚀 Server running on http://localhost:${config.PORT}`);
  console.log(`📦 Environment: ${config.ENVIRONMENT}`);
});

const shutdown = (signal) => {
  console.log(`\n${signal} received. Shutting down gracefully...`);
  server.close(async () => {
    console.log('✅ HTTP server closed.');
    await disconnectDB();
    process.exit(0);
  });
};

process.on('SIGINT', () => shutdown('SIGINT'));
process.on('SIGTERM', () => shutdown('SIGTERM'));
