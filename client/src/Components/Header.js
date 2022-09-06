import { useContext, useState, useRef } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Context } from '../context';

import { changeTheme } from '../theme';

const Header = () => {

    const { user } = useContext(Context);
    const [ theme, setTheme ] = useState('light');

    const moonRef = useRef(null);
    const sunRef = useRef(null);

    const changeThemeIcon = () => {
        changeTheme();
        if (theme === 'light') {
            setTheme('dark');
            moonRef.current.style.display = 'none';
            sunRef.current.style.display = 'inherit';
        } else if (theme === 'dark') {
            setTheme('light');
            moonRef.current.style.display = 'inherit';
            sunRef.current.style.display = 'none';
        }
    };

    return (
        <header>
            <div className='wrap header--flex'>
                <h1 className='header--logo'><Link to='/'>Courses</Link></h1>

                <svg ref={moonRef} className='theme-icon' onClick={changeThemeIcon} version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg"  x="0px" y="0px"
                    viewBox="0 0 455 455">
                    <g>
                        <polygon points="320.18,162.705 280.63,171.052 307.72,201.052 303.437,241.245 340.34,224.751 377.243,241.245 372.96,201.052 
                            400.05,171.052 360.5,162.705 340.34,127.67 	"/>
                        <polygon points="440,325.677 414.091,320.208 400.883,297.253 387.675,320.208 361.766,325.677 379.513,345.33 376.708,371.661 
                            400.884,360.855 425.063,371.661 422.254,345.329 	"/>
                        <path d="M218,227.5c0-89.167,51.306-166.338,126-203.64C313.443,8.6,278.978,0,242.5,0C116.855,0,15,101.855,15,227.5
                            S116.855,455,242.5,455c36.478,0,70.943-8.6,101.5-23.86C269.306,393.838,218,316.667,218,227.5z"/>
                    </g>
                </svg>

                <svg ref={sunRef} className='theme-icon' onClick={changeThemeIcon} style={{display: 'none'}} version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 207.628 207.628" >
                    <circle cx="103.814" cy="103.814" r="45.868"/>
                    <path d="M103.814,157.183c-29.427,0-53.368-23.941-53.368-53.368s23.941-53.368,53.368-53.368s53.368,23.941,53.368,53.368
                        S133.241,157.183,103.814,157.183z M103.814,65.446c-21.156,0-38.368,17.212-38.368,38.368s17.212,38.368,38.368,38.368
                        s38.368-17.212,38.368-38.368S124.97,65.446,103.814,65.446z"/>
                    <path d="M103.814,39.385c-4.142,0-7.5-3.358-7.5-7.5V7.5c0-4.142,3.358-7.5,7.5-7.5s7.5,3.358,7.5,7.5v24.385
                        C111.314,36.027,107.956,39.385,103.814,39.385z"/>
                    <path d="M103.814,207.628c-4.142,0-7.5-3.358-7.5-7.5v-24.385c0-4.142,3.358-7.5,7.5-7.5s7.5,3.358,7.5,7.5v24.385
                        C111.314,204.271,107.956,207.628,103.814,207.628z"/>
                    <path d="M200.128,111.314h-24.385c-4.142,0-7.5-3.358-7.5-7.5s3.358-7.5,7.5-7.5h24.385c4.142,0,7.5,3.358,7.5,7.5
                        S204.271,111.314,200.128,111.314z"/>
                    <path d="M31.885,111.314H7.5c-4.142,0-7.5-3.358-7.5-7.5s3.358-7.5,7.5-7.5h24.385c4.142,0,7.5,3.358,7.5,7.5
                        S36.027,111.314,31.885,111.314z"/>
                    <path d="M154.676,60.452c-1.919,0-3.839-0.732-5.303-2.197c-2.929-2.929-2.929-7.678,0-10.606l17.243-17.242
                        c2.929-2.929,7.678-2.93,10.606,0c2.929,2.929,2.929,7.678,0,10.606l-17.243,17.242C158.515,59.72,156.595,60.452,154.676,60.452z"
                        />
                    <path d="M35.709,179.419c-1.919,0-3.839-0.732-5.303-2.197c-2.929-2.929-2.929-7.678,0-10.606l17.243-17.243
                        c2.929-2.929,7.678-2.929,10.606,0c2.929,2.929,2.929,7.678,0,10.606l-17.243,17.243C39.548,178.687,37.629,179.419,35.709,179.419z
                        "/>
                    <path d="M171.918,179.419c-1.919,0-3.839-0.732-5.303-2.197l-17.243-17.243c-2.929-2.929-2.929-7.678,0-10.606
                        c2.929-2.929,7.678-2.929,10.606,0l17.243,17.243c2.929,2.929,2.929,7.678,0,10.606
                        C175.757,178.687,173.838,179.419,171.918,179.419z"/>
                    <path d="M52.952,60.452c-1.919,0-3.839-0.732-5.303-2.197L30.406,41.013c-2.929-2.929-2.929-7.677,0-10.606
                        c2.929-2.929,7.678-2.93,10.606,0l17.243,17.242c2.929,2.929,2.929,7.677,0,10.606C56.791,59.72,54.872,60.452,52.952,60.452z"/>
                </svg>


                <nav>
                    {user ? (
                        <ul className="header--signedin">
                            <li>Welcome, {user.firstName} {user.lastName}!</li>
                            <li><NavLink to='/signout'>Sign Out</NavLink></li>
                        </ul>
                    ) : (
                        <ul className='header--signedout'>
                            <li><NavLink to='/signup'>Sign Up</NavLink></li>
                            <li><NavLink to='/signin'>Sign In</NavLink></li>
                        </ul>
                    )}
                </nav>
            </div>
        </header>
    );
};  

export default Header;