import React from 'react';
import Home from './Home';
import OnBoarding from './OnBoarding';
import AccountRequestForm from './AccountRequestForm';
import AccountRequests from './AccountRequests';
import Login from './Login';
import ITSupport from './ITSupport';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import {Container} from 'semantic-ui-react';
// import ProtectedComp from './Protected';
import {loggedIn} from '../utils/auth.js';
import UBCFooter from './UBCFooter';
import MainMenu from './HeaderAndMenu';



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

//Private Route component: 
const PrivateRoute = ({component: Component, ...rest}) => (
  <Route {...rest} render={(props) => (
    loggedIn() === true 
      ? <Component {...props}/>
      : <Redirect to={{
          pathname: '/login',
          state: {from: props.location}
      }}/>
  )} />
)

class App extends React.Component {

  render() {
    return (
      <div>
        <StyleComponent />

        <MainMenu /> 

        <Container style={{ marginTop: '7em' }}>
          <Switch>
            <Route exact path='/' component={Home} />
            <PrivateRoute exact path='/onboarding' component={OnBoarding} />
            <Route exact path='/request_form' component={AccountRequestForm} />
            <PrivateRoute exact path='/account_requests' component={AccountRequests} />
            <Route exact path='/login' component={Login} />
            <Route path='/support' component={ITSupport} />
            {/* <PrivateRoute path='/protectedcomp' component={ProtectedComp} /> */}
            <Route path='/admin' component={() => { 
              window.location.href = 'http://142.103.60.10:1337/admin/auth/login'; 
              return null;
            }}/>            
            <Route render={() => <div>Page not found</div>} />


          </Switch>
        </Container>

        <UBCFooter />

      </div>
    )
  }
}

export default App;

