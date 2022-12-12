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
	currScore: 0
}

let currentDifficulty = 5;

function AttemptQuiz({ token_data }) {
	const [quizData, setQuizData] = useState({});
	const { title, description, difficultyLevel, questions } = quizData;

	const [attemptData, setAttemptData] = useState(defaultAttemptData);
	let { userScore, scoreData } = attemptData;

	const [currentQues, setCurrentQues] = useState(0);
	const [quesCount, setQuesCount] = useState(1);
	const [currentAnswer, setCurrentAnswer] = useState("");

	const { currentUser, setToken } = useContext(UserContext);

	const router = useRouter()
	const quizId = router.query.qid;

	const handleAnswerChange = (event) => {
		setCurrentAnswer(event.target.value);
	}

	const evaluate = (newUserScore, newCurrentDifficulty) => {
		const newScoreData = [...scoreData, { quesNumber: quesCount, currScore: newUserScore }]
		setAttemptData({
			...attemptData,
			userScore: newUserScore,
			scoreData: newScoreData
		})
		setCurrentQues(questions.findIndex((ques) => ques.difficulty === newCurrentDifficulty))
		setCurrentAnswer("");
		setQuesCount(quesCount + 1);
	}

	const submitAttemptData = async () => {
		const config = {
			headers: {
				Authorization: `Bearer ${token_data}`,
			},
		}
		try {
			const response = await axios.post('http://localhost:4000/api/v1/attempt', attemptData, config);
			console.log(response)
			if (response.data._id) {
				alert("Quiz attempted successfully");
				router.push('/users/attempts')
			}
		} catch (error) {
			console.log(error)
		}
	}

	const handleNextClick = () => {
		if (quesCount > 10 || currentDifficulty >= 10 || currentDifficulty <= 1) {
			alert("Quiz completed")
			submitAttemptData();
		}
		else {
			if (currentAnswer !== "") {
				if (questions[currentQues].correctAnswers.includes(currentAnswer)) {
					currentDifficulty = currentDifficulty + 1;
					evaluate(userScore + 5, currentDifficulty);
				} else {
					currentDifficulty = currentDifficulty - 1;
					evaluate(userScore - 2, currentDifficulty);
				}
			}
			else if (currentAnswer === "") {
				alert("Please select an option");
			}
			else {
				alert("Something went wrong")
			}
		}
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

	console.log(attemptData, currentAnswer, currentDifficulty, quesCount)

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