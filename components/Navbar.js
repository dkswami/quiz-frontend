import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import { UserContext } from "../contexts/user.context";

export default function Navbar() {
	const router = useRouter();
	const { pathname } = router;

	const { currentUser, setCurrentUser, isLoggedIn, setIsLoggedIn } = useContext(UserContext);

	const handleLogoutClick = async () => {
		await fetch("/api/logout", {
			method: "post",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({}),
		}).then((res) => (res.json())).then((data) => {
			if (data.message === "Success") {
				alert(`Logged Out successfully, Please Login to continue`);
				setCurrentUser({});
				setIsLoggedIn(false);
				router.push('/login');
			}
			else {
				alert(`Something went wrong, Please try again`);
			}
		});
	}

	return (
		<>
			<nav className="navbar navbar-inverse">
				<div className="container-fluid">
					<div className="navbar-header">
						<Link className="navbar-brand" href="/">Digiaccel Quiz</Link>
					</div>
					<ul className="nav navbar-nav">
						<li className={pathname === "/users/allquiz" ? "active" : ""}>
							<Link href="/users/allquiz">All Quiz</Link>
						</li>
						{
							currentUser.role === "admin" ? (
								<li className={pathname === "/users/createquiz" ? "active" : ""}>
									<Link href="/users/createquiz">Create Quiz</Link>
								</li>
							) : null
						}

						<li className={pathname === "/users/attempts" ? "active" : ""}>
							<Link href="/users/attempts">Your Attempts</Link>
						</li>
					</ul>
					<ul className="nav navbar-nav navbar-right">
						{
							isLoggedIn ? (
								<li onClick={handleLogoutClick} style={{ cursor: 'pointer' }}>
									<a>
										<span className="glyphicon glyphicon-log-out"></span>
										Log Out
									</a>
								</li>
							) : (
								<>
									<li className={pathname === "/signup" ? "active" : ""}>
										<Link href="/signup">
											<span className="glyphicon glyphicon-user"></span>
											Sign Up
										</Link>
									</li>
									<li className={pathname === "/login" ? "active" : ""}>
										<Link href="/login">
											<span className="glyphicon glyphicon-log-in"></span>
											Log In
										</Link>
									</li>
								</>
							)
						}
					</ul>
				</div>
			</nav>
		</>
	)
}
