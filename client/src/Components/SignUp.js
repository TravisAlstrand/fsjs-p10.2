import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Context } from '../context';

const SignUp = () => {

    const { actions } = useContext(Context);

    const navigate = useNavigate();

    const [ firstName, setFirstName ] = useState('');
    const [ lastName, setLastName ] = useState('');
    const [ emailAddress, setEmailAddress ] = useState('');
    const [ password, setPassword ] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        // build object to send to signUp call
        const userBody = {
            firstName,
            lastName,
            emailAddress,
            password
        };

        actions.signUp(userBody)
            .then(response => {
                actions.signIn(emailAddress, password);
                navigate('/');
            })
    };

    return (
        <main>
            <div className="form--centered">
                <h2>Sign Up</h2>
                
                <form onSubmit={handleSubmit}>
                    <label for="firstName">First Name</label>
                    <input id="firstName" name="firstName" type="text" onChange={e => setFirstName(e.target.value)} />
                    <label for="lastName">Last Name</label>
                    <input id="lastName" name="lastName" type="text" onChange={e => setLastName(e.target.value)} />
                    <label for="emailAddress">Email Address</label>
                    <input id="emailAddress" name="emailAddress" type="email" onChange={e => setEmailAddress(e.target.value)} />
                    <label for="password">Password</label>
                    <input id="password" name="password" type="password" onChange={e => setPassword(e.target.value)} />
                    <button className="button" type="submit">Sign Up</button>
                    <Link to='/'>
                        <button className="button button-secondary">Cancel</button>
                    </Link>
                </form>
                <p>Already have a user account? Click here to <Link to='/signin'>sign in</Link>!</p>
            </div>
        </main>
    ); 
};

export default SignUp;