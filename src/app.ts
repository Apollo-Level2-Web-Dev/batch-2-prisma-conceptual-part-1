import express from 'express';
import cors from 'cors';
import { userRoutes } from './app/modules/user/user.routes';
import { NextFunction, Request, Response } from 'express';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/v1/user', userRoutes);

// global error handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
   res.status(500).json({
      success: false,
      message: err.message || 'Something went wrong',
      error: err,
   });
});

app.use((req: Request, res: Response, next: NextFunction) => {
   res.status(404).json({
      success: false,
      message: 'Ooops! it looks like this url does not exist',
      path: req.originalUrl,
   });
});

app.get('/', (req, res) => {
   res.json({
      message: 'Hello prisma',
   });
});

export default app;
