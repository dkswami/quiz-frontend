import { useEffect, useState } from 'react';
import Select from 'react-select';
import CreateStyles from '../styles/CreateQuiz.module.css';

const defaultDifficultyOptions = [
	{ value: 1, label: '1', isdisabled: false },
	{ value: 2, label: '2', isdisabled: false },
	{ value: 3, label: '3', isdisabled: false },
	{ value: 4, label: '4', isdisabled: false },
	{ value: 5, label: '5', isdisabled: false },
	{ value: 6, label: '6', isdisabled: false },
	{ value: 7, label: '7', isdisabled: false },
	{ value: 8, label: '8', isdisabled: false },
	{ value: 9, label: '9', isdisabled: false },
	{ value: 10, label: '10', isdisabled: false }
]

const defaultCurrentDifficulty = { value:22, label: 'Not Selected', isdisabled: false };

const CreateQuestion = ({ handleAddQuestion, defaultQuestionData, handleSubmit }) => {
	const [questionData, setQuestionData] = useState(defaultQuestionData)
	const [questionNo, setQuestionNo] = useState(0);
	const { question, questionType, difficulty, correctAnswers, answers } = questionData;

	const [selectedDifficulties, setSelectedDifficulties] = useState([]);
	const [difficultyOptions, setDifficultyOptions] = useState(defaultDifficultyOptions);
	const [currentDifficulty, setCurrentDifficulty] = useState(defaultCurrentDifficulty);

	const handleChange = (event) => {
		const { name, value } = event.target;
		const newQuestionData = { ...questionData, [name]: value };
		setQuestionData(newQuestionData);
	}

	const handleOptionsChange = (event, index) => {
		answers[index] = event.target.value;
		const newQuestionData = { ...questionData, answers: [...answers] }
		setQuestionData(newQuestionData);
	}

	const handleMultipleAnswersChange = (event) => {
		const { value, checked } = event.target;
		if (checked) {
			const newQuestionData = { ...questionData, correctAnswers: [...correctAnswers, value] }
			setQuestionData(newQuestionData)
		} else {
			const index = correctAnswers.indexOf(value);
			correctAnswers.splice(index, 1);
			const newQuestionData = { ...questionData, correctAnswers: correctAnswers }
			setQuestionData(newQuestionData);
		}
	}

	const handleSingleAnswerChange = (event) => {
		const newQuestionData = { ...questionData, correctAnswers: [event.target.value] }
		setQuestionData(newQuestionData);
	}

	const handleDifficultyChange = (event) => {
		setQuestionData({ ...questionData, difficulty: event.value });
		setCurrentDifficulty(event);
	}

	const handleNextButtonClick = (e) => {
		e.preventDefault();
		if (selectedDifficulties.includes(questionData.difficulty) || currentDifficulty.value === 11) {
			alert('Select a difficulty level');
		} else {
			setSelectedDifficulties([...selectedDifficulties, questionData.difficulty])
			if (correctAnswers.length < 1) {
				alert('Please select atleast one correct answer')
			} else {
				handleAddQuestion(questionData, questionNo);
				setQuestionData(defaultQuestionData);
				setCurrentDifficulty(defaultCurrentDifficulty);
				if (questionNo < 9) {
					setQuestionNo(questionNo + 1);
				}
				else {
					handleSubmit();
				}
			}
		}
	}

	useEffect(() => {
		const newDifficultyOptions = difficultyOptions.map((option) => {
			if (selectedDifficulties.includes(option.value)) {
				return { ...option, isdisabled: true }
			}
			return option;
		});
		setDifficultyOptions(newDifficultyOptions);
	}, [selectedDifficulties])

	return (
		<form onSubmit={handleNextButtonClick}>

			<div className={CreateStyles.questionContainer}>
				<h3>Question {questionNo + 1} :</h3>
				<div className={CreateStyles.questionItem}>
					<label htmlFor="question">Question :</label>
					<input type="text" id='question' placeholder="Enter Question" name='question' value={question} onChange={handleChange} required />
				</div>
				<div className={CreateStyles.questionItem}>
					<label htmlFor="difficulty">Difficulty :</label>
					<Select
						className={CreateStyles.select}
						options={difficultyOptions}
						onChange={handleDifficultyChange}
						isOptionDisabled={(option) => option.isdisabled}
						value={currentDifficulty}
						required
					/>
				</div>
				<div className={CreateStyles.questionItem}>
					<label htmlFor="sel1">Question Type :</label>
					<select className="form-control" id="sel1" name='questionType' onChange={handleChange} defaultValue="SCA" required>
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
									<input type="text" placeholder="Enter Option" name={`option${index}${questionNo}`} value={answer} onChange={(event) => handleOptionsChange(event, index)} required />
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
										<input type="radio" name={`singleOption${questionNo}`} value={answer} onChange={handleSingleAnswerChange} required />
										<label htmlFor={`singleOption${questionNo}`} >   Is Correct</label>
									</li>
								)
							})}
						</ol>
					)}
				</div>
			</div>
			<button type="submit" className="btn btn-primary center-block"> Next</button>
		</form>
	)
}

export default CreateQuestion;