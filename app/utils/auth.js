// import React from 'react';
// import {Menu, Button} from 'semantic-ui-react';
// import {NavLink} from 'react-router-dom';
// import {
//     BrowserRouter as Router,
//     Route,
//     Link,
//     Redirect,
//     withRouter,
// } from 'react-router-dom';


// export const basicAuth = {
//     isAuthenticated: false,
//     authenticate(cb) { //callback
//       this.isAuthenticated = true
//       setTimeout(cb, 100) // fake async
//     },
//     signout(cb) {
//       this.isAuthenticated = false
//       setTimeout(cb, 100)
//     }
// }

// // React-router provides us with history & push; wrap button in 
// // HOC:withRouter, since we aren't rendering inside of a Router & 
// // want access to history
// export const AuthButton = withRouter(({history}) => (
//     basicAuth.isAuthenticated === true
//         ? <Menu.Item 
//             position='right'
//             as={Button}
//             onClick={() => {
//                 basicAuth.signout(() => history.push('/'))
//             }}
//         >Logout</Menu.Item>
//         : <Menu.Item
//             position='right'
//             as={NavLink} 
//             to='/login'
//             exact
//         >Login</Menu.Item>
// ))



import React from 'react';
import decode from "jwt-decode";
import {Menu, Button} from 'semantic-ui-react';
import {NavLink} from 'react-router-dom';
import {
    BrowserRouter as Router,
    withRouter,
} from 'react-router-dom';



// Check if there is a saved token and if it is still valid:
export const loggedIn = () => {
    const token = getToken(); //Getting token from localstorage
    return !!token && !isTokenExpired(token); 
};


export const isTokenExpired = (token) => {
    try {
        const decoded = decode(token);
        if (decoded.exp < Date.now() / 1000) {
            return true;
        } else return false;
    } catch (err) {
        console.log("expired check failed");
        return false;
    }
};

export const setToken = (idToken) => {
    // Saves user token to localStorage
    localStorage.setItem("id_token", idToken);
};

export const getToken = () => {
    return localStorage.getItem("id_token");
};

// Clear user token and profile data from localStorage:
export const logout = (cb) => {
  localStorage.removeItem("id_token");
  setTimeout(cb, 100); //wait 100 milliseconds  
};

// Use jwt-decode package to decode the token
export const getConfirm = () => {
    // let ans = decode(getToken());
    let answer = decode(getToken());
    console.log("Received an answer!");
    console.log(answer);
    return answer;
};


// React-router provides us with history & push; wrap button in 
// HOC:withRouter, since we aren't rendering inside of a Router & 
// want access to history
export const AuthButton = withRouter(({history}) => (
    loggedIn() === true
        ? <Menu.Item 
            position='right'
            as={Button}
            onClick={() => {
                logout(() => history.push('/'));
            }}
        >Logout</Menu.Item>
        : <Menu.Item
            position='right'
            as={NavLink} 
            to='/login'
            exact
        >Login</Menu.Item>
))

export const LogOutButton = withRouter(({history}) => (
    <Button
        content='Logout'
        onClick={() => {
            logout(() => history.push('/'));    
        }}
    />
))



