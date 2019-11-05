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

var labOfficeOptions = [    
    { text: 'Gold Lab', value: 'gold' },
    { key: 'admin' , text: 'Administrator', value: 'admin'},
    { key: 'j' , text:'Johnson Lab', value:'johnson'},
    { key: 'h' , text:'Harder Lab', value:'harder'},
    { key: 'ho' , text:'Horwitz Lab', value:'horwitz'},
    { key: 'ab' , text:'Abraham Lab', value:'abraham'},
    { key: 'o' , text:'Osborne Lab', value:'osborne'},
    { key: 'je' , text:'Jean Lab', value:'jean'},
    { key: 'b' , text:'Beatty Lab', value:'beatty'},
    { key: 'm' , text:'Murphy Lab', value:'murphy'},
    { key: 'mo' , text:'Mohn Lab', value:'mohn'},
    { key: 'f' , text:'Fernandez Lab', value:'fernandez'},
    { key: 'ga' , text:'Gaynor Lab', value:'gaynor'},
    { key: 'ha' , text:'Hallam Lab', value:'hallam'},
    { key: 's' , text:'Smit Lab', value:'smit'},
    { key: 'd' , text:'Davies Lab', value:'davies'},
    { key: 't' , text:'Tocheva Lab', value:'tocheva'},
    { key: 'tr' , text:'Tropini Lab', value:'tropini'},
    { key: 'av' , text:'Av-gay Lab', value:'avgay'},
];  


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

    const [firstName, setFirstName] = React.useState('');
    const [lastName, setLastName] = React.useState('');
    const [cwl, setCwl] = React.useState('');
    const [lab, setLab] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [title, setTitle] = React.useState('');
    const [duration, setDuration] = React.useState('');

    const [submitStatus, setSubmitStatus] = React.useState(false);
    const [toHome, setToHome] = React.useState(false);

    const {loading, error, data} = useQuery(GET_LABS);
    if (loading) return 'Loading...';
    if (error) return 'Error!';
    if (data) {
        let labValues = [];
        // console.log(data.labs);
        labValues = data.labs.map(lab => ({text: (lab.name + ' Lab') , value: lab.name}));
        console.log(labValues);
        labOfficeOptions = labValues;
    }

    return (
        <div>
            <h3>Send us a request for a M&I Account:</h3>
            <Form>
                <Form.Group>
                    <Form.Input label='First name' placeholder='First name' name='firstname' onChange={(e) => {setFirstName(e.target.value)}}/>
                    <Form.Input label='Last name' placeholder='Last name' name='lastname'onChange={(e) => {setLastName(e.target.value)}}/>
                </Form.Group>
                <Form.Group>
                    <Form.Input label='Email' placeholder='example@ubc.ca' name='email' onChange={(e) => {setEmail(e.target.value)}}/>
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
                    onCompleted={() => { setSubmitStatus(true)}}
                >
                    {(createAccountrequest) => (
                        <Button onClick={() => {createAccountrequest()}}>Submit2</Button>
                    )}
                </Mutation>
            <Confirm 
                open={submitStatus}
                content='Thank You. We have received your request!'
                onConfirm={() => {
                    setSubmitStatus(false)
                    setToHome(true);
                }}
            />  
            { toHome 
                ? <Redirect to='/' />
                : null
            }
        </div>
        // <div>
        //         <h3>Send us a request for a M&I Account:</h3>
        //         <Form>
        //             <Form.Group>
        //                 <Form.Input label='First name' placeholder='First name' name='firstname' onChange={(e) => {setFirstName(e.target.value)}}/>
        //                 <Form.Input label='Last name' placeholder='Last name' name='lastname'onChange={(e) => {setLastName(e.target.value)}}/>
        //             </Form.Group>
        //             <Form.Group>
        //                 <Form.Input label='Email' placeholder='example@ubc.ca' name='email' onChange={(e) => {setEmail(e.target.value)}}/>
        //             </Form.Group>
        //             <Form.Group>
        //                 <Form.Input label='CWL Username' placeholder='Your CWL username' name='cwl' onChange={(e) => {setCwl(e.target.value)}}/>
        //             </Form.Group>                            
        //             <Form.Group>
        //                 <Form.Select label='Title' options={titleOptions} placeholder='Select' name='title' onChange={(e, result) => {setTitle(result.value)}} />
        //             </Form.Group>
        //             <Form.Group>
        //             <Form.Select label='Lab' options={labOfficeOptions} placeholder='Select' name='lab' onChange={(e, result) => {setLab(result.value)}}/>
        //             </Form.Group>
        //             <Form.Group>
        //                 <Form.Select label='Duration of Stay' options={durationLength} placeholder='Select' onChange={(e, result) => {setDuration(result.value)}}/>
        //             </Form.Group>                          
        //         </Form>
        //         <Mutation 
        //             mutation={CREATE_ACCOUNT_REQUEST} 
        //             variables={{
        //                 firstname: String(firstName), 
        //                 lastname: String(lastName), 
        //                 email: String(email),
        //                 lab: String(lab),
        //                 cwl: String(cwl),
        //                 title: String(title),
        //                 duration: String(duration),
        //             }}
        //             onCompleted={() => { setSubmitStatus(true)}}
        //         >
        //             {(createAccountrequest) => (
        //                 <Button onClick={() => {createAccountrequest()}}>Submit2</Button>
        //             )}
        //         </Mutation>
        //         <Confirm 
        //             open={submitStatus}
        //             content='Thank You. We have received your request!'
        //             onConfirm={() => {
        //                 setSubmitStatus(false)
        //                 setToHome(true);
        //             }}
        //         />  
        //         { toHome 
        //             ? <Redirect to='/' />
        //             : null
        //         }
        //</div>
            
    )
}

