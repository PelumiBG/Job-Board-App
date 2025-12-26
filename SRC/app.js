import express from 'express';
import dotenv from 'dotenv';
import { connectDatabase } from './config/db.js';
import { errorHandler } from './middlewares/errorHandler.js';
import candidateRoutes from './routes/candidateRoute.js';
import adminRoutes from './routes/adminRoute.js';
import employerRoute from './routes/jobRoute.js';
import applicationRoute from './routes/applicationRoute.js';
import { registerAdmin } from './controllers/adminController.js';
import {fileURLToPath} from 'url';
import path from 'path';


dotenv.config();
await connectDatabase();
await registerAdmin();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.json());
app.set('view engine','ejs');
app.set('views', path.join(__dirname, 'view'));

// default entry
app.get('/', (req, res) => res.render('app',{ ok: true, message: 'WELCOME TO JOB PORTAL.....' }));

// Routes
app.use('/api/candidate', candidateRoutes); 
app.use('/api/admin', adminRoutes);
app.use('/api/employer', employerRoute);
app.use('/api/application', applicationRoute);

// Error handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => connectDatabase(),
console.log(`Server running on port ${PORT}`));