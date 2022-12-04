import { useState } from 'react'
import { useRouter } from 'next/router';
import axios from 'axios';
import Loginstyles from '../styles/Login.module.css';

const defaultFormFields = {
	name: "",
	email: '',
	password: ''
}

function signup() {
	const [formFields, setFormFields] = useState(defaultFormFields);
	const { name, email, password } = formFields;
	const router = useRouter();

	const handleChange = (event) => {
		const { name, value } = event.target;
		setFormFields({ ...formFields, [name]: value });
	}

	const handleSubmit = async (event) => {
		event.preventDefault();
		const response = await axios.post('http://localhost:4000/api/v1/auth/register', formFields);	
		if(response.data.id) {
			alert("You have successfully registered, please login");
			router.push('/login')
		} else {
			alert("User with this email already exists")
		}	
	}

	return (
		<>
			<h2>Signup Page</h2>
			<form onSubmit={handleSubmit} className={Loginstyles.loginContainer}>
				<input type="text" placeholder="Name" name='name' value={name} onChange={handleChange} />
				<input type="email" placeholder="email" name='email' value={email} onChange={handleChange} />
				<input type="password" placeholder="password" name='password' value={password} onChange={handleChange} />
				<button>Sign Up</button>
			</form>
		</>
	)
}

export default signup;
