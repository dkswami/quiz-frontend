import Head from 'next/head'
import { useContext, useEffect } from 'react'
import styles from '../styles/Home.module.css'
import { UserContext } from '../contexts/user.context'

export default function Home({ token_data }) {
	const { setToken } = useContext(UserContext);

	useEffect(() => {
		setToken(token_data);
	}, [])

	return (
		<div className={styles.container}>
			<Head>
				<title>Digiaccel Quiz App</title>
				<meta name="description" content="Generated by create next app" />
			</Head>

			<main className={styles.main}>
				<h1 className={styles.title}>
					Welcome to <a href="https://nextjs.org">Next.js!</a>
				</h1>

				<p className={styles.description}>
					Get started by editing{' '}
					<code className={styles.code}>pages/index.js</code>
				</p>
			</main>

			<footer className={styles.footer}>
				<a
					href="https://www.linkedin.com/in/deepak-kumar-swami-030a25136/"
					target="_blank"
					rel="noopener noreferrer"
				>
					Created by{' '}
					<span className={styles.logo}>
						D K Swami
					</span>
				</a>
			</footer>
		</div>
	)
}

export function getServerSideProps({ req, res }) {
	return { props: { token_data : req.cookies.token || "" } };
}