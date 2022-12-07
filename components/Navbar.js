import Link from "next/link";
import { useRouter } from "next/router";

export default function Navbar() {
	const router = useRouter();
	const { pathname } = router;
	// const token = localStorage.getItem('token')
	return (
		<>
			<nav className="navbar navbar-inverse">
				<div className="container-fluid">
					<div className="navbar-header">
						<Link className="navbar-brand" href="/">Digiaccel Quiz</Link>
					</div>
					<ul className="nav navbar-nav">
						<li className={pathname === "/allquiz" ? "active" : ""}><Link href="/allquiz">All Quiz</Link></li>
						<li className={pathname === "/createquiz" ? "active" : ""}><Link href="/createquiz">Create Quiz</Link></li>
						<li className={pathname === "/attempts" ? "active" : ""}><Link href="/attempts">Your Attempts</Link></li>
					</ul>
					<ul className="nav navbar-nav navbar-right">
						{/* {
							token ? (<li> Log Out</li>) : (
								<>
								
								</>
							)
						} */}
						<li className={pathname === "/signup" ? "active" : ""}><Link href="/signup"><span className="glyphicon glyphicon-user"></span> Sign Up</Link></li>
						<li className={pathname === "/login" ? "active" : ""}><Link href="/login"><span className="glyphicon glyphicon-log-in"></span> Login</Link></li>
					</ul>
				</div>
			</nav>			
		</>
	)
}
