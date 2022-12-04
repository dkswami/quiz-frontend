import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useRouter } from 'next/router'
import Loginstyles from '../styles/Login.module.css';


const Quiz = () => {
	const [allQuizData, setAllQuizData] = useState([]);
	const router = useRouter()

	useEffect(() => {
		const getAllQuiz = async () => {
			const token = localStorage.getItem('token')
			const config = {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
			try {
				const response = await axios.get('http://localhost:4000/api/v1/quiz', config);
				setAllQuizData(response.data);
			} catch (error) {
				console.log(error)
			}
		}
		getAllQuiz();

	}, [])
	console.log(allQuizData);

	return (
		<div>
			{allQuizData.map((quiz) => {
				return (
					<div key={quiz._id}>
						<h2>{quiz.title}</h2>
						<div className={Loginstyles.allquizLink} onClick={() =>{
							router.push({
								pathname: '/attemptquiz/[qid]',
								query: { qid: quiz._id },
							     })
						}}>
							<span>Unique link for this quiz :</span>
							<span>{`http://localhost:3000/attemptquiz/${quiz._id}`}</span>
						</div>
						<p>{quiz.description}</p>
					</div>
				)
			})}
		</div>
	)
}

export default Quiz;