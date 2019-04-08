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
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import {Container, Segment} from 'semantic-ui-react';
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

const Public = () => <h3>Public</h3>
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
        <Segment
            inverted
            textAlign='center'
            style={{ minHeight: 200, padding: '1em 0em' }}
            vertical
          >
        </Segment>
        <MainMenu/> 
        <Container style={{ marginTop: '7em' }}>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/onboarding' component={OnBoarding} />
            <Route exact path='/request_form' component={AccountRequestForm} />
            <Route exact path='/account_requests' component={AccountRequests} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/public' component={Public} />
            <PrivateRoute path='/protected' component={Protected} />
            <Route render={() => <div>Page not found</div>} />
          </Switch>
        </Container>

      </div>


      
    )
  }
}
// module.exports = App;
export default App;

