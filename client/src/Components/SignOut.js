import { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Context } from '../context';

const SignOut = () => {

    const { actions } = useContext(Context);

    const navigate = useNavigate();

    // call signOut action in context and redirect to home page
    useEffect(() => {
        actions.signOut();
        (navigate('/'));
    });

    return (
        <>
            <h1>Signing Out...</h1>
        </>
    );
};

export default SignOut;