import Layout from '../components/Layout'
import { UserProvider } from '../contexts/user.context'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
	return (
		<UserProvider>
			<Layout>
				<Component {...pageProps} />
			</Layout>
		</UserProvider>
	)
}

export default MyApp
