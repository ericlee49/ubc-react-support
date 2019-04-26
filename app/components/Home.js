import React from 'react';
import {Button, Divider, Container, Header, Segment, Grid} from 'semantic-ui-react';
import {Link} from 'react-router-dom';

class Home extends React.Component {
    render() {
        return (
            <div>
                <h1>Welcome to the UBC M&I Support Site</h1>

                <Divider
                    as='h4'
                    className='header'
                    horizontal
                    style={{textTransform: 'uppercase' }}
                >
                    <a>Quick Help</a>
                </Divider>
                <Segment vertical>
                <Grid celled='internally' columns='equal' stackable>
                    <Grid.Row textAlign='center'>
                    <Grid.Column style={{ paddingBottom: '2em', paddingTop: '2em' }}>
                        <h3>New to the Department?</h3>
                        <p style={{ fontSize: '1.33em' }}>Get started with our On-boarding Steps and Information:</p>
                        <Button as={Link} to='/onboarding'>Go to On-Boarding</Button>
                    </Grid.Column>
                    <Grid.Column style={{ paddingBottom: '2em', paddingTop: '2em' }}>
                        <h3>Need an M&I Department Account?</h3>
                        <p style={{ fontSize: '1.33em' }}>Send your request here:</p>
                        <Button as={Link} to='/request_form'>M&I Account Request Form</Button>
                    </Grid.Column>
                    </Grid.Row>
                </Grid>    
                </Segment>
                <Container textAlign='left' style={{ paddingBottom: '2em', paddingTop: '2em' }}>
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