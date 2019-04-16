import React from 'react';
import {Segment, Menu, Grid, Header, Icon} from 'semantic-ui-react';



class ITSupport extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeItem: ''
        };
    }

    render() {
        return (
            <div>
            <Header as='h2'>
                <Icon name='desktop' />
                <Header.Content>
                Department Support
                <Header.Subheader>Find solutions to your queries</Header.Subheader>
                </Header.Content>
            </Header>                
            <Grid>
                <Grid.Column width ={3}>
                <Menu vertical>
                    <Menu.Item>
                        <Menu.Header>General</Menu.Header>
                        <Menu.Menu>
                            <Menu.Item name='general1'/>
                            <Menu.Item name='general2'/>
                        </Menu.Menu>
                    </Menu.Item>

                    <Menu.Item>
                        <Menu.Header>Printing</Menu.Header>
                        <Menu.Menu>
                            <Menu.Item name='printer1'/>
                            <Menu.Item name='printer2'/>
                        </Menu.Menu>
                    </Menu.Item>         

                    <Menu.Item>
                        <Menu.Header>Internet & Network</Menu.Header>
                        <Menu.Menu>
                            <Menu.Item name='internet1'/>
                            <Menu.Item name='internet2'/>
                        </Menu.Menu>
                    </Menu.Item>                         
                </Menu>                 
                </Grid.Column>

                <Grid.Column stretched width={13}>
                    <Segment>
                        This is an stretched grid column. This segment will always match the tab height
                    </Segment>                
                </Grid.Column>
            </Grid>
            </div>
        )
    }
}

export default ITSupport;