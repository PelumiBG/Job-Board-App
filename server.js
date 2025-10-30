import express from "express";
import dotenv from "dotenv";
import { connectDatabase } from "./config/db.js";
// import userRoutes from "./routes/user.route.js";


dotenv.config();
connectDatabase();

const app = express();
app.use(express.json());

// app.use("/api/users", userRoutes);



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => connectDatabase(),
console.log(`Server running on port ${PORT}`));