import React from 'react'
import { Button, Checkbox, Form, Input, Radio, Select, TextArea } from 'semantic-ui-react'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import { create } from 'domain';

const titleOptions = [
    { key: 'u', text: 'Undergrad', value: 'ugrad' },
    { key: 'g', text: 'Grad Student', value: 'grad' },
    { key: 'p', text: 'Post Doc', value: 'postdoc' },
    { key: 's', text: 'Staff', value: 'staff' },
    { key: 'f', text: 'Faculty', value: 'faculty' },
]

const labOfficeOptions = [
    { key: 'g', text: 'Gold Lab', value: 'gold' },
    { key: 'admin' , text: 'Administrator', value: 'admin'},
    { key: 'j' , text:'Johnson Lab', value:'johnson'}
]

const CREATE_ACCOUNT_REQUEST = gql `
    mutation CreateAccountRequest($firstname: String!, $lastname: String!, $email:String!, $title:String!, $labOffice:String!) {
        createAccountrequest(input: {
            data: {
              firstname: $firstname,
              lastname: $lastname,
              email: $email,
              title: $title,
              laboffice: $labOffice,
              status: false,
            }
          }) {
            accountrequest {
              firstname
              lastname
              email
              title
              laboffice
              status

            }
          }
    }
`;

class AccountRequestForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstname: '',
            lastname: '',
            email: '',
            title: '',
            labOffice: '',

        };

        this.handleChange = this.handleChange.bind(this);
        this.handleChangeDropDown = this.handleChangeDropDown.bind(this);
    }

    handleChange(event) {
        const value = event.target.value;
        const name = event.target.name;
        this.setState(() => ({[name] : value}));
    }

    handleChangeDropDown(e, result) {
        const value = result.value;
        const name = result.name;
        this.setState(() => ({[name] : value}));
        // console.log(result);
        // console.log(value);
        // console.log(name);
    }

    handleSubmit(event, t) {
        console.log(t);
    }

    render() {
        const {firstname,lastname,email,title,labOffice} = this.state
        return (
            <Mutation 
                mutation={CREATE_ACCOUNT_REQUEST} 
                variables={{firstname, lastname, email, title, labOffice}}
                onCompleted={() => this.props.history.push('/')}
            >
                {(createAccountrequest) => (
                    <div>
                        <h3>Send us a request for a M&I Account:</h3>
                        <Form onSubmit={createAccountrequest}>
                        {/* <Form onSubmit={this.handleSubmit}> */}
                            <Form.Group>
                                <Form.Input label='First name' placeholder='First name' name='firstname' onChange={this.handleChange}/>
                                <Form.Input label='Last name' placeholder='Last name' name='lastname'onChange={this.handleChange}/>
                            </Form.Group>
                            <Form.Group>
                                <Form.Input label='Email' placeholder='example@ubc.ca' name='email' onChange={this.handleChange}/>
                            </Form.Group>
                            <Form.Group>
                                <Form.Select label='Title' value={title} options={titleOptions} placeholder='Select' name='title' onChange={this.handleChangeDropDown}/>
                            </Form.Group>
                            <Form.Group>
                            <Form.Select label='Office / Lab' options={labOfficeOptions} placeholder='Select' name='labOffice'onChange={this.handleChangeDropDown} />
                            </Form.Group>
                            <Form.Button content='Submit' />
                        </Form>
                    </div>
                )}
            </Mutation>

        )
    }
}

export default AccountRequestForm;