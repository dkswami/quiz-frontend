import cookie from 'cookie';
import axios from 'axios';
const BACKEND_API_ENDPOINT = process.env.NEXT_PUBLIC_BACKEND_API

export default async function handler(req, res) {
	try {
		const result = await axios.post(`${BACKEND_API_ENDPOINT}/api/v1/auth/login`, req.body);
		console.log("from api", result)
		if (result.status === 201) {
			res.setHeader('Set-Cookie', cookie.serialize('token', result.data.token, {
				httpOnly: true,
				secure: false,			// process.env.NODE_ENV,
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