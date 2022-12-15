import { NextResponse } from "next/server";
import jwt from '@tsndr/cloudflare-worker-jwt'

export default function middleware(req) {
	const url = req.url

	let token = req.cookies.get("token");
	if (token) {
		const { value } = token;
		const { payload } = jwt.decode(value);
		const userRole = payload.user.role;

		if (url.includes("/createquiz")) {
			if (userRole === "admin") {
				return NextResponse.next();
			} else {
				return NextResponse.redirect(new URL('/users/allquiz', url))
			}
		}
		else if (url.includes("/allquiz")) {
			return NextResponse.next();
		}
	} else {
		return NextResponse.redirect(new URL('/login', url))
	}
}

export const config = {
	matcher: ['/users/:path*']
}