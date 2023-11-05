import { handler } from './build/handler.js';
import express from 'express';
import 'dotenv/config';
import { auth } from 'express-oauth2-jwt-bearer';
const authConfig = {
	domain: 'auth.adgtokyo.com',
	clientId: 'dtdLrLj3VwLbHmgHA6lEWJEFVoPRQOUg',
	audience: 'https://adgtokyo.com'
};
// create the JWT middleware

const app = express();

const checkJwt = auth({
	audience: authConfig.audience,
	issuerBaseURL: `https://${authConfig.domain}`
});
// add a route that lives separately from the SvelteKit app
app.get('/healthcheck', (req, res) => {
	res.end('ok');
});

// ..

app.get('/app/external', checkJwt, (req, res) => {
	console.log('getting here');
	res.send({
		msg: 'Your access token was successfully validated!'
	});
});
//user handler for post request
app.post('/api/History', handler);
app.post('/api/User', handler);
app.put('/api/*', checkJwt, handler);

// let SvelteKit handle everything else, including serving prerendered pages and static assets
app.use(handler);
app.use(function (err, req, res, next) {
	if (err.name === 'UnauthorizedError') {
		return res.status(401).send({ msg: 'Invalid token' });
	}

	next(err, req, res);
});

app.listen(process.env.RUN_APP_PORT, () => {
	console.log('listening on port ' + process.env.RUN_APP_PORT);
});
