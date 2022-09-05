import { useState, useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Context } from '../context';

const SignIn = () => {

    const { actions } = useContext(Context);

    const [ emailAddress, setEmailAddress ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ error, setError ] = useState('');

    const navigate = useNavigate();
    const location = useLocation();

    function handleSubmit(e){
        e.preventDefault();

        // call sign in function
        actions.signIn(emailAddress, password)
            .then(response => {
                if (response !== null) {
                    if (location.state?.from) {
                        navigate(location.state.from);
                    } else {
                        navigate('/');
                    }
                } else {
                    setError('Please try your credentials again');
                };
            });
    };

    return (
        <main>
            <div className="form--centered">
                <h2>Sign In</h2>

                {error !== '' ? (
                    <p className="validation--errors">{error}</p> 
                ) : (
                    <></>
                )}
                
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