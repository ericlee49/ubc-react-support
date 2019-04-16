import React from 'react';
import {Button, Divider, Container, Header} from 'semantic-ui-react';
import {Link} from 'react-router-dom';

class Home extends React.Component {
    render() {
        return (
            <div>
                <h1>Welcome to the UBC M&I Internal Support Site</h1>
                <Button as={Link} to='/onboarding'>Go to On-Boarding</Button>
                <Button as={Link} to='/request_form'>M&I Account Request Form</Button>
                <Divider section />

                <Container textAlign='left'>
                    <Header as='h5'>Microbiology & Immunology</Header>
                    <p>
                        Faculty of Science <br/> 1365 - 2350 Headlth Sciences Mall <br/> Vancouver, British Columbia Canada V6T 1Z3
                    </p>
                </Container>

            </div>
        )
    }
}

export default Home;