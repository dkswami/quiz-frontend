import { useEffect, useState, useRef, useContext } from 'react'
import axios from 'axios';
import { useRouter } from 'next/router'
import quizStyles from '../../../styles/Attemptquiz.module.css';
import { UserContext } from '../../../contexts/user.context';

const defaultAttemptData = {
	quizTitle: "",
	quizDescription: "",
	quizId: "",
	attemptedBy: "",
	userScore: 0,
	total: 50,
	scoreData: [],
}

const defaultScoreData = {
	quesNumber: 0,
	currentScore: 0
}

let currentDifficulty = 5;

function AttemptQuiz({ token_data }) {
	const [quizData, setQuizData] = useState({});
	const { title, description, difficultyLevel, questions } = quizData;

	const [attemptData, setAttemptData] = useState(defaultAttemptData);
	let { userScore, scoreData } = attemptData;

	const [currentQues, setCurrentQues] = useState(0);
	const [currentAnswer, setCurrentAnswer] = useState("");

	const { currentUser, setToken } = useContext(UserContext);

	const router = useRouter()
	const quizId = router.query.qid;

	const evaluate = (newUserScore, newCurrentDifficulty) => {
		const newScoreData = [...scoreData, { quesNumber: currentQues + 1, currentScore: newUserScore }]
		setAttemptData({
			...attemptData,
			userScore: newUserScore,
			scoreData: newScoreData
		})
		setCurrentQues(questions.findIndex((ques) => ques.difficulty === newCurrentDifficulty))
		setCurrentAnswer("");
	}

	const handleNextClick = () => {		
		if (currentQues === (questions.length - 1) || currentDifficulty === 11 || currentDifficulty === 0) {
			alert("Quiz completed")
		}
		else {
			if (currentAnswer !== "") {
				if (questions[currentQues].correctAnswers.includes(currentAnswer)) {
					evaluate(userScore + 5, currentDifficulty + 1);
				} else {
					evaluate(userScore - 2, currentDifficulty - 1);
				}
			}
			else {
				alert("Please select an option");
			}
		}
	}

	const handleAnswerChange = (event) => {
		setCurrentAnswer(event.target.value);
	}

	useEffect(() => {
		const getOneQuiz = async () => {
			const config = {
				headers: {
					Authorization: `Bearer ${token_data}`,
				},
			}
			try {
				const response = await axios.get(`http://localhost:4000/api/v1/quiz/${quizId}`, config);
				setQuizData(response.data);
				setAttemptData({
					...attemptData,
					quizTitle: response.data.title,
					quizDescription: response.data.description,
					quizId: response.data._id,
					attemptedBy: currentUser.id
				})
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
		setToken(token_data);
	}, [quizId])

	useEffect(() => {
		if (questions && questions.length > 0) {
			setCurrentQues(questions.findIndex((ques) => ques.difficulty === 5))
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

export function getServerSideProps({ req, res }) {
	return { props: { token_data: req.cookies.token || "" } };
}

export default AttemptQuiz