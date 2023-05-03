import express from 'express';
import path from 'path';
import { login } from './login.js';

const PORT = 3000;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set('view engine', 'pug');
app.set('views', path.join(process.cwd(), '/view'));
app.post('/login', login);

// 소스트리 -> 로컬  add existing something
// git push --force

app.get('/', (req, res, next) => {
	res.render('index');
});

app.listen(PORT, (e) => {
	console.log('hello world!', PORT);
});
