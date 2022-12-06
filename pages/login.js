import { useState, useContext } from 'react'
import { useRouter } from 'next/router';
import axios from 'axios';
import { UserContext } from '../contexts/user.context';

const defaultFormFields = {
	email: '',
	password: ''
}

function login() {
	const [formFields, setFormFields] = useState(defaultFormFields);
	const { email, password } = formFields;
	const { setCurrentUser } = useContext(UserContext);
	const router = useRouter();

	const handleChange = (event) => {
		const { name, value } = event.target;
		setFormFields({ ...formFields, [name]: value });
	}

	const handleSubmit = async (event) => {
		event.preventDefault();
		try {
			const response = await axios.post('http://localhost:4000/api/v1/auth/login', formFields);

			localStorage.setItem("token", response.data.token);
			setCurrentUser(response.data.user);
			if (response.data === "") {
				return alert("Invalid email or password");
			} else {
				alert("Login successful");
				if (response.data.user.role === "admin") {
					router.push('/createquiz');
				} else {
					router.push('/quiz')
				}
			}
		} catch (error) {
			console.log(error)
		}

	}
	console.log(formFields)
	return (
		<>		
			<h2>Login Page</h2>
			<form onSubmit={handleSubmit} >
				<div className="form-group">
					<label htmlFor="email">Email address:</label>
					<input type="email" className="form-control" id="email" placeholder="Enter Email"  name='email' value={email} onChange={handleChange} />
				</div>
				<div className="form-group">
					<label htmlFor="pwd">Password:</label>
					<input type="password" className="form-control" id="pwd" placeholder="Password" name='password' value={password} onChange={handleChange} />
				</div>
				<div className="checkbox">
					<label><input type="checkbox" /> Remember me</label>
				</div>				
				<button type="submit" className="btn btn-primary">login</button>
			</form>
		</>
	)
}

export default login;
