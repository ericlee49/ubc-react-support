import React from 'react';
import {loggedIn, logout, getConfirm} from '../utils/auth.js';

// HOC:

function withAuth(AuthComponent) {

    return class AuthWrapped extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                confirm: null,
                loaded: false
            }
        }
        
        componentDidMount() {
            if (!loggedIn()) {
                // Most likely won't hit this, with routing:
                console.log("user not logged in!");
            } else {
                // Try to get confirmation message from getConfirm function
                try {
                    const confirm = getConfirm();
                    this.setState({
                        confirm: confirm,
                        loaded: true
                    });
                } catch (err) {
                    // Print out the error & log user out for security
                    console.log(err);
                    logout();
                    this.props.history.replace("/login2");
                }
            }
        }

        render() {
            // if (this.state.loaded === true) {
            //     if (this.state.confirm) {
            //         console.log("confirmed!");
            //         return (
            //             <AuthComponent />
            //         )
            //     }
            // }
            return (
                <AuthComponent />
            )
        }
    }

};


export default withAuth;