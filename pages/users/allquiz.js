import React, { useEffect, useState, useContext } from 'react'
import axios from 'axios';
import { useRouter } from 'next/router'
import Loginstyles from '../../styles/Login.module.css';
import { UserContext } from '../../contexts/user.context';
const BACKEND_API_ENDPOINT = process.env.NEXT_PUBLIC_BACKEND_API
const FRONTEND_URL = process.env.NEXT_PUBLIC_FRONTEND_URL

const Quiz = ({ token_data }) => {
	const [allQuizData, setAllQuizData] = useState([]);

	const { setToken } = useContext(UserContext);
	console.log(token_data)
	
	const router = useRouter()
	console.log(BACKEND_API_ENDPOINT)
	useEffect(() => {
		const getAllQuiz = async () => {
			const config = {
				headers: {
					Authorization: `Bearer ${token_data}`,
				},
			}
			try {
				const response = await axios.get(`${BACKEND_API_ENDPOINT}/api/v1/quiz`, config);
				console.log(response)
				setAllQuizData(response.data);
			} catch (error) {
				console.log(error)
				if (error.message === "Network Error") {
					alert("Network Error")
				}
			}
		}
		getAllQuiz();		
	}, [])

	useEffect(() => {
		setToken(token_data);
	}, [token_data])

	return (
		<div>
			{allQuizData.map((quiz) => {
				return (
					<div key={quiz._id}>
						<h2>{quiz.title}</h2>
						<div className={Loginstyles.allquizLink} onClick={() => {
							router.push({
								pathname: '/users/attemptquiz/[qid]',
								query: { qid: quiz._id },
							})
						}}>
							<span>Unique link for this quiz :</span>
							<a>{`${FRONTEND_URL}/users/attemptquiz/${quiz._id}`}</a>
						</div>
						<p>{quiz.description}</p>
					</div>
				)
			})}
		</div>
	)
}

export function getServerSideProps({ req, res }) {
	return { props: { token_data: req.cookies.token || "" } };
}

export default Quiz;