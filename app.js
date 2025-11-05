import express from 'express';
import dotenv from 'dotenv';
import { connectDatabase } from './config/db.js';
import { errorHandler } from './middlewares/errorHandler.js';
import apiRoutes from './routes/index.js';

dotenv.config();
await connectDatabase();

const app = express();

app.use(express.json());
app.use(morgan('dev'));

app.get('/', (req, res) => res.send({ ok: true, message: 'Job Portal ACTIVE.....' }));

app.use(errorHandler);
app.use('/',apiRoutes)

app.listen(process.env.PORT , () =>{
    console.log(`Server connected at port ${process.env.PORT }`)
})

app.get("/", (req, res) => {
  res.send("Welcome To Job Portal.....");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => connectDatabase(),
console.log(`Server running on port ${PORT}`));