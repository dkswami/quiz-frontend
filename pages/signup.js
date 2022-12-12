import { useState } from 'react'
import { useRouter } from 'next/router';
import axios from 'axios';
const BACKEND_API_ENDPOINT = process.env.NEXT_PUBLIC_BACKEND_API

const defaultFormFields = {
	name: "",
	email: '',
	password: ''
}

function SignUp() {
	const [formFields, setFormFields] = useState(defaultFormFields);
	const { name, email, password } = formFields;
	const router = useRouter();
	console.log(BACKEND_API_ENDPOINT)
	const handleChange = (event) => {
		const { name, value } = event.target;
		setFormFields({ ...formFields, [name]: value });
	}

	const handleSubmit = async (event) => {
		event.preventDefault();
		const response = await axios.post(`${BACKEND_API_ENDPOINT}/api/v1/auth/register`, formFields);
		if (response.data.id) {
			alert("You have successfully registered, please login");
			router.push('/login')
		} else {
			alert("User with this email already exists")
		}
		console.log(response)
	}

	return (
		<>
			<h2>Signup Page</h2>
			<form onSubmit={handleSubmit} >
				<div className="form-group">
					<label htmlFor="name">Full Name :</label>
					<input type="text" className="form-control" id="name" placeholder="Your Name" name='name' value={name} onChange={handleChange} />
				</div>				
				<div className="form-group">
					<label htmlFor="email">Email address :</label>
					<input type="email" className="form-control" id="email" placeholder="Enter Email" name='email' value={email} onChange={handleChange} />
				</div>
				<div className="form-group">
					<label htmlFor="pwd">Password :</label>
					<input type="password" className="form-control" id="pwd" placeholder="Password" name='password' value={password} onChange={handleChange} />
				</div>
				<button type="submit" className="btn btn-primary">Sign Up</button>
			</form>
		</>
	)
}

export default SignUp;
