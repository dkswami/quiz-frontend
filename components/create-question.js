import { useState } from 'react';
import CreateStyles from '../styles/CreateQuiz.module.css';

const defaultQuestionData = {
	question: "",
	questionType: "", //SCA: single correct answer, MCA: multiple correct answer
	difficulty: 5,
	correctAnswers: [],
	answers: ["", "", "", ""],
}

const CreateQuestion = ({ handleAddQuestion, questionNo }) => {
	const [questionData, setQuestionData] = useState(defaultQuestionData)
	const { question, questionType, difficulty, correctAnswers, answers } = questionData;

	const handleChange = (event) => {
		const { name, value } = event.target;
		const newQuestionData = { ...questionData, [name]: value };
		setQuestionData(newQuestionData);
		handleAddQuestion(newQuestionData, questionNo);
	}

	const handleOptionsChange = (event, index) => {
		answers[index] = event.target.value;
		const newQuestionData = { ...questionData, answers: answers }
		setQuestionData(newQuestionData);
		handleAddQuestion(newQuestionData, questionNo);
	}

	const handleMultipleAnswersChange = (event, index) => {
		const { value, checked } = event.target;
		if (checked) {
			const newQuestionData = { ...questionData, correctAnswers: [...correctAnswers, value] }
			setQuestionData(newQuestionData)
			handleAddQuestion(newQuestionData, questionNo);
		} else {
			const index = correctAnswers.indexOf(value);
			correctAnswers.splice(index, 1);
			const newQuestionData = { ...questionData, correctAnswers: correctAnswers }
			setQuestionData(newQuestionData);
			handleAddQuestion(newQuestionData, questionNo);
		}
	}

	const handleSingleAnswerChange = (event) => {
		const newQuestionData = { ...questionData, correctAnswers: [event.target.value] }
		setQuestionData(newQuestionData);
		handleAddQuestion(newQuestionData, questionNo);
	}

	return (
		<>

			<div className={CreateStyles.questionContainer}>
				<h3>Question {questionNo + 1} :</h3>
				<div className={CreateStyles.questionItem}>
					<label htmlFor="question">Question :</label>
					<input type="text" id='question' placeholder="Enter Question" name='question' value={question} onChange={handleChange} required/>
				</div>
				<div className={CreateStyles.questionItem}>
					<label htmlFor="difficulty">Difficulty :</label>
					<input type="number" min={1} max={10} id='difficulty' name='difficulty' value={difficulty} onChange={handleChange} required/>
				</div>
				<div className={CreateStyles.questionItem}>
					<label htmlFor="sel1">Question Type :</label>
					<select className="form-control" id="sel1" name='questionType' onChange={handleChange} required>
						<option value="">-- Select --</option>
						<option value="SCA"> Single Correct Answer</option>
						<option value="MCA"> Multiple Correct Answer</option>
					</select>
				</div>
				<div className={CreateStyles.questionItem}>
					<label htmlFor="options">Options :</label>
					<ol >
						{answers.map((answer, index) => {
							return (
								<li key={index}>
									<input type="text" placeholder="Enter Option" value={questionData.answers[index]} onChange={(event) => handleOptionsChange(event, index)} />
								</li>
							)
						})}
					</ol>
					{questionType === "MCA" ? (
						<ol>
							{answers.map((answer, index) => {
								return (
									<li key={index}>
										<input type="checkbox" name="multipleOptions" value={answer} onChange={handleMultipleAnswersChange} />
										<label htmlFor="multipleOptions">   Is Correct</label>
									</li>
								)
							})}
						</ol>) : (
						<ol>
							{answers.map((answer, index) => {
								return (
									<li key={index}>
										<input type="radio" name="singleOption" value={answer} onChange={handleSingleAnswerChange} />
										<label htmlFor="singleOption">   Is Correct</label>
									</li>
								)
							})}
						</ol>
					)}

				</div>
			</div>
		</>
	)
}

export default CreateQuestion;