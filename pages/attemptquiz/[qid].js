import { useEffect, useState } from 'react'
import axios from 'axios';
import { useRouter } from 'next/router'
import quizStyles from '../../styles/Attemptquiz.module.css';

function AttemptQuiz() {
	const [quizData, setQuizData] = useState({});
	const [currentQues, setCurrentQues] = useState(0);
	const { title, description, difficulty, questions } = quizData;
	const router = useRouter()
	const quizId = router.query.qid;

	const handleNextClick = () => {
		setCurrentQues(currentQues + 1);		
	}

	if (questions) console.log(questions[0])
	useEffect(() => {
		const getOneQuiz = async () => {
			const token = localStorage.getItem('token')
			const config = {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
			try {
				const response = await axios.get(`http://localhost:4000/api/v1/quiz/${quizId}`, config);
				setQuizData(response.data);
				if(response.data.statusCode === 401) {
					router.push('/login');
				}
			} catch (error) {
				console.log(error)
			}
		}
		getOneQuiz();
	}, [quizId])
	console.log(quizData);

	return (
		<>
			{questions && Object.keys(questions).map((key) => {
				// console.log(questions[key])
			})}
			<h2>{title}</h2>
			<p>{description}</p>
			{ (questions && quizData.questions.question1) &&
				<div className={quizStyles.quizContainer} id="quiz">
					<div className={quizStyles.quizHeader}>
						<h2 id="question">{questions.question1}</h2>
						<ul>
							<li>
								<input type="radio" name="answer" id="a"/>
								<label htmlFor="a" id="a_text">{questions.question1.options1}</label>
							</li>
							<li>
								<input type="radio" name="answer" id="b" />
								<label htmlFor="b" id="b_text">{questions.question1.options2}</label>
							</li>
							<li>
								<input type="radio" name="answer" id="c" />
								<label htmlFor="c" id="c_text">{questions.question1.options3}</label>
							</li>
							<li>
								<input type="radio" name="answer" id="d" />
								<label htmlFor="d" id="d_text">{questions.question1.options4}</label>
							</li>
						</ul>
					</div>
					<button onClick={handleNextClick}>Next</button>
				</div>}


		</>
	)
}

export default AttemptQuiz