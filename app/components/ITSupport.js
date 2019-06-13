import React from 'react';
import {Segment, Menu, Grid, Header, Icon, SearchCategory} from 'semantic-ui-react';
import {Query} from 'react-apollo';
import gql from 'graphql-tag';
import ReactMarkdown from 'react-markdown';


// const DOCUMENT_CONTENT_QUERY = gql `
//     query DocContent ($id: String!) {
//         doc(id: "1") {
//             content
//         }
//     }
// `;

const DOCUMENT_CONTENT_QUERY = gql `
    query Docs ($id: String!) {
        docs(where:{_id: $id}) {
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
            }
        }
    }
`

const it_documents = [
    {
      "name": "General",
      "docs": [
        {
          "_id": "123",  
          "title": "General Documentation 1",
          "content": "\"Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem."
        }
      ]
    },
    {
      "name": "Printing",
      "docs": [
        {
          "_id": "456",  
          "title": "Printing 1",
          "content": "But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain,"
        },
        {
          "_id": "789",  
          "title": "Printing 2",
          "content": "But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain,"
        }
      ]
    }
  ];



// SideMenu: stateless functional component that renders out the side menu
// Takes in props which contain results from graphql query for document categories.
// Props include: graphql query results, activeItem, clickevent handler
function SideMenu (props) {
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
                            active={props.activeItem === doc.title}
                            onClick={(e) => props.handleClick(doc._id, doc.title, e) }
                        />
                    ))}
                </Menu.Menu>
            </Menu.Item>
        ))}       
        </Menu>
    )
}

class ITSupport extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeItem: 'General Documentation',
            activeItemId: '5d029801e18d4444c41393b2'
        };
    }

    handleMenuClick = (id, title,  e) => {
        console.log(id);
        console.log(title);
        console.log(e);
        this.setState(() => {
            return {
                activeItem: title,
                activeItemId: id
            };
        });
    }

    render() {
        const {activeItem, activeItemId} = this.state;

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
                                        <SideMenu docucategories={dataToRender} activeItem={activeItem} handleClick={this.handleMenuClick}/>
                                    </div>
                                )
                            }
                    }
                </Query>
                {/* {it_documents.map((cat) => {
                    return (
                        <Menu.Item key={cat.name}>
                            <Menu.Header>{cat.name}</Menu.Header>
                            <Menu.Menu>
                            {cat.docs.map((docs) => {
                                return (
                                    <Menu.Item
                                        key={docs._id}
                                        name={docs.title}
                                        active={activeItem === docs.title}
                                        onClick={(e) => this.handleMenuClick(docs._id, docs.title, e)}
                                    >
                                        {docs.title}
                                    </Menu.Item>    
                                )
                            })}
                            </Menu.Menu>

                        </Menu.Item>
                    )
                })}                
                </Menu> */}

                </Grid.Column>

                <Grid.Column stretched width={13}>
                {/* <Query query = {DOCUMENT_CONTENT_QUERY} variables={{id : "1"}}> */}
                <Query query = {DOCUMENT_CONTENT_QUERY} variables={{id: activeItemId}}>
                    {
                        ({loading, error, data}) => 
                            {
                                if (loading) return <p>Loading...</p>
                                if (error) return <p>Error: GraphQL query failed at getting doc content!</p>
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
                </Grid.Column>
            </Grid>
            </div>
        )
    }
}

export default ITSupport;