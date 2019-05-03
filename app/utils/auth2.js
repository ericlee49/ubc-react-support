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
export const logout = () => {
  localStorage.removeItem("id_token");  
};

// Use jwt-decode package to decode the token
export const getConfirm = () => {
    // let ans = decode(getToken());
    let answer = decode(getToken());
    console.log("Received an answer!");
    console.log(answer);
    return answer;
};

// HOC Menu Item:
export const AuthButton2 = () => (
    <Menu.Item
        position='right'
        as={NavLink}
        to='/login2'
        exact
        >

    Login2</Menu.Item>
);



// const AuthNew = class Auth2 {
//     constructor() {
//     };  

//     // Check if there is a saved token and if it is still valid:
//     loggedIn = () => {
//         const token = this.getToken(); //Getting token from localstorage
//         return !!token && !this.isTokenExpired(token);
//     };

//     isTokenExpired = (token) => {
//         try {
//             const decoded = decode(token);
//             if (decoded.exp < Date.now() / 1000) {
//                 return true;
//             } else return false;
//         } catch (err) {
//             console.log("expired check failed");
//             return false;
//         }
//     };

//     setToken = (idToken) => {
//         // Saves user token to localStorage
//         localStorage.setItem("id_token", idToken);
//     }

//     getToken = () => {
//         return localStorage.getItem("id_token");
//     };

//     // Clear user token and profile data from localStorage:
//     logout = () => {
//       localStorage.removeItem("id_token");  
//     };

//     // Use jwt-decode package to decode the token
//     getConfirm = () => {
//         let answer = decode(this.getToken());
//         console.log("Received an answer!");
//         console.log(answer);
//         return answer;
//     };
    
// }

// export default AuthNew;


