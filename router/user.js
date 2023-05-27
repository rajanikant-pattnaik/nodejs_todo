import express from "express";
import { user } from "../models/user.js";
import { getAllUser, getUserDetails, login, logout, register } from "../controller/user.js";
import { isAuthentcated } from "../middleware/auth.js";



const router=express.Router();

router.get('/users/all',getAllUser)

router.post('/users/new',register)
router.post('/users/login',login)
router.get('/users/logout',logout)

router.get('/user/details',isAuthentcated,getUserDetails)

export default router;