import cookie from 'cookie';
import axios from 'axios';

export default async function handler(req, res) {
	try {
		const result = await axios.post('http://localhost:4000/api/v1/auth/login', req.body);
		if (result.status === 201) {
			res.setHeader('Set-Cookie', cookie.serialize('token', result.data.token, {
				httpOnly: true,
				secure: process.env.NODE_ENV !== 'development',
				maxAge: 60 * 60,
				sameSite: 'strict',
				path: '/',
			}));
			res.status(200).json({ message: result.data.user })
		}
	}
	catch (err) {
		if (err.response && err.response.status === 400) {
			res.status(200).json({ message: err.response.data.message }) //Invalid credentials
		}
		else {
			res.status(200).json({ message: 'failed to fetch data' })
		}
	}
}