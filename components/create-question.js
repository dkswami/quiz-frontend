import { useState } from 'react';
import Select from 'react-select';
import CreateStyles from '../styles/CreateQuiz.module.css';

const defaultQuestionData = {
	question: "",
	questionType: "", //SCA: single correct answer, MCA: multiple correct answer
	difficulty: 5,
	correctAnswers: [],
	answers: ["", "", "", ""],
}

const CreateQuestion = ({ questionNo, handleAddQuestion }) => {
	const [questionData, setQuestionData] = useState(defaultQuestionData)
	const { question, questionType, difficulty, correctAnswers, answers } = questionData;

	const handleChange = (event) => {
		const { name, value } = event.target;
		const newQuestionData = { ...questionData, [name]: value };
		setQuestionData(newQuestionData);
		handleAddQuestion(newQuestionData, questionNo);
	}

	const handleOptionsChange = (event, index) => {
		anss[index] = event.target.value;
		const newQuestionData = { ...questionData, answers: [ ...anss ] }
		setQuestionData(newQuestionData);
		handleAddQuestion(newQuestionData, questionNo);
	}

	const handleMultipleAnswersChange = (event) => {
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
		const newQuestionData = { ...questionData, correctAnswers: [...event.target.value] }
		setQuestionData(newQuestionData);
		handleAddQuestion(newQuestionData, questionNo);
	}

	const handleDifficultyChange = (event) => {
		console.log(event)
	}

	return (
		<>

			<div className={CreateStyles.questionContainer}>
				<h3>Question {questionNo + 1} :</h3>
				<div className={CreateStyles.questionItem}>
					<label htmlFor="question">Question :</label>
					<input type="text" id='question' placeholder="Enter Question" name='question' value={question} onChange={handleChange} required />
				</div>
				<div className={CreateStyles.questionItem}>
					<label htmlFor="difficulty">Difficulty :</label>
					{/* <input type="number" min={1} max={10} id='difficulty' name='difficulty' value={difficulty} onChange={handleChange} required /> */}
					<Select options={difficultyOptions} onChange={handleDifficultyChange}/>
				</div>
				<div className={CreateStyles.questionItem}>
					<label htmlFor="sel1">Question Type :</label>
					<select className="form-control" id="sel1" name='questionType' onChange={handleChange} required>
						<option value="SCA"> Single Correct Answer</option>
						<option value="MCA"> Multiple Correct Answer</option>
					</select>
				</div>
				<div className={CreateStyles.questionItem}>
					<span htmlFor="options">Options :</span>
					<ol >
						{answers.map((answer, index) => {
							return (
								<li key={index}>
									<input type="text" placeholder="Enter Option"  name={`option${index}${questionNo}`} value={answer} onChange={(event) => handleOptionsChange(event, index)} />
								</li>
							)
						})}
						{/* <li>
							<input type="text"  id={`1${questionNo}`}  placeholder="Enter Option" className={`1${questionNo}`} value={answers[0]} onChange={(event) => handleOptionsChange(event, 0)} />
						</li>
						<li>
							<input type="text" id={`2${questionNo}`} placeholder="Enter Option" name={`option2${questionNo}`}   className={`2${questionNo}`} value={answers[1]} onChange={(event) => handleOptionsChange(event, 1)} />
						</li>
						<li>
							<input type="text" id={`3${questionNo}`} placeholder="Enter Option" name={`option3${questionNo}`}  className={`3${questionNo}`}  value={answers[2]} onChange={(event) => handleOptionsChange(event, 2)} />
						</li>
						<li>
							<input type="text" id={`4${questionNo}`} placeholder="Enter Option" name={`option4${questionNo}`}  className={`4${questionNo}`}   value={answers[3]} onChange={(event) => handleOptionsChange(event, 3)} />
						</li> */}
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

				</div>
			</div>
		</>
	)
}

export default CreateQuestion;