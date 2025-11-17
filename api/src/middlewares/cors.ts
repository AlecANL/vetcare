import cors from 'cors';

const ACCEPTED_ORIGINS = [
  'http://localhost:3000',
  'http://localhost:1234',
  'http://127.0.0.1:5500',
  'http://localhost:4200',
  'https://vetcareapi-production.up.railway.app',
];

export const corsMiddleWare = ({ acceptedOrigin = ACCEPTED_ORIGINS } = {}) =>
  cors({
    origin: (origin, callback) => {
      if (acceptedOrigin.includes(origin ?? '')) {
        return callback(null, true);
      }

      if (!origin) {
        return callback(null, true);
      }

      callback(new Error('Not allowed by CORS'));
    },
  });
