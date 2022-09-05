import { useContext } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { Context } from '../context';

const PrivateRoute = () => {

    const { user } = useContext(Context);
    const location = useLocation();

    return (
        user ?
        <Outlet /> :
        <Navigate to={'/signin'} replace state={{from: location}} />
    );
};

export default PrivateRoute;