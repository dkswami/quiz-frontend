import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
	return (
		<Html>
			<Head>
			<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css"></link>
			<meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests" />
			</Head>
			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	)
}