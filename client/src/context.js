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

    // function to sign out user
    async function handleSignOut() {
        setAuthedUsername('');
        setAuthedUserPassword('');
        setUser(null);
    }

    return (
      <Context.Provider value={{
        user,
        actions: {
            signIn: handleSignIn,
            signOut: handleSignOut
        }
      }}>
        {props.children}
      </Context.Provider>  
    );
};