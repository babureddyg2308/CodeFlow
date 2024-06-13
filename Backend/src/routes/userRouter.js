import express from 'express';
import {  login, logout,  signup, userDetails } from '../controller/userController.js';
import { verifyToken } from '../middleware/verifyToken.js';

export const userRouter = express.Router();

userRouter.post("/signup" , signup);
userRouter.post("/login" , login);
userRouter.post("/logout", logout);

userRouter.get("/my-details", verifyToken, userDetails);

