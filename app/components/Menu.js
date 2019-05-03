import React from 'react';
import {Menu, Segment, Button, Container, Grid, Visibility, Image} from 'semantic-ui-react';
import {NavLink} from 'react-router-dom';
import {AuthButton, basicAuth} from '../utils/auth.js';
import {AuthButton2} from '../utils/auth2.js';
import Header from './Header';


function StyleComponent() {
    return (
        <style>
        {`
        #menuStyle {
            background-color: #002145;
            border-radius: 0px;
            boxShadow: 'none';
            margin-top: 0px;
            transition: 'box-shadow 0.5s ease, padding 0.5s ease';
        }
        `}
        </style>
    )
}


class MainMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            menuFixed: false,
        }
        this.stickTopMenu = this.stickTopMenu.bind(this);
        this.unStickTopMenu = this.unStickTopMenu.bind(this);
    }

    stickTopMenu(){
        this.setState(() => ({menuFixed: true}))
    }   

    unStickTopMenu(){
        this.setState(() => ({menuFixed: false}))
    }   
    render() {
        const {menuFixed} = this.state;
        return (
            <div>
            <StyleComponent/>    
            <Visibility
                onBottomPassed={this.stickTopMenu}
                onBottomVisible={this.unStickTopMenu}
                once={false}
            >
                <Header />
            </Visibility>                            
            <Menu 
                inverted 
                fixed={menuFixed ? 'top' : undefined}
                id='menuStyle'>
                <Container textAlign='left'>
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
                        name='IT Support' 
                        as={NavLink} to='/support' exact
                    />
                    <Menu.Item 
                        name='Protected Page' 
                        as={NavLink} to='/protected' exact
                    />
                    <Menu.Item 
                        name='Protected Page 2' 
                        as={NavLink} to='/protectedcomp' exact
                    />                    

                    {basicAuth.isAuthenticated && <Menu.Item
                        name='Account Requests'
                        as={NavLink} to='/account_requests'>
                    </Menu.Item>}
                    <AuthButton2/>
                    <AuthButton/>   
            
                </Container>
                                      
            </Menu>
    

            </div>



        )
    }
}

export default MainMenu;
