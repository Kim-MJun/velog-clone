import 'express-async-errors'; // 최상단에 import
import express from 'express';
import cors from 'cors';
import { env } from './config/env';
import { setupSwagger } from './config/swagger';
import { errorHandler } from './middlewares/error.middleware';

const app = express();

// 미들웨어
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Swagger 설정
setupSwagger(app);

// Health check
app.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString(),
  });
});

// TODO: 라우트 추가 예정
// app.use('/api/auth', authRoutes);
// app.use('/api/posts', postRoutes);
// app.use('/api/users', userRoutes);

// 404 에러 핸들링
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    error: {
      code: 'NOT_FOUND',
      message: 'Route not found',
    },
  });
});

// 에러 핸들링 미들웨어 (가장 마지막)
app.use(errorHandler);

// 서버 시작
app.listen(env.PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${env.PORT}`);
  console.log(`📚 Swagger docs: http://localhost:${env.PORT}/api-docs`);
});