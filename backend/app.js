

import express from 'express';
import morgan from 'morgan';
import connect from './db/db.js';
import userRoutes from "./routs/user.routes.js"
import projectRoutes from "./routs/project.routes.js"
import cookieParser from 'cookie-parser';
import  aiRoutes  from './routs/ai.routes.js';

import cors from 'cors';
connect();
const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

app.use('/users',userRoutes);
app.use('/project',projectRoutes);
app.use("/ai",aiRoutes)


export default app;
