import express, {
  json,
  urlencoded,
  Response as ExResponse,
  Request as ExRequest,
  NextFunction,
} from 'express';
import swaggerUi from 'swagger-ui-express';
import { RegisterRoutes } from '../build/routes';

export const app = express();

// Use body parser to read sent json payloads
app.use(
  urlencoded({
      extended: true,
  })
);
app.use(json());

export const routes = RegisterRoutes(app);

app.use('/docs', swaggerUi.serve, async (_req: ExRequest, res: ExResponse) => {
  return res.send(
      swaggerUi.generateHTML(await import('../build/swagger.json'))
  );
});

app.use(function notFoundHandler(_req, res: ExResponse) {
  res.status(404).send({
      message: 'Not Found',
  });
});

app.use(function errorHandler(
  err: unknown,
  _req: ExRequest,
  res: ExResponse,
  next: NextFunction
): ExResponse | void {
  console.error(err);
  if (err instanceof Error) {
      return res.status(500).json({
          message: 'Internal Server Error',
      });
  }

  next();
});

export default app;
