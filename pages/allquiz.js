import { useEffect, useState, useContext } from 'react'
import axios from 'axios';
import { useRouter } from 'next/router'
<<<<<<< Updated upstream:pages/allquiz.js
import Loginstyles from '../styles/Login.module.css';
=======
import Loginstyles from '../../styles/Login.module.css';
import { UserContext } from '../../contexts/user.context';

>>>>>>> Stashed changes:pages/users/allquiz.js


const Quiz = () => {
	const [allQuizData, setAllQuizData] = useState([]);
	const { setToken } = useContext(UserContext);

	const router = useRouter()

	useEffect(() => {
		setToken(token_data);
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
				if(error.message === "Network Error") {
					alert("Network Error")
				}
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

export default Quiz;