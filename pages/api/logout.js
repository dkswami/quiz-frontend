import cookie from 'cookie';

export default function logoutHandler(req, res) {
	res.setHeader('Set-Cookie', cookie.serialize('token', '', {
		httpOnly: true,
		secure: process.env.NODE_ENV,
		expires: new Date(0),
		sameSite: 'strict',
		path: '/',
	}));
	res.status(200).json({ message: 'Success' });
};
