import React from 'react';
import {Menu, Button} from 'semantic-ui-react';
import {NavLink} from 'react-router-dom';
import {
    BrowserRouter as Router,
    Route,
    Link,
    Redirect,
    withRouter,
} from 'react-router-dom';


export const basicAuth = {
    isAuthenticated: false,
    authenticate(cb) { //callback
      this.isAuthenticated = true
      setTimeout(cb, 100) // fake async
    },
    signout(cb) {
      this.isAuthenticated = false
      setTimeout(cb, 100)
    }
}

// React-router provides us with history & push; wrap button in 
// HOC:withRouter, since we aren't rendering inside of a Router & 
// want access to history
export const AuthButton = withRouter(({history}) => (
    basicAuth.isAuthenticated === true
        ? <Menu.Item 
            position='right'
            as={Button}
            onClick={() => {
                basicAuth.signout(() => history.push('/'))
            }}
        >Logout</Menu.Item>
        : <Menu.Item
            position='right'
            as={NavLink} 
            to='/login'
            exact
        >Login</Menu.Item>
))


