import React from 'react';
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'
import {BrowserRouter as Router, Redirect} from 'react-router-dom';
import {basicAuth} from '../utils/auth.js'
import axios from 'axios';


//Semantic UI InLineStyler
function InLineStyle() {
    return (
        <style>{`
            .header {
                background-color: #002145;
            }
        `
        }</style>
    )
}

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            login: true,
            username: '',
            password: '',
            redirectToReferrer: false,
            message: '',
            errorMessage: true,
        };
        this.login = this.login.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.showLoginError = this.showLoginError.bind(this);
    }

    login(){

        return (
            axios
            .post('http://localhost:1337/auth/local', {
                identifier: this.state.username,
                password: this.state.password
            })
            .then(response => {
              // Handle success.
              console.log('Well done!');
              console.log('User profile', response.data.user);
              console.log('User token', response.data.jwt);
              basicAuth.authenticate (() => {
                this.setState(() => ({
                    redirectToReferrer: true
                }))
              })
            })
            .catch(error => {
              // Handle error.
              console.log('An error occurred:', error);
              this.showLoginError();
            })        
        )
    }
    //handle change helper function, takes care of on-Click, changing state to match input
    handleChange(e) {
        const value = event.target.value;
        const name = event.target.name;
        this.setState(() => (
            {[name] : value}
        ));
    }

    showLoginError() {
        this.setState(() => (
            {errorMessage: false}
        ));
    }

    render() {
        const {login, email, password, redirectToReferrer} = this.state;
        const {from} = this.props.location.state || {from: {pathname: '/'}};

        if (redirectToReferrer === true) {
            return (
                <Redirect to={from}/>
            )
        }

        return (
            <div>
            <Grid textAlign='center' color='red' verticalAlign='middle' >
                <Grid.Row style={{maxWidth: 450}}>
                    <Grid.Column >
                        <Header as='h2' textAlign='center'>
                            Log-in to your account
                        </Header>
                        <Form>
                            <Segment>
                                <Form.Input 
                                    placeholder='E-mail address / username'
                                    icon='user'
                                    iconPosition='left'
                                    name = 'username'
                                    onChange={this.handleChange}/>
                                <Form.Input 
                                    placeholder='Password' 
                                    icon='lock'
                                    iconPosition='left'
                                    type='password' 
                                    name = 'password'
                                    onChange={this.handleChange}/>
                            </Segment>
                        </Form>
                        <Button onClick={this.login} fluid >
                            Login
                        </Button>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
            <Message negative hidden={this.state.errorMessage}>
                <Message.Header>We're sorry login failed</Message.Header>
                <p>Incorrect username or password.</p>
            </Message>
            </div>



            

        )
        
    }
}

export default Login;