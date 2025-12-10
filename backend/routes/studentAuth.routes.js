import express from "express"
import { registerStudent } from "../controllers/studentAuth.controller.js"

const router = express.Router();

router.post("/signup",registerStudent)

export default router