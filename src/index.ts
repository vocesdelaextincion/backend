import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes';
import userRoutes from './routes/user.routes';
import recordingRoutes from './routes/recording.routes';
import adminRoutes from './routes/admin.routes';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

// Middleware to parse JSON bodies
app.use(express.json());

// API Routes
app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/recordings', recordingRoutes);
app.use('/admin', adminRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('Voces de la Extinción API is running!');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
