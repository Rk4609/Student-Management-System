import express, { urlencoded } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import studentRoutes from "../routes/student.routes.js";
import studentAuthRoute from "../routes/studentAuth.routes.js"

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(express.json({ limit: "16kb" }));
app.use(urlencoded({extended:true}));
app.use(express.static("public"))
app.use(cookieParser())
app.use("/api/students", studentRoutes);
app.use("/api/auth",studentAuthRoute)

export { app };
