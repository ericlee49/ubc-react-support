import React from 'react';
import {Segment, Container, Grid, Header, List, Divider, Image} from 'semantic-ui-react';


class UBCFooter extends React.Component {
    render(){
        return (
        <Segment
            inverted
            vertical
            id='footerStyle'
        >
            <Container textAlign='left'>
            <Grid divided inverted stackable>
                <Grid.Column width={7}>
                <Image src='/app/assets/ubc_full_logo.png' size='medium' />
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
                <List.Item as='a' href='#'>Hello world</List.Item>

            </List>
        </Container>
        </Segment>
        )
    }
}

export default UBCFooter;