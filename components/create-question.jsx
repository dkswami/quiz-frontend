import React from 'react'
import Loginstyles from '../styles/Login.module.css';

const defaultQuestionData = {
	question: "",
	answer: "",
	questionType: "",
	difficulty: 3,
	options: {
		option1: "",
		option2: "",
		option3: "",
		option4: ""
	}
}

const CreateQuestion = ({handleAddQuestion, questionNo}) => {
	const [questionData, setQuestionData] = React.useState(defaultQuestionData)
	const { question, answer, questionType, difficulty, options } = questionData;

	const handleChange = (event) => {
		const { name, value } = event.target;
		const newQuestionData = { ...questionData, [name]: value };
		setQuestionData(newQuestionData);
		handleAddQuestion(newQuestionData, questionNo);
	}

	const handleOptionsChange = (event) => {
		const { name, value } = event.target;
		const newQuestionData = { ...questionData, options: { ...options, [name]: value } };
		setQuestionData(newQuestionData);
		handleAddQuestion(newQuestionData, questionNo);
	}

	return (
		<div className={Loginstyles.createQuestionContainer}>
			<div className={Loginstyles.createQuestion}>
				<label htmlFor="question">Question</label>
				<input type="text" placeholder="Enter Question" name='question' value={question} onChange={handleChange} />
			</div>
			<div className={Loginstyles.createQuestion}>
				<label htmlFor="answer">Answer</label>
				<input type="text" placeholder="Enter Answer" name='answer' value={answer} onChange={handleChange} />
			</div>
			<div className={Loginstyles.createQuestion}>
				<label htmlFor="questionType">Question Type</label>
				<input type="text" placeholder="Enter Question Type" name='questionType' value={questionType} onChange={handleChange} />
			</div>
			<div className={Loginstyles.createQuestion}>
				<label htmlFor="difficulty">Difficulty</label>
				<input type="number" placeholder="Default is 3" name='difficulty' value={difficulty} onChange={handleChange} />
			</div>
			<ol >
				<label htmlFor='options'>Options : </label>
				<li>
					<input type="text" placeholder="Enter Options" name='option1' value={options.option1} onChange={handleOptionsChange} />
				</li>
				<li>
					<input type="text" placeholder="Enter Options" name='option2' value={options.option2} onChange={handleOptionsChange} />
				</li>
				<li>
					<input type="text" placeholder="Enter Options" name='option3' value={options.option3} onChange={handleOptionsChange} />
				</li>
				<li>
					<input type="text" placeholder="Enter Options" name='option4' value={options.option4} onChange={handleOptionsChange} />
				</li>
			</ol>
		</div>
	)
}

export default CreateQuestion;