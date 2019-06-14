import React from 'react';
import {Segment, Menu, Grid, Header, Icon, SearchCategory} from 'semantic-ui-react';
import {Query} from 'react-apollo';
import gql from 'graphql-tag';
import ReactMarkdown from 'react-markdown';
import {NavLink, Route} from 'react-router-dom';

const DOCUMENT_CONTENT_QUERY = gql `
    query Docs ($url_path: String!) {
        docs(where:{url_path: $url_path}) {
            title
            content
          }
    }
`;

const SIDE_MENU_QUERY = gql `
    query SideMenu {
        docucategories {
            _id
            name
            docs {
                _id
                title
                url_path
            }
        }
    }
`

// SideMenu: stateless functional component that renders out the side menu
// Takes in props which contain results from graphql query for document categories.
// Props include: graphql query results, activeItem, clickevent handler
function SideMenu (props) {
    console.log('DOC CATEGORIES:');
    console.log(props.docucategories);
    return (
        <Menu vertical>
        {props.docucategories.map((category) => (
            <Menu.Item key={category._id}>
                <Menu.Header>{category.name}</Menu.Header>
                <Menu.Menu>
                    {category.docs.map((doc) => (
                        <Menu.Item
                            key={doc._id}
                            name={doc.title}
                            as={NavLink}
                            to={`/support/${doc.url_path}`}
                        />
                    ))}
                </Menu.Menu>
            </Menu.Item>
        ))}       
        </Menu>
    )
}

function SupportDocument(props) {
    return (
        <Query query = {DOCUMENT_CONTENT_QUERY} variables={{url_path: props.match.params.url_path}}>
        {
            ({loading, error, data}) => 
                {
                    if (loading) return <p>Loading...</p>
                    if (error) return <p>Error: Failed to Retrieve Support Documents</p>
                    const dataToRender = data.docs
                    return (
                        <div>
                            <Segment>
                                <ReactMarkdown source={dataToRender[0].content} />
                            </Segment>  
                        </div>
                    )
                }
        }
        </Query>  
    )
}

function DefaultSupportSegment() {
    return (
        <Segment color='green'>
            Please navigate the side menu to find your support documents!
        </Segment>
    )
}

class ITSupport extends React.Component {
    constructor(props) {
        super(props);
    }

    handleMenuClick = (id, title,  e) => {
        console.log(id);
        console.log(title);
        console.log(e);
    }

    render() {
        return (
            <div>
            <Header as='h2'>
                <Icon name='desktop' />
                <Header.Content>
                Department Support
                <Header.Subheader>Microbiology & Immunology</Header.Subheader>
                </Header.Content>
            </Header>                
            <Grid>
                <Grid.Column width ={3}>
                {/* <Menu vertical> */}
                <Query query = {SIDE_MENU_QUERY} >
                    {
                        ({loading, error, data}) => 
                            {
                                if (loading) return <p>Loading...</p>
                                if (error) return <p>Error!</p>
                                const dataToRender = data.docucategories
                                return (
                                    <div>
                                        {/* <SideMenu docucategories={dataToRender} activeItem={activeItem} handleClick={this.handleMenuClick}/> */}
                                        <SideMenu docucategories={dataToRender}/>

                                    </div>
                                )
                            }
                    }
                </Query>
                </Grid.Column>

                <Grid.Column stretched width={13}>
                    <Route path='/support/:url_path' component={SupportDocument}/>
                    <Route exact path='/support/' component={DefaultSupportSegment}/>                
                </Grid.Column>
                
            </Grid>
            </div>
        )
    }
}

export default ITSupport;