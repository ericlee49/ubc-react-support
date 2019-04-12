import React from 'react';
import {Menu, Segment, Button, Container, Header} from 'semantic-ui-react';
import {NavLink} from 'react-router-dom';
import {AuthButton, basicAuth} from '../utils/auth.js'

class MainMenu extends React.Component {
    render() {
        return (
            <div>

            <Menu inverted fixed='top'>
                <Menu.Item 
                    name='home' 
                    // active={activeItem === 'home'} 
                    // onClick={this.handleItemClick.bind(null, 'home')}
                    as={NavLink} to='/' exact
                />
                <Menu.Item 
                    name='on boarding'
                    // active={activeItem === 'on boarding'}
                    // onClick={this.handleItemClick.bind(null, 'on boarding')}
                    as={NavLink} to='/onboarding' exact
                />
                <Menu.Item 
                    name='Account Request Form'
                    // active={activeItem === 'IT support'}
                    // onClick={this.handleItemClick.bind(null, 'IT support')}
                    as={NavLink} to='/request_form' exact
                />      
                <Menu.Item 
                    name='Public Page' 
                    as={NavLink} to='/public' exact
                />
                <Menu.Item 
                    name='Protected Page' 
                    as={NavLink} to='/protected' exact
                />

                {basicAuth.isAuthenticated && <Menu.Item
                    name='Account Requests'
                    as={NavLink} to='/account_requests'>
                </Menu.Item>}

                <AuthButton/>                                         
            </Menu>

            </div>



        )
    }
}

export default MainMenu;
