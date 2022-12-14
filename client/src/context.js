import React, { useState } from 'react';
import { useCookies } from 'react-cookie';

import { Buffer } from 'buffer';

export const Context = React.createContext();

export const Provider = (props) => {

    // state for all courses
    const [ courses, setCourses ] = useState([]);

    const [ cookies, setCookie, removeCookie ] = useCookies();

    // state for signed in user
    const [ user, setUser ] = useState(cookies.user || null);
    
    // function for all api requests
    function api(path, method = 'GET', body = null, requiresAuth = false, credentials = null) {
        // base url
        const url = 'https://fsjs-p102-production.up.railway.app/api' + path;

        const options = {
            method,
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            }
        };

        if (body !== null) {
            options.body = JSON.stringify(body);
        }

        if (requiresAuth) {
            const encryptedCredentials = Buffer.from(`${credentials.username}:${credentials.password}`).toString('base64');
            options.headers['Authorization'] = `Basic ${encryptedCredentials}`;
        }

        const results = fetch(url, options);

        return (results);
    };

    /* ========================================== */
    /* -------------- USER API CALLS ------------ */
    /* ========================================== */

    // funtion to GET user info & sign user in
    async function handleSignIn(username, password) {
        const response = await api('/users', 'GET', null, true, {username, password});

        if (response.status === 200) {

            return response.json()
                .then(data => {
                    data.password = password;
                    setCookie('user', data, { path: '/' });
                    setUser(data);
                })
        } else if (response.status === 401) {
            return null;
        }
    };

    // function to create new user
    async function handleSignUp(body) {
        const response = await api('/users', 'POST', body);

        if (response.status === 201) {
            return true;
        } else if (response.status === 400) {
            return response.json();
        }
    };

    // function to sign out user
    function handleSignOut() {
        removeCookie('user');
        setUser(null);
    }

    /* ========================================== */
    /* ------------- COURSE API CALLS ----------- */
    /* ========================================== */

    // function to get all courses
    async function handleGetCourses() {
        const response = await api('/courses');

        if (response.status === 200) {
            response.json()
                .then(data => setCourses(data));
            return courses;
        } 
    }

    // function to get single course
    async function handleGetCourse(id) {
        const response = await api(`/courses/${id}`);
        
        if (response.status === 200) {
            const course = response.json();
            return (course);
        } else if (response.status === 404) {
            return null;
        }
    };

    // function to update course
    async function handleUpdateCourse(body, id) {
        const response = await api(`/courses/${id}`, 'PUT', body, true, {username: user.emailAddress, password: user.password});

        if (response.status === 204) {
            return true;
        } else if (response.status === 400) {
            return response.json();
        }
    }

    // function to create new course
    async function handleCreateCourse(body) {
        const response = await api('/courses', 'POST', body, true, {username: user.emailAddress, password: user.password});

        if (response.status === 201) {
            return true;
        } else if (response.status === 400) {
            return response.json();
        }
    }

    // function to delete course
    async function handleDeleteCourse(id) {
        const response = await api(`/courses/${id}`, 'DELETE', null, true, {username: user.emailAddress, password: user.password});

        if (response.status === 204) {
            return true;
        }
    }

    // return context provider with states and functions needed elsewhere
    return (
      <Context.Provider value={{
        user,
        courses,
        actions: {
            signIn: handleSignIn,
            signUp: handleSignUp,
            signOut: handleSignOut,
            getCourses: handleGetCourses,
            getCourse: handleGetCourse,
            updateCourse: handleUpdateCourse,
            createCourse: handleCreateCourse,
            deleteCourse: handleDeleteCourse
        }
      }}>
        {props.children}
      </Context.Provider>  
    );
};
