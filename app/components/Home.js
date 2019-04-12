import React from 'react';
import {Button} from 'semantic-ui-react';
import {Link} from 'react-router-dom';

class Home extends React.Component {
    render() {
        return (
            <div>
                <h1>Welcome to the UBC M&I Internal Support Site</h1>
                <Button as={Link} to='/onboarding'>Go to On-Boarding</Button>
                <Button as={Link} to='/request_form'>M&I Account Request Form</Button>
            </div>
        )
    }
}

export default Home;