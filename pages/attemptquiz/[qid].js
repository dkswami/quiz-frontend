import { useEffect, useState, useRef } from 'react'
import axios from 'axios';
import { useRouter } from 'next/router'
import quizStyles from '../../../styles/Attemptquiz.module.css';

const defaultAttemptData = {
	userScore: 0,
	total: 50,
	scoreData: [],
	attempted_by: ""
}

const defaultScoreData = {
	quesNumber: 0,
	currentScore: 0
}

let currentDifficulty = 5;

function AttemptQuiz() {
	const [quizData, setQuizData] = useState({});
	const { title, description, difficultyLevel, questions } = quizData;

	const [attemptData, setAttemptData] = useState(defaultAttemptData);
	let { userScore, scoreData } = attemptData;

	const [currentQues, setCurrentQues] = useState(0);
	const [currentAnswer, setCurrentAnswer] = useState("");
	// const [currentDifficulty, setCurrentDifficulty] = useState(5);

	const router = useRouter()
	const quizId = router.query.qid;

	const goToNextQues = () => {

	}

	const handleNextClick = (event) => {
		if (currentAnswer !== "") {
			if (questions[currentQues].correctAnswers.includes(currentAnswer)) {
				userScore = userScore + 5;
				const newScoreData = [...scoreData, { quesNumber: currentQues + 1, currentScore: userScore }]
				setAttemptData({
					...attemptData,
					userScore: userScore,
					scoreData: newScoreData
				})
				currentDifficulty = currentDifficulty + 1;
				//In case we don't have question with current difficulty +1 level.
				/* while(!questions.includes(ques => ques.difficultyLevel === currentDifficulty)){
					currentDifficulty = currentDifficulty + 1;
				} */
				setCurrentQues(questions.findIndex((ques) => ques.difficulty === currentDifficulty))
				setCurrentAnswer("");
			} else {
				userScore = userScore - 2;
				const newScoreData = [...scoreData, { quesNumber: currentQues + 1, currentScore: userScore }]
				setAttemptData({
					...attemptData,
					userScore: userScore,
					scoreData: newScoreData
				})
				currentDifficulty = currentDifficulty - 1;
				//In case we don't have question with current difficulty +1 level.
				// while(!questions.includes((ques) => ques.difficulty === currentDifficulty)){
				// 	currentDifficulty = currentDifficulty - 1;
				// }
				//console.log(questions.find((ques) => ques.difficulty === currentDifficulty))
				setCurrentQues(questions.findIndex((ques) => ques.difficulty === currentDifficulty))
				setCurrentAnswer("");
			}			
		} 
		else {
			alert("Please select an option");
		}

		if (currentQues === questions.length - 1) {
			alert("Quiz completed")
		}
	}

	const handleAnswerChange = (event) => {
		setCurrentAnswer(event.target.value);
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

			} catch (error) {
				console.log(error)
				if (error.message === "Network Error") {
					alert("Network Error");
				} else if (error.response.status === 401) {
					router.push('/login');
				}
			}
		}
		getOneQuiz();
	}, [quizId])

	useEffect(() => {
		if (quizData.questions && quizData.questions.length > 0) {
			setCurrentQues(quizData.questions.findIndex((ques) => ques.difficulty === 5) || 0)
		}
	}, [quizData])

	console.log(attemptData, currentAnswer, currentDifficulty)

	return (
		<>
			<h2>{title}</h2>
			<p>{description}</p>
			<p><b>Quiz Difficulty Level : </b>{difficultyLevel}</p>
			{questions && questions.length > 0 && (
				<div className={quizStyles.quizContainer} id="quiz">
					<div className={quizStyles.quizHeader}>
						<div className={quizStyles.quesDetails}>
							<span><b>Question Type : </b>{questions[currentQues].questionType === "SCA" ? "Single Correct Answer" : "Multiple Correct Answer"}</span>
							<span><b>Question Difficulty : </b>{questions[currentQues].difficulty}</span>
						</div>
						<h2 id="question">{questions[currentQues].question}</h2>
						<ul>
							{
								questions[currentQues].answers.map((answer, index) => {
									return (
										<li key={`${currentQues}${index}`}>
											<input type="radio" name={`answer${currentQues}`} id={`radioOption${currentQues}${index}`} onChange={handleAnswerChange} value={answer} />
											<label htmlFor={`radioOption${currentQues}${index}`}>{answer}</label>
										</li>
									)
								})
							}
						</ul>
					</div>
					<button onClick={handleNextClick}>Next</button>
				</div>
			)}
		</>
	)
}

export default AttemptQuiz