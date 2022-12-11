import { useState } from 'react'
import { useRouter } from 'next/router';
import axios from 'axios';
<<<<<<< Updated upstream:pages/createquiz.js
import CreateQuestion from '../components/create-question';
=======
import CreateQuestion from '../../components/create-question';
import { UserContext } from '../../contexts/user.context';
import CreateStyles from '../../styles/CreateQuiz.module.css';
import Select from 'react-select';

>>>>>>> Stashed changes:pages/users/createquiz.js

const defaultQuizData = {
	title: "",
	description: "",
	difficultyLevel: 5,
	questions: [],
};

<<<<<<< Updated upstream:pages/createquiz.js
const CreateQuiz = () => {
=======
const defaultQuestionData = {
	question: "",
	questionType: "", //SCA: single correct answer, MCA: multiple correct answer
	difficulty: 5,
	correctAnswers: [],
	answers: ["", "", "", ""],
}

const difficultyOptions = [
	{ value: 1, label: '1', isDisabled: false },
	{ value: 2, label: '2', isDisabled: false },
	{ value: 3, label: '3', isDisabled: false},
	{ value: 4, label: '4', isDisabled: false},
	{ value: 5, label: '5', isDisabled: false },
	{ value: 6, label: '6', isDisabled: false },
	{ value: 7, label: '7', isDisabled: false },
	{ value: 8, label: '8', isDisabled: false },
	{ value: 9, label: '9', isDisabled: false },
	{ value: 10, label: '10', isDisabled: false }
]

const CreateQuiz = ({ token_data }) => {
>>>>>>> Stashed changes:pages/users/createquiz.js
	const [quizData, setQuizData] = useState(defaultQuizData);
	const { title, description, questions } = quizData;

	const [questionData, setQuestionData] = useState(defaultQuestionData)
	const { question, questionType, difficulty, correctAnswers, answers } = questionData;

	const { setToken } = useContext(UserContext);

	const router = useRouter();

	const handleChange = (event) => {
		const { name, value } = event.target;
		setQuizData({ ...quizData, [name]: value });
	}

	const handleAddQuestion = (questionToAdd, questionNo) => {
		// console.log(questionToAdd, questionNo)
		questions[questionNo] = questionToAdd;
		setQuizData({ ...quizData, questions: [...questions] })
	}

	const handleSubmit = async (event) => {
		event.preventDefault();
		const token = localStorage.getItem('token')
		const config = {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}
		try {
			const response = await axios.post('http://localhost:4000/api/v1/quiz', quizData, config);
			console.log(response)
			if (response.data._id) {
				alert("Quiz created successfully");
				// router.push({
				// 	pathname: '/attemptQuiz/[qid]',
				// 	query: { qid: response.data._id },
				// })
				router.push('/allquiz')
			}
		} catch (error) {
			console.log(error)
		}
	}

<<<<<<< Updated upstream:pages/createquiz.js
=======
	const handleQuesChange = (event, questionNo) => {
		const { name, value } = event.target;
		const newQuestionData = { ...questionData, [name]: value };
		setQuestionData(newQuestionData);
		handleAddQuestion(newQuestionData, questionNo);
	}

	const handleDifficultyChange = (event) => {
		console.log(event)
	}

	useEffect(() => {
		setToken(token_data);
	}, [])

>>>>>>> Stashed changes:pages/users/createquiz.js
	console.log(quizData);

	return (
		<>
			<h2>Create a Quiz for user</h2>
			<form onSubmit={handleSubmit}>
				<div className="form-group">
					<label htmlFor="title">Quiz Title :</label>
					<input type="text" className="form-control" id="title" placeholder="Title" name='title' value={title} onChange={handleChange} required />
				</div>
				<div className="form-group">
					<label htmlFor="description">Quiz Description :</label>
					<input type="text" className="form-control" id="description" placeholder="Enter Description" name='description' value={description} onChange={handleChange} required />
				</div>
				<p>As mentioned in the mail there will be 10 question and the quiz will have total 50 marks</p>
				{
					[...Array(10)].map((_, questionNo) => {
						return (
							// <CreateQuestion key={i} questionNo={i} handleAddQuestion={(questionToAdd, quesNo) => handleAddQuestion(questionToAdd, quesNo)} />
							<div className={CreateStyles.questionContainer} key={questionNo}>
								<h3>Question {questionNo + 1} :</h3>
								<div className={CreateStyles.questionItem}>
									<label htmlFor="question">Question :</label>
									<input type="text" id='question' placeholder="Enter Question" name='question' value={questions[questionNo].question} onChange={(event) => handleQuesChange(event, questionNo)} required />
								</div>
								<div className={CreateStyles.questionItem}>
									<label htmlFor="difficulty">Difficulty :</label>
									{/* <input type="number" min={1} max={10} id='difficulty' name='difficulty' value={difficulty} onChange={handleChange} required /> */}
									<Select options={difficultyOptions} onChange={handleDifficultyChange} />
								</div>
								<div className={CreateStyles.questionItem}>
									<label htmlFor="sel1">Question Type :</label>
									<select className="form-control" id="sel1" name='questionType' onChange={(event) => handleQuesChange(event, questionNo)} required>
										<option value="SCA"> Single Correct Answer</option>
										<option value="MCA"> Multiple Correct Answer</option>
									</select>
								</div>
								{/* <div className={CreateStyles.questionItem}>
									<span htmlFor="options">Options :</span>
									<ol >
										{answers.map((answer, index) => {
											return (
												<li key={index}>
													<input type="text" placeholder="Enter Option" name={`option${index}${questionNo}`} value={answer} onChange={(event) => handleOptionsChange(event, index)} />
												</li>
											)
										})}
									</ol>
									{questionType === "MCA" ? (
										<ol>
											{answers.map((answer, index) => {
												return (
													<li key={`${questionNo}${index}`}>
														<input type="checkbox" name="multipleOptions" value={answer} onChange={handleMultipleAnswersChange} />
														<label htmlFor="multipleOptions">   Is Correct</label>
													</li>
												)
											})}
										</ol>) : (
										<ol>
											{answers.map((answer, index) => {
												return (
													<li key={`${questionNo}${index}`}>
														<input type="radio" name={`singleOption${questionNo}`} value={answer} onChange={handleSingleAnswerChange} />
														<label htmlFor={`singleOption${questionNo}`} >   Is Correct</label>
													</li>
												)
											})}
										</ol>
									)}

								</div> */}
							</div>
						)
					})
				}
				<button type="submit" className="btn btn-primary center-block">Submit</button>
			</form>
		</>
	)
}

export default CreateQuiz;