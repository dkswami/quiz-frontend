import Link from "next/link";
import navStyles from "../styles/Navbar.module.css";

export default function Navbar() {
	return (
		<nav className={navStyles.nav}>
			<ul>
				<li>
					<Link href='/'>Home</Link>
				</li>
				<li>
					<Link href='/quiz'>Quizs</Link>
				</li>
				<li>
					<Link href='/create-quiz'>Create Quiz</Link>
				</li>
				<li>
					<Link href='/signup'>signup</Link>
				</li>
				<li>
					<Link href='/login'>login</Link>
				</li>
			</ul>
		</nav>
	)
}
