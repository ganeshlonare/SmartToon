import dotenv from "dotenv";
dotenv.config();
import express from "express";
const app=express();
import userRoutes from './router/user.routes.js';
import database from './config/databaseConfig.js';
database();



app.use('/api/v1/user',userRoutes);


export default app;