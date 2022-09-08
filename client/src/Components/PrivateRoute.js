import { useContext } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { Context } from '../context';

const PrivateRoute = () => {

    const { user } = useContext(Context);
    const location = useLocation();

    return (
        // if there is a signed in user, continue
        // if not, redirect to sign in page, then go direct to where they were trying to go
        user ?
        <Outlet /> :
        <Navigate to={'/signin'} replace state={{from: location}} />
    );
};

export default PrivateRoute;