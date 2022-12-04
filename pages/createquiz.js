import { useState } from 'react'
import { useRouter } from 'next/router';
import axios from 'axios';
import Loginstyles from '../styles/Login.module.css';
import CreateQuestion from '../components/create-question';

const defaultQuizData = {
	title: "",
	description: "",
	questions: {
		question1: null,
		question2: null,
		question3: null,
		question4: null,
		question5: null,
		question6: null,
		question7: null,
		question8: null,
		question9: null,
		question10: null,
	}
}

const CreateQuiz = () => {
	const [quizData, setQuizData] = useState(defaultQuizData);
	const { title, description, questions } = quizData;
	const router = useRouter();


	const handleChange = (event) => {
		const { name, value } = event.target;
		setQuizData({ ...quizData, [name]: value });
	}

	const handleAddQuestion = (questionToAdd, questionNo) => {
		setQuizData({ ...quizData, questions: { ...questions, [questionNo]: questionToAdd } })
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
			if(response.data._id) {
				alert("Quiz created successfully");
				router.push({
					pathname: '/attemptQuiz/[qid]',
					query: { qid: response.data._id },
				     })
			}
		} catch (error) {
			console.log(error)
		}
	}
	console.log(quizData);

	return (
		<>
			<h2>Create a Quiz for user</h2>
			<form onSubmit={handleSubmit} className={Loginstyles.createQuizContainer}>
				<div className={Loginstyles.createQuestion}>
					<label htmlFor="title">Quiz Title</label>
					<input type="text" placeholder="Title" name='title' value={title} onChange={handleChange} required/>
				</div>
				<div className={Loginstyles.createQuestion}>
					<label htmlFor="description">Quiz Description</label>
					<input type="text" placeholder="Enter Description" name='description' value={description} onChange={handleChange} required/>
				</div>
				<p>As mentioned in the mail there will be 10 question and the quiz will have total 50 marks</p>
				<h3>Question 1:</h3>
				<CreateQuestion questionNo='question1' handleAddQuestion={handleAddQuestion} />
				<h3>Question 2:</h3>
				<CreateQuestion questionNo='question2' handleAddQuestion={handleAddQuestion} />
				<h3>Question 3:</h3>
				<CreateQuestion questionNo='question3' handleAddQuestion={handleAddQuestion} />
				<h3>Question 4:</h3>
				<CreateQuestion questionNo='question4' handleAddQuestion={handleAddQuestion} />
				<h3>Question 5:</h3>
				<CreateQuestion questionNo='question5' handleAddQuestion={handleAddQuestion} />
				<h3>Question 6:</h3>
				<CreateQuestion questionNo='question6' handleAddQuestion={handleAddQuestion} />
				<h3>Question 7:</h3>
				<CreateQuestion questionNo='question7' handleAddQuestion={handleAddQuestion} />
				<h3>Question 8:</h3>
				<CreateQuestion questionNo='question8' handleAddQuestion={handleAddQuestion} />
				<h3>Question 9:</h3>
				<CreateQuestion questionNo='question9' handleAddQuestion={handleAddQuestion} />
				<h3>Question 10:</h3>
				<CreateQuestion questionNo='question10' handleAddQuestion={handleAddQuestion} />
				<button>Create Quiz</button>
			</form>
		</>
	)
}

export default CreateQuiz;