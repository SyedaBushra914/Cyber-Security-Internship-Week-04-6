
import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import csrf from 'csurf';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
let db;
(async ()=>{ db = await open({ filename: ':memory:', driver: sqlite3.Database }); await db.exec('CREATE TABLE users(id INTEGER PRIMARY KEY, username TEXT, password TEXT)'); await db.run("INSERT INTO users(username,password) VALUES('alice','password1'),('bob','secret')") })();
app.get('/vulnerable', async (req,res)=>{ const q = req.query.q || ''; const sql = "SELECT id, username FROM users WHERE username LIKE '%" + q + "%'"; const rows = await db.all(sql); res.json({ query: sql, results: rows }); });
app.get('/fixed', async (req,res)=>{ const q = req.query.q || ''; const rows = await db.all('SELECT id, username FROM users WHERE username LIKE ?', ['%'+q+'%']); res.json({ results: rows }); });
const csrfProtection = csrf({ cookie: true });
app.get('/form', csrfProtection, (req,res)=>res.json({ csrfToken: req.csrfToken() }));
app.post('/submit', csrfProtection, (req,res)=>res.json({ ok:true }));
app.listen(process.env.PORT||4100, ()=>console.log('Week5 app running'));
