import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import router from './app/routes';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import notFound from './app/middlewares/notFound';
const app: Application = express();

// parsers
app.use(express.json());
app.use(cors());

// application routes
app.use('/api', router);

// test api
app.get('/', (req: Request, res: Response) => {
  res.send({
    success: true,
    message: 'Server is running',
  });
});

// global error handler
app.use(globalErrorHandler);

// not found
app.use(notFound);

export default app;
