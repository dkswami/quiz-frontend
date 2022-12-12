import { createContext, useEffect, useState } from "react";
import jwt_decode from "jwt-decode";

export const UserContext = createContext({
	currentUser: null,
	setCurrentUser: () => { },
	isLoggedIn: false,
	setIsLoggedIn: () => { },
	token: null,
});

export const UserProvider = ({ children }) => {
	const [currentUser, setCurrentUser] = useState({});
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [token, setToken] = useState(null);

	useEffect(() => {
		if(token) {
			const decoded = jwt_decode(token);
			setCurrentUser(decoded.user)
			setIsLoggedIn(true);
		}
	}, [token]);
	console.log(currentUser)
	return (
		<UserContext.Provider value={{ currentUser, setCurrentUser, token, setToken, isLoggedIn, setIsLoggedIn }}>
			{children}
		</UserContext.Provider>
	);
}