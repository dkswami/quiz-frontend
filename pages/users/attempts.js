import React, { useState, useEffect, useContext, useRef } from 'react'
import axios from 'axios';
import { UserContext } from '../../contexts/user.context';
import LineChart from '../../components/Line-chart';
import attemptStyles from '../../styles/attempt.module.css';
const BACKEND_API_ENDPOINT = process.env.NEXT_PUBLIC_BACKEND_API

const defaultAttemptData = [
	{
		_id: "",
		quizTitle: "",
		quizDescription: "",
		quizId: "",
		attemptedBy: "",
		userScore: 0,
		total: 50,
		scoreData: [
			{
				"quesNumber": 1,
				"currScore": 5
			},
		],
	}
]


const Attempts = ({ token_data }) => {
	const [attemptsData, setAttemptsData] = useState(defaultAttemptData)

	const { currentUser, setToken } = useContext(UserContext);
	const userId = currentUser.id;

	console.log(BACKEND_API_ENDPOINT)
	useEffect(() => {
		const getOneAttempt = async () => {
			const config = {
				headers: {
					Authorization: `Bearer ${token_data}`,
				},
			}
			try {
				const response = await axios.get(`${BACKEND_API_ENDPOINT}/api/v1/attempt/${userId}`, config);
				console.log(response)
				setAttemptsData(response.data);
			} catch (error) {
				console.log(error)
			}
		}
		getOneAttempt();
		setToken(token_data);
	}, [userId])

	return (
		<div>
			<h2> Your All Attempts will display Here! </h2>
			{attemptsData.map((attempt, index) => {
				return (
					<div key={index}>
						<div className={attemptStyles.heading}>
							<span><b>Quiz Title : </b></span>
							<span>{attempt.quizTitle}</span>
						</div>
						<div className={attemptStyles.heading}>
							<span><b>Quiz Description : </b></span>
							<span>{attempt.quizDescription}</span>
						</div>
						<div className={attemptStyles.heading}>
							<span><b>Your Score : </b></span>
							<span>{attempt.userScore}/{attempt.total}</span>
						</div>
						<LineChart index={index} data={attempt.scoreData} width={500} height={200} />
						<p>Here is the score data with Question Number on X-axis and Score on Y-axis</p>
					</div>
				)
			})}
		</div>
	)
}

export function getServerSideProps({ req, res }) {
	return { props: { token_data: req.cookies.token || "" } };
}

export default Attempts;