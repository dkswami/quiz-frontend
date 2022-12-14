import { useState, useContext, useEffect } from 'react'
import { useRouter } from 'next/router';
import axios from 'axios';
import CreateQuestion from '../../components/create-question';
import { UserContext } from '../../contexts/user.context';
const BACKEND_API_ENDPOINT = process.env.NEXT_PUBLIC_BACKEND_API

const defaultQuizData = {
	title: "",
	description: "",
	difficultyLevel: 5,
	questions: [],
};

const defaultQuestionData = {
	question: "",
	questionType: "SCA", //SCA: single correct answer, MCA: multiple correct answer
	difficulty: 5,
	correctAnswers: [],
	answers: ["", "", "", ""],
}

const CreateQuiz = ({ token_data }) => {
	const { setToken } = useContext(UserContext);

	const [quizData, setQuizData] = useState(defaultQuizData);
	const { title, description, questions } = quizData;

	const router = useRouter();

	const handleChange = (event) => {
		const { name, value } = event.target;
		setQuizData({ ...quizData, [name]: value });
	}

	const handleAddQuestion = (questionToAdd, questionNo) => {
		questions[questionNo] = questionToAdd;
		setQuizData({ ...quizData, questions: [...questions] })
	}
	
	const handleSubmit = async () => {
		const config = {
			headers: {
				Authorization: `Bearer ${token_data}`,
			},
		}
		try {
			const response = await axios.post(`${BACKEND_API_ENDPOINT }/api/v1/quiz`, quizData, config);
			console.log(response)
			if (response.data._id) {
				alert("Quiz created successfully");
				router.push('/users/allquiz')
			}
		} catch (error) {
			console.log(error)
		}
	}

	useEffect(() => {
		setToken(token_data);
	}, [])

	return (
		<>
			<h2>Create a Quiz for user</h2>
			<div >
				<div className="form-group">
					<label htmlFor="title">Quiz Title :</label>
					<input type="text" className="form-control" id="title" placeholder="Title" name='title' value={title} onChange={handleChange} required />
				</div>
				<div className="form-group">
					<label htmlFor="description">Quiz Description :</label>
					<input type="text" className="form-control" id="description" placeholder="Enter Description" name='description' value={description} onChange={handleChange} required />
				</div>
				<p>As mentioned in the mail there will be 10 question and the quiz will have total 50 marks</p>
				<CreateQuestion handleAddQuestion={handleAddQuestion} defaultQuestionData={defaultQuestionData} handleSubmit={handleSubmit} />			
			</div>
		</>
	)
}

export function getServerSideProps({ req, res }) {
	return { props: { token_data: req.cookies.cookieToken || "" } };
}

export default CreateQuiz;