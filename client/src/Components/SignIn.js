import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Context } from '../context';

const SignIn = () => {

    const { actions } = useContext(Context);

    const [ emailAddress, setEmailAddress ] = useState('');
    const [ password, setPassword ] = useState('');

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        // call sign in function
        actions.signIn(emailAddress, password)
            .then(response => {
                if (response !== null) {
                    navigate('/');
                } else {
                    console.log('sign in failed');
                };
            });
    };

    return (
        <main>
            <div className="form--centered">
                <h2>Sign In</h2>
                
                <form onSubmit={handleSubmit}>
                    <label htmlFor="emailAddress">Email Address</label>
                    <input id="emailAddress" name="emailAddress" type="email" onChange={e => setEmailAddress(e.target.value)} />
                    <label htmlFor="password">Password</label>
                    <input id="password" name="password" type="password" onChange={e => setPassword(e.target.value)} />
                    <button className="button" type="submit">Sign In</button>
                    <Link to='/'>
                        <button className="button button-secondary">Cancel</button>
                    </Link>
                </form>

                <p>Don't have a user account? Click here to <Link to='/signup'>sign up</Link>!</p>
            </div>
        </main>
    );
};

export default SignIn;