import React from 'react';
import {Table, Modal, Button, Form, Checkbox, Label} from 'semantic-ui-react';
import { Query , Mutation} from 'react-apollo';
import gql from 'graphql-tag';
import {CSVLink, CSVDownload} from 'react-csv';
import withAuth from './withAuth';

const ACCOUNTREQUESTS_QUERY = gql `
    {
        accountrequests {
            _id
            firstname
            lastname
            title
            lab
            email
            status
            duration
            cwl
        }
    }
`;

const UPDATE_ACCOUNT_REQUEST = gql `
    mutation UpdateAccountRequest($firstname: String!, $_id: ID!, $lastname: String!, $email: String!, $status: Boolean!, $title: String!, $lab: String!, $duration: String!, $cwl: String!) {
        updateAccountrequest(input: {
            where: {
                id: $_id
            },
            data: { 
              firstname: $firstname,
              lastname: $lastname,
              email: $email,
              status: $status,
              title: $title,
              lab: $lab,
              cwl: $cwl,
              duration: $duration,
            }
          }) {
            accountrequest {
              firstname
              lastname
              email
              status
              title
              lab
              cwl
              duration
            }
          }
    }
`;

//Test data
const REQUESTS = [
    {
        firstname: "Bill",
        lastname: "Johnson",
        email: "billjohn@gmail.com",
        title: "grad",
        lab: "mohn",
        status: false,
    },
    {
        firstname: "Eric",
        lastname: "Lee",
        email: "ericlee@gmail.com",
        title: "ugrad",
        lab: "johnson",
        status: false,
    },
    {
        firstname: "Jim",
        lastname: "Dean",
        email: "jimmyd@hotmail.com",
        title: "postdoc",
        lab: "gold",
        status: false,
    },
]

export const handleClick2 = (data) => {
    console.log(data)
}


//Stateless functional component to Render Table:
function RequestTableBody (props) {
    // console.log(props.data);
    return (
        props.data.map((req) => 
            <Table.Row key={req._id}>
                <Table.Cell>{req.firstname}</Table.Cell>
                <Table.Cell>{req.lastname}</Table.Cell>
                <Table.Cell>{req.email}</Table.Cell>
                <Table.Cell>{req.title}</Table.Cell>
                <Table.Cell>{req.lab}</Table.Cell>
                {req.status ? <Table.Cell positive>Complete</Table.Cell> : <Table.Cell negative>Pending</Table.Cell>}
                <Table.Cell>
                    <Button 
                        content='hello'
                        onClick={handleClick2.bind(this, req)}
                    />
                </Table.Cell>
            </Table.Row>
        )
    )
}

//Table Header Component:
function RequestTableHeader() {
    return (
        <Table.Header>
        <Table.Row>
            <Table.HeaderCell>First Name</Table.HeaderCell>
            <Table.HeaderCell>Last Name</Table.HeaderCell>
            <Table.HeaderCell>Email</Table.HeaderCell>
            <Table.HeaderCell>Title</Table.HeaderCell>
            <Table.HeaderCell>Lab</Table.HeaderCell>
            <Table.HeaderCell>Status</Table.HeaderCell>
            <Table.HeaderCell>CWL</Table.HeaderCell>
            <Table.HeaderCell>Duration</Table.HeaderCell>
            <Table.HeaderCell></Table.HeaderCell>
        </Table.Row>
        </Table.Header>  
    )
}

class AccountRequest extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            open: false,
            _id: '',
            firstname: '',
            lastname:'',
            lab: '',
            status: false,
            title: '',
            email: '',
            cwl: '',
            duration: '',
        };
        
        this.close = this.close.bind(this);
        this.rowButtonOnClick = this.rowButtonOnClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.toggle = this.toggle.bind(this);
    }
    
    // Helper function to close modal
    close() {
        this.setState({
            open:false
        })
        window.location.reload();
    }

    // Helper function to open modal with 
    rowButtonOnClick(data) {
        this.setState({
            // add data to state for modal to display
            _id : data._id,
            firstname : data.firstname,
            lab : data.lab,
            lastname : data.lastname,
            status: data.status,
            email: data.email,
            title: data.title,
            cwl: data.cwl,
            duration: data.duration,
            // set modal to open
            open : true,
        })


    }

    handleChange(event) {
        const value = event.target.value;
        const name = event.target.name;
        // const name = event.target.name;
        this.setState(() => ({[name] : value}));
    }

    toggle() {
        this.setState(() => ({status: !this.state.status}))
    }

    render() {
        const {open, firstname, lastname, email, lab, _id, title, status, cwl, duration} = this.state;   
        return (
            <div>
                <Mutation
                    mutation={UPDATE_ACCOUNT_REQUEST}
                    variables={{firstname, _id, lastname, email, title, status, lab, cwl, duration}}
                    onCompleted={() => this.close()}
                >
                    {(updateAccountrequest) => (
                    <Modal size='tiny' open={open} onClose={this.close} closeIcon>
                        <Modal.Header>Request Details</Modal.Header>
                        <Modal.Content>                        
                            <Form>
                                <Form.Input fluid label='Request id'>{_id}</Form.Input>
                                <Form.Input fluid label='First name' name='firstname' value={firstname} onChange={this.handleChange}/>
                                <Form.Input fluid label='Last name' name='lastname' value={lastname} onChange={this.handleChange}/>  
                                <Form.Input fluid label='Lab' name='lab' value={lab} onChange={this.handleChange}/>
                                <Form.Input fluid label='Email' name='email' value={email} onChange={this.handleChange}/>
                                <Form.Input fluid label='Title' name='title' value={title} onChange={this.handleChange}/>
                                <Form.Input fluid label='CWL' name='cwl' value={cwl} onChange={this.handleChange}/>
                                <Form.Input fluid label='Duration of Stay' name='duration' value={duration} onChange={this.handleChange}/>
                                <Form.Input fluid label='Status'>
                                    <Checkbox toggle color='red' checked={status} onChange={this.toggle}/>
                                    {status ? 
                                        <Label circular color='green'>Complete</Label> 
                                        : <Label circular color='red'>Pending</Label>
                                    }
                                </Form.Input>

                            </Form>
                        </Modal.Content>
                        <Modal.Actions>
                            <Button color='black' onClick={updateAccountrequest}>
                            {/* <Button color='black' onClick={console.log(this.state)}>                             */}
                                Submit Changes
                            </Button>
                        </Modal.Actions>
                    </Modal>
                    )}               

                </Mutation>
                <h3>M&I Account Requests</h3>
                <Query query = {ACCOUNTREQUESTS_QUERY}>
                    {
                        ({loading, error, data}) =>
                            {
                                if (loading) return <p>Fetching...</p>
                                if (error) return <p>error!</p>
                                const dataToRender = data.accountrequests;
                                return (
                                    <div>
                                    <Table celled selectable>
                                        <RequestTableHeader />
                                        <Table.Body>
                                            {/* <RequestTableBody data={dataToRender} /> */}
                                            {dataToRender.map((data) => (
                                                <Table.Row key={data._id}>
                                                    <Table.Cell>{data.firstname}</Table.Cell>
                                                    <Table.Cell>{data.lastname}</Table.Cell>
                                                    <Table.Cell>{data.email}</Table.Cell>
                                                    <Table.Cell>{data.title}</Table.Cell>
                                                    <Table.Cell>{data.lab}</Table.Cell>
                                                    {data.status ? <Table.Cell positive>Complete</Table.Cell> : <Table.Cell negative>Pending</Table.Cell>}
                                                    <Table.Cell>{data.cwl}</Table.Cell>
                                                    <Table.Cell>{data.duration}</Table.Cell>
                                                    <Table.Cell>
                                                        <Button 
                                                            content='edit'
                                                            onClick={this.rowButtonOnClick.bind(this,data)}
                                                        />
                                                    </Table.Cell>
                                                </Table.Row>                                                
                                            ))}                                            
                                        </Table.Body>
                                    </Table>
                                    <CSVLink data={dataToRender} >Export to CSV</CSVLink>
                                    </div>
                                )
                            }
                    }
                    </Query>                    
            </div>


        );
    }
}

// export default AccountRequest;
export default withAuth(AccountRequest);