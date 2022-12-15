import { useState, useContext, useEffect } from 'react'
import { useRouter } from 'next/router';
import axios from 'axios';
import { UserContext } from '../contexts/user.context';

const defaultFormFields = {
	email: '',
	password: ''
}

function Login({ token_data}) {
	const [formFields, setFormFields] = useState(defaultFormFields);
	const { email, password } = formFields;
	const { setCurrentUser, setIsLoggedIn } = useContext(UserContext);
	const router = useRouter();

	const handleChange = (event) => {
		const { name, value } = event.target;
		setFormFields({ ...formFields, [name]: value });
	}

	const handleSubmit = async (event) => {
		event.preventDefault();
		const response = await axios.post('/api/login', formFields);
		console.log(response);
		if(response.data.message.id) {
			setCurrentUser(response.data.message);
			setIsLoggedIn(true);
			alert(`Welcome To Quiz App ${response.data.message.name}`);
			window.location.reload(true);
			/* if (response.data.message.role === "admin") {
				router.push('/');
			} else {
				router.push('/')
			} */
		}
		else if (response.data.message === "Invalid credentials") {
			alert("Invalid email or password");
		}
		else if (response.data.message === "failed to fetch data") {
			alert("Server is down");
		}
		else {
			alert("Something went wrong Try again later");
		}
	}

	useEffect(() => {
		console.log(token_data)
		if(token_data) {
			router.push('/');
		}
	})
	
	// console.log(formFields)
	return (
		<>
			<h2>Login Page</h2>
			<form onSubmit={handleSubmit} >
				<div className="form-group">
					<label htmlFor="email">Email address :</label>
					<input type="email" className="form-control" id="email" placeholder="Enter Email" name='email' value={email} onChange={handleChange} />
				</div>
				<div className="form-group">
					<label htmlFor="pwd">Password :</label>
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

export function getServerSideProps({ req, res }) {
	return { props: { token_data : req.cookies.cookieToken || "" } };
}

export default Login;
