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
					<Link href='/allquiz'>All Quiz</Link>
				</li>
				<li>
					<Link href='/createquiz'>Create Quiz</Link>
				</li>
				<li>
					<Link href='/signup'>signup</Link>
				</li>
				<li>
					<Link href='/login'>login</Link>
				</li>
			</ul>
			<span></span>
		</nav>
	)
}
