import Link from "next/link";

export default function Navbar() {
	return (
		<>
			<nav className="navbar navbar-inverse">
				<div className="container-fluid">
					<div className="navbar-header">
						<a className="navbar-brand" href="/">WebSiteName</a>
					</div>
					<ul className="nav navbar-nav">
						<li className="active"><Link href="/allquiz">All Quiz</Link></li>
						<li><Link href="/createquiz">Create Quiz</Link></li>
						<li><Link href="/attempts">Your Attempts</Link></li>
					</ul>
					<ul className="nav navbar-nav navbar-right">
						<li><Link href="/signup"><span className="glyphicon glyphicon-user"></span> Sign Up</Link></li>
						<li><Link href="/login"><span className="glyphicon glyphicon-log-in"></span> Login</Link></li>
					</ul>
				</div>
			</nav>			
		</>
	)
}
