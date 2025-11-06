import express from 'express';
import dotenv from 'dotenv';
import { connectDatabase } from './config/db.js';
import { errorHandler } from './middlewares/errorHandler.js';
import apiRoutes from './routes/candidateRoute.js';
import adminRoutes from './routes/adminRoute.js';
import employerRoute from './routes/jobRoute.js';
import applicationRoute from './routes/applicationRoute.js';

dotenv.config();
await connectDatabase();

const app = express();

app.use(express.json());

// default entry
app.get('/', (req, res) => res.send({ ok: true, message: 'WELCOME TO JOB PORTAL.....' }));

// Routes
app.use('/api/candidate', apiRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/employer', employerRoute);
app.use('/api/application', applicationRoute);

// Error handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
console.log(`Server running on port ${PORT}`));