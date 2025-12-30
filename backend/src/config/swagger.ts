import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';
import { env } from './env';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Velog Clone API',
      version: '1.0.0',
      description: 'Velog Clone 프로젝트 API 문서',
    },
    servers: [
      {
        url: `http://localhost:${env.PORT}`,
        description: 'Development server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
  apis: ['./src/routes/*.ts'], // 라우트 파일에서 Swagger 주석 읽기
};

const specs = swaggerJsdoc(options);

export const setupSwagger = (app: Express) => {
  // @ts-ignore - swagger-ui-express 타입 정의 문제로 인한 우회
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
  console.log(
    `📚 Swagger docs available at http://localhost:${env.PORT}/api-docs`
  );
};
