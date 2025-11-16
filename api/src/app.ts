import express from 'express';
import { corsMiddleWare } from './middlewares/cors';
import router from './routes';

const app = express();
const PORT = process.env.PORT || 1234;
app.use(express.json());
app.use(corsMiddleWare());
app.disable('x-powered-by');

app.get('/', (req: express.Request, res: express.Response) => {
  res.json({ message: '🚀 API VetCare funcionando correctamente' });
});

app.use('/api/v1', router);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
