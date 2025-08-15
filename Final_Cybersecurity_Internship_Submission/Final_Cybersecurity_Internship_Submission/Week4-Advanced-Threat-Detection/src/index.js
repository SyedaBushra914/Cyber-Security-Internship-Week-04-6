
import express from "express";
import helmet from "helmet";
import cors from "cors";
import rateLimit from "express-rate-limit";
import dotenv from "dotenv";
import apiKey from "./middleware/apiKey.js";
dotenv.config();
const app = express();
app.use(helmet());
app.use(helmet.hsts({ maxAge: 31536000, includeSubDomains: true }));
app.use(helmet.contentSecurityPolicy({ directives: { defaultSrc: ["'self'"], scriptSrc: ["'self'"], objectSrc: ["'none'"] } }));
app.use(cors({ origin: [process.env.ALLOWED_ORIGIN || 'http://localhost:3000'] }));
app.use(express.json());
const limiter = rateLimit({ windowMs: 15*60*1000, max: 100 });
app.use('/api', limiter, apiKey);
app.get('/api/hello', (req,res)=>res.json({ok:true,message:'Protected OK'}));
app.listen(process.env.PORT||4000, ()=>console.log('Week4 server running'));
