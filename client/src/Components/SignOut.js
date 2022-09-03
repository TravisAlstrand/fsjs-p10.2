import { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Context } from '../context';

const SignOut = () => {

    const { actions } = useContext(Context);

    const navigate = useNavigate();

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