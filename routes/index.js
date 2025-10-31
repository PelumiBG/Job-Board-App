import express from 'express';
import { candidateRoute } from './candidateRoute';
import employerRoute from './adminRoute.js';

const router = express.Router();

router.use('/api/employer', employerRoute);
router.use('/api/candidate', candidateRoute)

export default router;