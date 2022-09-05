import React, { useState } from 'react';
import { Buffer } from 'buffer';

export const Context = React.createContext();

export const Provider = (props) => {

    // state for signed in user
    const [ user, setUser ] = useState(null);

    // state for username
    const [ authedUsername, setAuthedUsername ] = useState('');

    // state for password
    const [ authedUserPassword, setAuthedUserPassword ] = useState('');

    // state for all courses
    const [ courses, setCourses ] = useState([]);

    // state for current course
    const [ course, setCourse ] = useState(null);

    // function for all api requests
    function api(path, method = 'GET', body = null, requiresAuth = false, credentials = null) {
        // base url
        const url = 'http://localhost:5000/api' + path;

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
            setAuthedUsername(username);
            setAuthedUserPassword(password);
            return response.json()
                .then(data => setUser(data));
        } else if (response.status === 401) {
            return null;
        } else {
            throw new Error();
        }
    };

    async function handleSignUp(body) {
        const response = await api('/users', 'POST', body);

        if (response.status === 201) {
            return true;
        }
        return response.json();
    };

    // function to sign out user
    function handleSignOut() {
        setAuthedUsername('');
        setAuthedUserPassword('');
        setUser(null);
    }

    /* ========================================== */
    /* ------------- COURSE API CALLS ----------- */
    /* ========================================== */

    async function handleGetCourses() {
        const response = await api('/courses');

        if (response.status === 200) {
            response.json()
                .then(data => setCourses(data));
            return courses;
        }
    }

    async function handleGetCourse(id) {
        const response = await api(`/courses/${id}`);

        if (response.status === 200) {
            response.json()
                .then(data => setCourse(data))
            return course;
        }
    };

    async function handleUpdateCourse(body, id) {
        const response = await api(`/courses/${id}`, 'PUT', body, true, {username: authedUsername, password: authedUserPassword});

        if (response.status === 204) {
            return true;
        }
    }

    return (
      <Context.Provider value={{
        user,
        courses,
        course,
        actions: {
            signIn: handleSignIn,
            signUp: handleSignUp,
            signOut: handleSignOut,
            getCourses: handleGetCourses,
            getCourse: handleGetCourse,
            updateCourse: handleUpdateCourse
        }
      }}>
        {props.children}
      </Context.Provider>  
    );
};
