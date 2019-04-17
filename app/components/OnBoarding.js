// var React = require('react');
import React from 'react';
import {Segment, Dimmer, Loader, List, Container, Divider, Tab} from 'semantic-ui-react';
import PropTypes from 'prop-types';
// import {fetchOnBoardingContent} from '../utils/api';
import ReactMarkdown from 'react-markdown';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

// const ONBOARDING_QUERY = gql `
//     query Onboardings($tag: String!){
//         onboardings(where:{tag_contains:$tag}) {
//             _id
//             title
//             content
//         }
//     }
// `;

const ONBOARDING_QUERY = gql `
 query Onboardings ($tag: String!) {
        onboardings(where:{tag_contains: $tag}) {
            _id
            title
            content
        }
    }
`;

// Horizontal List-menu for filtering userTypes
function SelectOnBoardType (props) {
    var userType = ['Student' , 'Staff', 'Volunteer' ,'Faculty'];
    return (
        <List link divided size='large' horizontal>
            {userType.map(function (type) {
                return (
                    <List.Item
                        active={type === props.selectedUserType ? true : false}
                        key={type}
                        onClick={props.onSelect.bind(null, type)}
                        as='a'> 
                        <h2>{type}</h2>
                    </List.Item>
                )
            }, this)}
        </List>                
    )

}

// DocsGrid is the container that has the onboarding title and content
function DocsGrid (props) {
    return (
        props.docs.map((currDoc) => (
            <div>
            <Container textAlign='justified' key={currDoc._id}>
                <Segment raised>
                    <h3>{currDoc.title}</h3>
                    <Divider/>
                    {/* <p>{currDoc.content}</p> */}
                    <ReactMarkdown source={currDoc.content} />
                </Segment>
            </Container>
            <Divider hidden/>
            </div>
        ))
        
    )
}


DocsGrid.propTypes = {
    docs: PropTypes.array.isRequired,
};

SelectOnBoardType.propTypes = {
    selectedUserType: PropTypes.string.isRequired,
    onSelect: PropTypes.func.isRequired,
};


class OnBoarding extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            selectedUserType: "Student",
            onBoardingDocs: null,
            tag: "Student",
        };

        this.updateUserType = this.updateUserType.bind(this);
    }

    // componentDidMount () {
    //     // fetchOnBoardingContent()
    //     //     .then(function (onBoardingDocs) {
    //     //         console.log(onBoardingDocs);
    //     //     }); 
    //     // fetchOnBoardingContent()
    //     //     .then ( (onBoardingDocs) => {
    //     //         console.log(onBoardingDocs)
    //     //         this.setState(() => ({
    //     //             onBoardingDocs: onBoardingDocs
    //     //         })
    //     //     ));
    //     fetchOnBoardingContent()
    //         .then((docs) => {
    //             console.log(docs.data);
    //             this.setState({onBoardingDocs: docs.data});
    //             // console.log(this.state.onBoardingDocs);
    //         })
    // }

    updateUserType(uType) {
        this.setState(function() {
            return {
                selectedUserType: uType,
                tag: uType,
            }
        });
    }

    render() {
        var userType = ['Student' , 'Staff', 'Volunteer' ,'Faculty'];
        const onboardingsToRender = [
            {
                id: '1',
                title: 'Onboarding Title 1',
                content: 'The quick brown fox jumps over the lazy dog.'
            },
            {
                id: '2',
                title: 'Onboarding Title 2',
                content: 'The quick brown fox jumps over the lazy dog.'
            }
        ]

        // const tag = "student"
        const {tag} = this.state;
        return (
            <div>
                {/* <p>Selected Type: {this.state.selectedUserType}</p> */}
                <SelectOnBoardType 
                    selectedUserType={this.state.selectedUserType}
                    onSelect={this.updateUserType}/>

                <Query query = {ONBOARDING_QUERY} variables={{tag}} >
                    {
                        ({loading, error, data}) =>
                            {
                                if (loading) return <p>Fetching...</p>
                                if (error) return <p>Error!</p>
                                const dataToRender = data.onboardings
                                return (
                                    <div>
                                        <DocsGrid docs={dataToRender} />
                                    </div>
                                )
                            }
                    }
                </Query>
                {/* <DocsGrid2 docs={onBoardingsToRender}/> */}
                    
            </div>
        )
    } 
}

// module.exports = StudentOnBoarding;
export default OnBoarding;