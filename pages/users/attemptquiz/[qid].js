import { useEffect, useState, useRef, useContext } from 'react'
import axios from 'axios';
import { useRouter } from 'next/router'
import quizStyles from '../../../styles/Attemptquiz.module.css';
import { UserContext } from '../../../contexts/user.context';
const BACKEND_API_ENDPOINT = process.env.NEXT_PUBLIC_BACKEND_API

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

const defaultCheckAnswerData = {
	quizID: "",
	questionID: "",
	currDifficulty: 5,
	currScore: 0,
	currAnswer: "",
}

let currentDifficulty = 5;

function AttemptQuiz({ token_data }) {
	const [quizData, setQuizData] = useState({});
	const { title, description, difficultyLevel, questions } = quizData;

	const [attemptData, setAttemptData] = useState(defaultAttemptData);
	let { userScore, scoreData } = attemptData;

	const [ checkAnswerData, setCheckAnswerData ] = useState(defaultCheckAnswerData);
	const { quizID, questionID, currDifficulty, currAnswer } = checkAnswerData;

	const [currentQues, setCurrentQues] = useState(0);
	const [quesCount, setQuesCount] = useState(1);

	const { currentUser, setToken } = useContext(UserContext);
	
	const config = {
		headers: {
			Authorization: `Bearer ${token_data}`,
		},
	}

	const router = useRouter()
	const quizId = router.query.qid;

	const handleAnswerChange = (event) => {
		setCheckAnswerData({ 
			quizID: quizId,
			questionID: questions[currentQues].id,
			currDifficulty: currentDifficulty,
			currScore: userScore,
			currAnswer: event.target.value
		})
	}

	const submitAttemptData = async () => {
		try {
			const response = await axios.post(`${BACKEND_API_ENDPOINT}/api/v1/attempt`, attemptData, config);
			console.log(response)
			if (response.data._id) {
				alert("Quiz attempted successfully");
				router.push('/users/attempts')
			}
		} catch (error) {
			console.log(error)
		}
	}

	const checkAnswer = async () => {
		try {
			const response = await axios.post(`${BACKEND_API_ENDPOINT}/api/v1/attempt/check`, checkAnswerData, config);
			currentDifficulty = response.data.newDifficulty;
			const newScoreData = [...scoreData, { quesNumber: quesCount, currScore: response.data.newScore }]
			setAttemptData({
				...attemptData,
				userScore: response.data.newScore,
				scoreData: newScoreData
			})
			setCurrentQues(questions.findIndex((ques) => ques.difficulty === response.data.newDifficulty))
			setCheckAnswerData(defaultCheckAnswerData);
			setQuesCount(quesCount + 1);
		} catch (error) {
			console.log(error)
		}
	}

	const handleNextClick = () => {
		if (quesCount > 10 || currentDifficulty >= 10 || currentDifficulty <= 1) {
			submitAttemptData();
		}
		else {
			if (currAnswer !== "") {
				checkAnswer();
			}
			else if (currAnswer === "") {
				alert("Please select an option");
			}
			else {
				alert("Something went wrong")
			}
		}
	}

	useEffect(() => {
		const getOneQuiz = async () => {
			try {
				const response = await axios.get(`${BACKEND_API_ENDPOINT}/api/v1/quiz/${quizId}`, config);
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
		setToken(token_data);
	}, [quizId])

	useEffect(() => {
		if (questions && questions.length > 0) {
			setCurrentQues(questions.findIndex((ques) => ques.difficulty === 5))
		}
		setAttemptData({
			...attemptData,
			quizTitle: title,
			quizDescription: description,
			quizId: quizData.id,
			attemptedBy: currentUser.id
		})
	}, [quizData])

	console.log(attemptData, currAnswer, currentDifficulty, quesCount)

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
	return { props: { token_data: req.cookies.cookieToken || "" } };
}

export default AttemptQuiz