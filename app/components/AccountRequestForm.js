import React from 'react'
// import { Button, Checkbox, Form, Input, Radio, Select, TextArea } from 'semantic-ui-react'
import {Form, Button, Confirm} from 'semantic-ui-react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import {labOfficeOptions} from '../utils/staticInfo';

const titleOptions = [
    { text: 'Undergrad', value: 'ugrad' },
    { text: 'Grad Student', value: 'grad' },
    { text: 'Post Doc', value: 'postdoc' },
    { text: 'Staff', value: 'staff' },
    { text: 'Faculty', value: 'faculty' },
]

const durationLength = [
    { text: '3 months', value: '3 months' },
    { text: '6 months', value: '6 months' },
    { text: '1 year', value: '1 year' },
    { text: '2 years', value: '2 years' },
    { text: '3 years', value: '3 years' },    
    { text: '4 years', value: '4 years' },
    { text: '5 years', value: '5 years' },
    { text: '5 years+', value: '5 years+' },
]


const CREATE_ACCOUNT_REQUEST = gql `
    mutation CreateAccountRequest($firstname: String!, $lastname: String!, $email:String!, $title:String!, $lab:String!, $cwl:String!, $duration:String!) {
        createAccountrequest(input: {
            data: {
              firstname: $firstname,
              lastname: $lastname,
              email: $email,
              title: $title,
              lab: $lab,
              status: false,
              cwl: $cwl,
              duration: $duration,
            }
          }) {
            accountrequest {
              firstname
              lastname
              email
              title
              lab
              status
              cwl
              duration
            }
          }
    }
`;

// const CREATE_ACCOUNT_REQUEST = gql `
//     mutation CreateAccountRequest($firstname: String!, $lastname: String!, $email:String!) {
//         createAccountrequest(input: {
//             data: {
//               firstname: $firstname,
//               lastname: $lastname,
//               email: $email,
//             }
//           }) {
//             accountrequest {
//               firstname
//               lastname
//               email
//             }
//           }
//     }
// `;


export default function AccountRequestForm() {


    const [firstName, setFirstName] = React.useState('');
    const [lastName, setLastName] = React.useState('');
    const [cwl, setCwl] = React.useState('');
    const [lab, setLab] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [title, setTitle] = React.useState('');
    const [duration, setDuration] = React.useState('');

    const [submitStatus, setSubmitStatus] = React.useState(false);

    React.useEffect(() => {
        console.log(firstName)
    },[firstName])
    return (
        <div>
                <h3>Send us a request for a M&I Account:</h3>
                <Form>
                    <Form.Group>
                        <Form.Input label='First name' placeholder='First name' name='firstname' onChange={(e) => {setFirstName(e.target.value)}}/>
                        <Form.Input label='Last name' placeholder='Last name' name='lastname'onChange={(e) => {setLastName(e.target.value)}}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Input label='Email' placeholder='example@ubc.ca' name='email' onChange={(e) => {setEmail(e.value)}}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Input label='CWL Username' placeholder='Your CWL username' name='cwl' onChange={(e) => {setCwl(e.target.value)}}/>
                    </Form.Group>                            
                    <Form.Group>
                        <Form.Select label='Title' options={titleOptions} placeholder='Select' name='title' onChange={(e, result) => {setTitle(result.value)}} />
                    </Form.Group>
                    <Form.Group>
                    <Form.Select label='Lab' options={labOfficeOptions} placeholder='Select' name='lab' onChange={(e, result) => {setLab(result.value)}}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Select label='Duration of Stay' options={durationLength} placeholder='Select' onChange={(e, result) => {setDuration(result.value)}}/>
                    </Form.Group>                          
                    {/* <Form.Button content='Submit' /> */}
                </Form>
                <Mutation 
                    mutation={CREATE_ACCOUNT_REQUEST} 
                    variables={{
                        firstname: String(firstName), 
                        lastname: String(lastName), 
                        email: String(email),
                        lab: String(lab),
                        cwl: String(cwl),
                        title: String(title),
                        duration: String(duration),
                    }}
                    onCompleted={console.log("submitted success!")}
                >
                    {(createAccountrequest) => (
                        <Button onClick={() => {createAccountrequest()}}>Submit2</Button>
                    )}
                </Mutation>    
            </div>
    )
}



// class AccountRequestForm extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             firstname: '',
//             lastname: '',
//             email: '',
//             title: '',
//             lab: '',
//             cwl: '',
//             duration: '',
//             success_message_open: false,
//         };

//         this.handleChange = this.handleChange.bind(this);
//         this.handleChangeDropDown = this.handleChangeDropDown.bind(this);
//         this.handleSubmit = this.handleSubmit.bind(this);
//         this.handleConfirm = this.handleConfirm.bind(this);
//         this.showSuccessMessage = this.showSuccessMessage.bind(this);
//     }

//     handleChange(event) {
//         const value = event.target.value;
//         const name = event.target.name;
//         this.setState(() => ({[name] : value}));
//     }

//     handleChangeDropDown(e, result) {
//         const value = result.value;
//         const name = result.name;
//         this.setState(() => ({[name] : value}));
//         // console.log(result);
//         // console.log(value);
//         // console.log(name);
//     }

//     handleSubmit(event, t) {
//         console.log(t);
//         console.log(this.state);
//     }

//     showSuccessMessage() {
//         this.setState({success_message_open: true})
//     }

//     handleConfirm() {
//         this.setState({success_message_open: false});
//         this.props.history.push('/');

//     }

//     render() {
//         const {firstname,lastname,email,title,lab, cwl, duration} = this.state
//         return (
//             <div>
//             <Mutation 
//                 mutation={CREATE_ACCOUNT_REQUEST} 
//                 variables={{firstname, lastname, email, title, lab, cwl, duration}}
//                 onCompleted={this.showSuccessMessage}
//                 // onCompleted={() => this.props.history.push('/')}
//             >
//                 {(createAccountrequest) => (
//                     <div>
//                         <h3>Send us a request for a M&I Account:</h3>
//                         <Form onSubmit={createAccountrequest}>
//                         {/* <Form onSubmit={this.handleSubmit}> */}
//                             <Form.Group>
//                                 <Form.Input label='First name' placeholder='First name' name='firstname' onChange={this.handleChange}/>
//                                 <Form.Input label='Last name' placeholder='Last name' name='lastname'onChange={this.handleChange}/>
//                             </Form.Group>
//                             <Form.Group>
//                                 <Form.Input label='Email' placeholder='example@ubc.ca' name='email' onChange={this.handleChange}/>
//                             </Form.Group>
//                             <Form.Group>
//                                 <Form.Input label='CWL Username' placeholder='Your CWL username' name='cwl' onChange={this.handleChange}/>
//                             </Form.Group>                            
//                             <Form.Group>
//                                 <Form.Select label='Title' value={title} options={titleOptions} placeholder='Select' name='title' onChange={this.handleChangeDropDown}/>
//                             </Form.Group>
//                             <Form.Group>
//                             <Form.Select label='Lab' options={labOfficeOptions} placeholder='Select' name='lab'onChange={this.handleChangeDropDown} />
//                             </Form.Group>
//                             <Form.Group>
//                                 <Form.Select label='Duration of Stay' options={durationLength} placeholder='Select' onChange={this.handleChangeDropDown}/>
//                             </Form.Group>                          
//                             <Form.Button content='Submit' />
//                         </Form>
//                     </div>
//                 )}
//             </Mutation>   

//             <Confirm 
//                 open={this.state.success_message_open}
//                 content='Thank You. We have received your request!'
//                 onConfirm={this.handleConfirm}
//             />
//             </div>
         
//         )
//     }
// }

// export default AccountRequestForm;