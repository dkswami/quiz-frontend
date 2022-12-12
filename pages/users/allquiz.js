import React, { useEffect, useState, useContext } from 'react'
import axios from 'axios';
import { useRouter } from 'next/router'
import Loginstyles from '../../styles/Login.module.css';
import { UserContext } from '../../contexts/user.context';

const Quiz = ({ token_data }) => {
	const [allQuizData, setAllQuizData] = useState([]);

	const { setToken } = useContext(UserContext);

	const router = useRouter()

	useEffect(() => {
		const getAllQuiz = async () => {
			const config = {
				headers: {
					Authorization: `Bearer ${token_data}`,
				},
			}
			try {
				const response = await axios.get('http://localhost:4000/api/v1/quiz', config);
				setAllQuizData(response.data);
			} catch (error) {
				console.log(error)
				if (error.message === "Network Error") {
					alert("Network Error")
				}
			}
		}
		getAllQuiz();
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
							<a>{`http://localhost:3000/users/attemptquiz/${quiz._id}`}</a>
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