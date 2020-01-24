import React from 'react'
// import { Button, Checkbox, Form, Input, Radio, Select, TextArea } from 'semantic-ui-react'
import {Form, Button, Confirm} from 'semantic-ui-react';
import {Mutation} from '@apollo/react-components';
import {useQuery} from '@apollo/react-hooks';
import {gql} from 'apollo-boost';
import {Redirect} from 'react-router-dom';

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

const GET_LABS = gql `
    {
        labs(sort: "name:asc") {
            name
        }
    }
`;

export default function AccountRequestForm() {

    const [firstNameField, setFirstNameField] = React.useState({
        firstName: '',
        errorState: false
    });
    const [lastNameField, setLastNameField] = React.useState({
        lastName: '',
        errorState: false
    });
    const [emailField, setEmailField] = React.useState({
        email: '',
        errorState: false
    });
    const [cwlField, setCwlField] = React.useState({
        cwl: '',
        errorState: false
    })
    const [titleField, setTitleField] = React.useState({
        title: '',
        errorState: false
    })
    const [labField, setLabField] = React.useState({
        lab: '',
        errorState: false,
        otherLabDisabled: true
    })
    const [durationField, setDurationField] = React.useState({
        duration: '',
        errorState: false
    })


    const [submitStatus, setSubmitStatus] = React.useState(false);
    const [toHome, setToHome] = React.useState(false);

    var labOfficeOptions = [];

    function sendOffEmail() {
        let data = new FormData();
        // data.append('to' , 'itsupport@microbiology.ubc.ca');
        data.append('to' , 'eric.lee@ubc.ca');

        data.append('subject', 'New M&I Account Request');
        const body = `You have a new email request.  Details: <br><br> <b>First Name:</b> ${firstName} <br> <b>Last Name:</b> ${lastName} <br> <b>Lab:</b> ${lab} <br><br> Log onto <a href="http://142.103.60.10:1337/admin/">strapi admin</a> for more details.`;
        data.append('text' , body);

        let request = new XMLHttpRequest();
        request.open('POST', 'https://it.microbiology.ubc.ca/email')
        request.send(data);
    }

    // REACT HOOKS: use query to get lab name data:
    const {loading, error, data} = useQuery(GET_LABS);
    if (loading) return 'Loading...';
    if (error) return 'Error!';
    if (data) {
        let labValues = [];
        labValues = data.labs.map(lab => ({text: (lab.name + ' Lab') , value: lab.name}));
        labOfficeOptions = labValues;
        labOfficeOptions.push({ text: 'Other...', value: 'Other' })
    }

    function setLab2(e, result) {
        if (result.value === 'Other') {
            // setOtherLabInputStatus(Boolean(false));
            setLabField({
                ...labField,
                otherLabDisabled:false,
                errorState:false
            })
        } else {
            const otherFieldInput = document.getElementById('other_input');
            otherFieldInput.value = '';
            // console.log(lab);
            // setOtherLabInputStatus(Boolean(true));
            // setLab(result.value);
            setLabField({
                ...labField,
                lab: result.value,
                otherLabDisabled:true,
                errorState:false

            })
        }
    }

    function setField(field, fieldFunction, e) {
        fieldFunction({
            ...field,
            [e.target.name]:e.target.value,
            errorState:false
        })
    }




    return (
        <div>
            <h3>Send us a request for a M&I Account:</h3>
            { (firstNameField.errorState || lastNameField.errorState || emailField.errorState || cwlField.errorState || titleField.errorState || labField.errorState ||durationField.errorState) &&
                <h4 class="ui red header">Please fill in all required fields</h4>
            }
            <Form>
                <Form.Group>
                    {/* <Form.Input label='First name' placeholder='First name' name='firstname' onChange={(e) => {setFirstName(e.target.value)}}/>
                    <Form.Input label='Last name' placeholder='Last name' name='lastname'onChange={(e) => {setLastName(e.target.value)}}/> */}
                    {firstNameField.errorState ? 
                        <Form.Input error label='First name' placeholder='First name' name='firstName' onChange={(e) => {setField(firstNameField, setFirstNameField, e)}}/> 
                        : <Form.Input label='First name' placeholder='First name' name='firstName' onChange={(e) => {setField(firstNameField, setFirstNameField, e)}}/>
                    }
                    {lastNameField.errorState ? 
                        <Form.Input error label='Last name' placeholder='Last name' name='lastName' onChange={(e) => {setField(lastNameField, setLastNameField, e)}}/> 
                        : <Form.Input label='Last name' placeholder='Last name' name='lastName' onChange={(e) => {setField(lastNameField, setLastNameField, e)}}/>
                    }                    
                </Form.Group>
                <Form.Group>
                    {emailField.errorState ? 
                        <Form.Input error label='Email' placeholder='example@ubc.ca' name='email' onChange={(e) => {setField(emailField, setEmailField, e)}}/> 
                        :<Form.Input label='Email' placeholder='example@ubc.ca' name='email' onChange={(e) => {setField(emailField, setEmailField, e)}}/> 
                    }   
                </Form.Group>
                <Form.Group>
                    {cwlField.errorState ? 
                        <Form.Input error label='CWL Username' placeholder='Your CWL username' name='cwl' onChange={(e) => {setField(cwlField, setCwlField, e)}}/> 
                        :<Form.Input label='CWL Username' placeholder='Your CWL username' name='cwl' onChange={(e) => {setField(cwlField, setCwlField, e)}}/> 
                    }   
                </Form.Group>                            
                <Form.Group>
                    {titleField.errorState ? 
                        <Form.Select error label='Title' options={titleOptions} placeholder='Select' name='title' onChange={(e) => {setField(titleField, setTitleField, e)}}/> 
                        :<Form.Select label='Title' options={titleOptions} placeholder='Select' name='title' onChange={(e) => {setField(titleField, setTitleField, e)}}/>                         
                    }   
                </Form.Group>
                <Form.Group>
                    {/* <Form.Select label='Lab' options={labOfficeOptions} placeholder='Select' name='lab' onChange={(e, result) => {setLab2(e, result)}}/> */}
                    {labField.errorState ? 
                        <Form.Select error label='Lab' options={labOfficeOptions} placeholder='Select' name='lab' onChange={(e, result) => {setLab2(e, result)}}/>
                        :<Form.Select label='Lab' options={labOfficeOptions} placeholder='Select' name='lab' onChange={(e, result) => {setLab2(e, result)}}/>
                    }                       
                    <Form.Input id="other_input" disabled={labField.otherLabDisabled} label='Other Lab' name='lab' placeholder='Other Lab...' onChange={(e) => {setField(labField, setLabField)}}/>
                </Form.Group>
                <Form.Group>
                    {durationField.errorState ? 
                        <Form.Select error label='Duration of Stay' options={durationLength} placeholder='Select' name='duration' onChange={(e) => {setField(durationField, setDurationField, e)}}/> 
                        :<Form.Select label='Duration of Stay' options={durationLength} placeholder='Select' name='duration' onChange={(e) => {setField(durationField, setDurationField, e)}}/> 
                    }   
                </Form.Group>                          
            </Form>

            <Mutation 
                mutation={CREATE_ACCOUNT_REQUEST} 
                    variables={{
                        firstname: String(firstNameField.firstName), 
                        lastname: String(lastNameField.lastName), 
                        email: String(emailField.email),
                        cwl: String(cwlField.cwl),
                        title: String(titleField.title),
                        lab: String(labField.lab),
                        duration: String(durationField.duration),
                    }}
                    onCompleted={() => { setSubmitStatus(true)}}
            >
                {(createAccountrequest) => (
                    <Button onClick={() => {
                        // createAccountrequest()
                        // sendOffEmail();
                        if(firstNameField.firstName === '') setFirstNameField({...firstNameField, errorState:true});
                        if(lastNameField.lastName === '') setLastNameField({...lastNameField, errorState:true});
                        if(emailField.email === '') setEmailField({...emailField, errorState:true});
                        if(cwlField.cwl === '') setCwlField({...cwlField, errorState:true});
                        if(titleField.title === '') setTitleField({...titleField, errorState: true});
                        if(labField.lab === '') setLabField({...labField, errorState:true});
                        if(durationField.duration === '') setDurationField({...durationField , errorState:true});
                    }}>
                        Submit
                    </Button>
                )}
            </Mutation>
            <Confirm 
                open={submitStatus}
                content='Thank You. We have received your request!'
                onConfirm={() => {
                    setSubmitStatus(false);
                    setToHome(true);
                }}
            />  
            { toHome 
                ? <Redirect to='/' />
                : null
            }
        </div>
    )
}

