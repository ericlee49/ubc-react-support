// var React = require('react');
// import {List} from 'semantic-ui-react'
// var OnBoarding = require('./OnBoarding');
import React from 'react';
import Home from './Home';
import OnBoarding from './OnBoarding';
import MainMenu from './Menu';
import AccountRequestForm from './AccountRequestForm';
import AccountRequests from './AccountRequests';
import Login from './Login';
import ITSupport from './ITSupport';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import {Container, Segment, Grid, Header, List, Divider, Image} from 'semantic-ui-react';
import {basicAuth} from '../utils/auth.js'

// export const fakeAuth = {
//   isAuthenticated: false,
//   authenticate(cb) {
//     this.isAuthenticated = true
//     setTimeout(cb, 100) // fake async
//   },
//   signout(cb) {
//     this.isAuthenticated = false
//     setTimeout(cb, 100)
//   }
// }



//Stateless Function Components:

//Style: (TODO: move to css file):
function StyleComponent() {
  return (
    <style>
    {`
      #footerStyle {
        background-color: #002145;
        margin-top: 100px;
        padding-top: 35px;
        padding-bottom: 35px;
      }
    `}
    </style>    
  )
}

//Header:
function HeaderComponent() {
  return (
    <Container>
      <Grid divided>
      <Divider/>
      <Grid.Column width={2}>
        <Image src='app/assets/ubc_crest_blue.png' size='mini' centered style={{ marginTop: '2em' , marginBottom: '2em' }}/>
      </Grid.Column>
      <Grid.Column width={7}>
        <Image src='app/assets/ubc_wordmark_blue.png' size='big' />
      </Grid.Column>
      </Grid>
    </Container>    
  )
}

//Footer:
function AppFooter() {
  return (
    <Segment
      inverted
      vertical
      id='footerStyle'
    >
      <Container textAlign='left'>
        <Grid divided inverted stackable>
          <Grid.Column width={7}>
            <Image src='app/assets/ubc_full_logo.png' size='medium' />
          </Grid.Column>
          <Grid.Column width={4}>
            <Header inverted as='h4' content='About UBC' />
            <List link inverted>
              <List.Item as='a'>Contact UBC</List.Item>
              <List.Item as='a'>About the University</List.Item>
              <List.Item as='a'>News</List.Item>
              <List.Item as='a'>Events</List.Item>
              <List.Item as='a'>Careers</List.Item>
              <List.Item as='a'>Make a Gift</List.Item>
              <List.Item as='a'>Search UBC.ca</List.Item>
            </List>
          </Grid.Column>
          <Grid.Column width={5}>
            <Header inverted as='h4' content='UBC Campuses' />
            <List link inverted>
              <List.Item as='a'>Vancouver Campus</List.Item>
              <List.Item as='a'>Okanagan Campus</List.Item>
            </List>
            <Header inverted as='h4' content='UBC Sites' />
            <List link inverted>
            <List.Item as='a'>Robson Square</List.Item>
              <List.Item as='a'>Centre for Digital Media</List.Item>
              <List.Item as='a'>Faculty of Medicine Across BC</List.Item>
              <List.Item as='a'>Asia Pacific Regional Office</List.Item>
            </List>
          </Grid.Column>
        </Grid>

        <Divider inverted section />
        <List horizontal inverted divided link size='small'>
          <List.Item as='a' href='#'>Emergency Procedures</List.Item>
          <List.Item as='a' href='#'>Terms of Use</List.Item>
          <List.Item as='a' href='#'>UBC Copyright</List.Item>
          <List.Item as='a' href='#'>Accessibility</List.Item>
        </List>
    </Container>
  </Segment>
  )
}

const Protected = () => <h3>Protected</h3>

//Private Route component: 
const PrivateRoute = ({component: Component, ...rest}) => (
  <Route {...rest} render={(props) => (
    basicAuth.isAuthenticated === true 
      ? <Component {...props}/>
      : <Redirect to={{
          pathname: '/login',
          state: {from: props.location}
      }}/>
  )} />
)



class App extends React.Component {
  render() {
    // console.log(this.props);
    return (
      
      <div>
        <StyleComponent />
        <HeaderComponent />
        <MainMenu /> 

        <Container style={{ marginTop: '7em' }}>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/onboarding' component={OnBoarding} />
            <Route exact path='/request_form' component={AccountRequestForm} />
            <Route exact path='/account_requests' component={AccountRequests} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/support' component={ITSupport} />
            <PrivateRoute path='/protected' component={Protected} />
            <Route render={() => <div>Page not found</div>} />
          </Switch>
        </Container>

        <AppFooter />

      </div>
    )
  }
}
// module.exports = App;
export default App;

