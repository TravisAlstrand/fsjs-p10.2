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
    const [ errors, setErrors ] = useState([]);

    // actions when form is submitted
    const handleSubmit = (e) => {
        // prevent page from reloading
        e.preventDefault();

        // build object to send to signUp call
        const userBody = {
            firstName,
            lastName,
            emailAddress,
            password
        };

        // call signUp action in context sending above object
        actions.signUp(userBody)
            .then(response => {
                if (response.errors) { /* if there were validation errors, set error state */
                    setErrors(response.errors); 
                } else {
                    // if successful, sign user in and redirect to home page
                    actions.signIn(emailAddress, password);
                    navigate('/');
                }
            })
    };

    return (
        <main>
            <div className="form--centered">
                <h2>Sign Up</h2>

                {/* if there were validation errors, append them to page */}
                {errors.length > 0 ? (
                    <div className="validation--errors">
                        <h3>Validation Errors</h3>
                        <ul>
                            {errors.map((error, index) => {
                                return (
                                    <li key={index}>{error}</li>
                                )
                            })}
                        </ul>
                    </div>
                ) : (
                    <></>
                )}
                
                <form onSubmit={handleSubmit}>
                    <label htmlFor="firstName">First Name</label>
                    <input id="firstName" name="firstName" type="text" onChange={e => setFirstName(e.target.value)} />
                    <label htmlFor="lastName">Last Name</label>
                    <input id="lastName" name="lastName" type="text" onChange={e => setLastName(e.target.value)} />
                    <label htmlFor="emailAddress">Email Address</label>
                    <input id="emailAddress" name="emailAddress" type="email" onChange={e => setEmailAddress(e.target.value)} />
                    <label htmlFor="password">Password</label>
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