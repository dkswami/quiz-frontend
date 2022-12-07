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
				if (response.data.statusCode === 401) {
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

			<h2>{title}</h2>
			<p>{description}</p>
			{questions && questions.length > 0 && (
				<div className={quizStyles.quizContainer} id="quiz">
					<div className={quizStyles.quizHeader}>
						<div className={quizStyles.quesDetails}>
							<span><b>Question Type : </b>{ questions[currentQues].questionType === "SCA" ? "Single Correct Answer" : "Multiple Correct Answer"}</span>
							<span><b>Difficulty : </b>{questions[currentQues].difficulty}</span>
						</div>
						<h2 id="question">{questions[currentQues].question}</h2>
						<ul>
							<li>
								<input type="radio" name="answer" id="a" />
								<label htmlFor="a" id="a_text">{questions[currentQues].answers[0]}</label>
							</li>
							<li>
								<input type="radio" name="answer" id="b" />
								<label htmlFor="b" id="b_text">{questions[currentQues].answers[1]}</label>
							</li>
							<li>
								<input type="radio" name="answer" id="c" />
								<label htmlFor="c" id="c_text">{questions[currentQues].answers[2]}</label>
							</li>
							<li>
								<input type="radio" name="answer" id="d" />
								<label htmlFor="d" id="d_text">{questions[currentQues].answers[3]}</label>
							</li>
						</ul>
					</div>
					<button onClick={handleNextClick}>Next</button>
				</div>
			)}
		</>
	)
}

export default AttemptQuiz