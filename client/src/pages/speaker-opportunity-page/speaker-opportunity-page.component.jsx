import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import {Container, Row, Col} from 'react-bootstrap';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import { addSpeakerOpportunityStart } from '../../redux/speaker-opportunity/speaker-opportunity.action';
import './speaker-opportunity-page.styles.scss';

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    height: 'auto',
    lineHeight: '60px',
    padding: '20px'
  }));
const lightTheme = createTheme({ palette: { mode: 'light' } });

const SpeakerOpportunityComponent = ({addSpeakerOpportunityStart}) => {
    useEffect(() => {
        window.scrollTo(0,0);
    }, []);
    const [form, setForm] = useState({
        firstName:'',
        lastName: '',
        jobTitle: '',
        company:'',
        phone:'',
        fax:'',
        email: '',
        industries:''
    });
    const [errorMessage, setErrorMessage] = useState({
        firstNameErrorDisplay : false,
        lastNameErrorDisplay : false,
        jobTitleErrorDisplay : false,
        companyErrorDisplay : false,
        phoneErrorDisplay : false,
        emailErrorDisplay : false,
        industriesErrorDisplay : false
    });

    const {  firstName, lastName, jobTitle, company, phone, fax, email, industries } = form;

    const handleChange = (event) => {
        const { name, value } = event.target;
        const newErrorState = {...errorMessage};

        if(value === ''){
            if(name === 'firstName'){
                newErrorState.firstNameErrorDisplay = true;
            }
            if(name === 'lastName'){
                newErrorState.lastNameErrorDisplay = true;
            }
            if(name === 'jobTitle'){
                newErrorState.jobTitleErrorDisplay = true;
            }
            if(name === 'company'){
                newErrorState.companyErrorDisplay = true;
            }
            if(name === 'phone'){
                newErrorState.phoneErrorDisplay = true;
            }
            if(name === 'email'){
                newErrorState.emailErrorDisplay = true;
            }
            if(name === 'industries'){
                newErrorState.industriesErrorDisplay = true;
            }
        }else{
            if(name === 'firstName'){
                newErrorState.firstNameErrorDisplay = false;
            }
            if(name === 'lastName'){
                newErrorState.lastNameErrorDisplay = false;
            }
            if(name === 'jobTitle'){
                newErrorState.jobTitleErrorDisplay = false;
            }
            if(name === 'company'){
                newErrorState.companyErrorDisplay = false;
            }
            if(name === 'phone'){
                newErrorState.phoneErrorDisplay = false;
            }
            if(name === 'email'){
                newErrorState.emailErrorDisplay = false;
            }
            if(name === 'industries'){
                newErrorState.industriesErrorDisplay = false;
            }
        }

        setErrorMessage(newErrorState);
        setForm({...form, [name]: value});
    }

    const handleSubmit = async(event) => {
        event.preventDefault();
        addSpeakerOpportunityStart(form);
    }

    return(
        <Container style={{display: 'flex'}}>
                <Grid item md={6} style={{margin:'20px auto'}}>
                <ThemeProvider theme={lightTheme}>
                    <Box
                    sx={{
                        p: 2,
                        bgcolor: 'background.default',
                        display: 'grid',
                        gridTemplateColumns: { md: '1fr' }
                    }}
                    >
                    <Item elevation={16}>
                        <Row><h4>Speaker Opportunity</h4></Row>
                        <Row>
                            <form className='speaker-opportunity-form' onSubmit={handleSubmit}>
                                <Row className='field-padding'>
                                    <Col>
                                        <TextField
                                            id="standard-basic" 
                                            variant="standard"
                                            type='text'
                                            name='firstName'
                                            value= {firstName}
                                            onChange = { handleChange }
                                            label= 'First Name'
                                            error = {errorMessage.firstNameErrorDisplay}
                                            helperText = {errorMessage.firstNameErrorDisplay ? 'Please Enter First Name': false}
                                            required
                                        />
                                    </Col>
                                    <Col>
                                        <TextField
                                            id="standard-basic" 
                                            variant="standard"
                                            type='text'
                                            name='lastName'
                                            value= {lastName}
                                            onChange = { handleChange }
                                            label= 'Last Name'
                                            error = {errorMessage.lastNameErrorDisplay}
                                            helperText = {errorMessage.lastNameErrorDisplay ? 'Please Enter Last Name': false}
                                            required
                                        />
                                    </Col>
                                </Row>
                                <Row className='field-padding'>
                                    <Col>
                                        <TextField
                                            id="standard-basic" 
                                            variant="standard"
                                            type='text'
                                            name='jobTitle'
                                            value= {jobTitle}
                                            onChange = { handleChange }
                                            label= 'Job Title'
                                            error = {errorMessage.jobTitleErrorDisplay}
                                            helperText = {errorMessage.jobTitleErrorDisplay ? 'Please Enter Job Title': false}
                                            required
                                        />
                                    </Col>
                                    <Col>
                                        <TextField
                                            id="standard-basic" 
                                            variant="standard"
                                            type='text'
                                            name='company'
                                            value= {company}
                                            onChange = { handleChange }
                                            label= 'Company'
                                            error = {errorMessage.companyErrorDisplay}
                                            helperText = {errorMessage.companyErrorDisplay ? 'Please Enter Company': false}
                                            required
                                        />
                                    </Col>
                                </Row>
                                <Row className='field-padding'>
                                    <Col>
                                        <TextField
                                            id="standard-basic" 
                                            variant="standard"
                                            type='text'
                                            name='phone'
                                            value= {phone}
                                            onChange = { handleChange }
                                            label= 'Phone'
                                            error = {errorMessage.phoneErrorDisplay}
                                            helperText = {errorMessage.phoneErrorDisplay ? 'Please Enter Phone Number': false}
                                            onKeyPress={(event) => {
                                                if (!/[0-9]/.test(event.key)) {
                                                  event.preventDefault();
                                                }
                                            }}
                                            onPaste={(e)=>{
                                                e.preventDefault()
                                                return false;
                                            }} 
                                            onCopy={(e)=>{
                                                e.preventDefault()
                                                return false;
                                            }} 
                                            required
                                        />
                                    </Col>
                                    <Col>
                                        <TextField
                                            id="standard-basic" 
                                            variant="standard"
                                            type='text'
                                            name='fax'
                                            value= {fax}
                                            onChange = { handleChange }
                                            label= 'Fax'
                                        />
                                    </Col>
                                </Row>
                                <Row className='field-padding'>
                                    <Col>
                                        <TextField
                                            id="standard-basic" 
                                            variant="standard"
                                            type='text'
                                            name='email'
                                            value= {email}
                                            onChange = { handleChange }
                                            label= 'Email'
                                            error = {errorMessage.emailErrorDisplay}
                                            helperText = {errorMessage.emailErrorDisplay ? 'Please Enter Email': false}
                                            required
                                        />
                                    </Col>
                                    <Col>
                                        <TextField
                                            id="standard-basic" 
                                            variant="standard"
                                            type='text'
                                            name='industries'
                                            value= {industries}
                                            onChange = { handleChange }
                                            label= 'Industries'
                                            error = {errorMessage.industriesErrorDisplay}
                                            helperText = {errorMessage.industriesErrorDisplay ? 'Please Enter Related Industries': false}
                                            required
                                        />
                                    </Col>
                                </Row>
                                
                                <Row className='field-padding' md={4} xs={8} xm={8} style={{display: 'flex'}}>
                                    <Button 
                                        style={{marginLeft: 'auto', marginRight: 'auto'}} variant="contained" type = 'submit'
                                    >
                                        Submit
                                    </Button>
                                </Row>
                            </form>
                        </Row>
                    </Item>
                    </Box>
                </ThemeProvider>
                </Grid>
            </Container>
    );
}

const mapDispatchToProps = dispatch => ({
    addSpeakerOpportunityStart: (data) => dispatch(addSpeakerOpportunityStart(data))
})
export default connect(null, mapDispatchToProps)(SpeakerOpportunityComponent);