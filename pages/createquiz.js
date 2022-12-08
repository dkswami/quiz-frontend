import { useState } from 'react'
import { useRouter } from 'next/router';
import axios from 'axios';
import CreateQuestion from '../components/create-question';

const defaultQuizData = {
	title: "",
	description: "",
	difficultyLevel: 5,
	questions: [],
};

const CreateQuiz = () => {
	const [quizData, setQuizData] = useState(defaultQuizData);
	const { title, description, questions } = quizData;
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
					[...Array(10)].map((_, i) => {
						return (
							<CreateQuestion key={i} questionNo={i} handleAddQuestion={(questionToAdd, quesNo) => handleAddQuestion(questionToAdd, quesNo)} />
						)
					})
				}
				<button type="submit" className="btn btn-primary center-block">Submit</button>
			</form>
		</>
	)
}

export default CreateQuiz;