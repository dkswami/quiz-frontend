import React from 'react'
import { useRouter } from 'next/router'

function AttemptQuiz() {
	const router = useRouter()
	console.log('got it',router.query.qid);
	return (
		<div>AttemptQuiz</div>
	)
}

export default AttemptQuiz