
import dotenv from 'dotenv'; dotenv.config();
export default function(req,res,next){
  const key = req.header('x-api-key') || req.query.api_key;
  if(!key || key !== (process.env.API_KEY || 'demo-key')) return res.status(401).json({error:'Invalid API key'});
  next();
}
