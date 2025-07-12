import express, { Application, Request, Response } from 'express';
import cors from 'cors';

const app: Application = express();

// parsers
app.use(express.json());
app.use(cors());

const test = (req: Request, res: Response) => {
    res.send({ message: 'Product Nexus Server is Running...' });
};

// test route
app.get('/', test);

// application routes
// app.use('/api', router);

// // global error handler
// app.use(globalErrorHandler);

// // not found route
// app.use(notFound);

export default app;
