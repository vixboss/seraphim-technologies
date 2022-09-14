import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import {Container, Row } from 'react-bootstrap';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import { addSuggestTopicStart } from '../../redux/suggest-topic/suggest-topic.action';

import './suggest-page.styles.scss';

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    height: 'auto',
    lineHeight: '60px',
    padding: '20px'
  }));
const lightTheme = createTheme({ palette: { mode: 'light' } });

const TopicSuggestionPage = ({addSuggestTopicStart}) => {
    useEffect(() => {
        window.scrollTo(0,0);
    }, []);
    const [form, setForm] = useState({
        name:'',
        email: '',
        phone: '',
        title:'',
        industry:'',
        topicSuggestion: ''
    });
    const { name,email,phone,title,industry, topicSuggestion } = form;
    const handleChange = (event) => {
        const { name, value } = event.target;
        setForm({...form, [name]: value});
    }

    const handleSubmit = async(event) => {
        event.preventDefault();
        addSuggestTopicStart(form);
    }
    return(
            <Container style={{display: 'flex'}}>
                <Grid item md={8} style={{margin:'20px auto'}}>
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
                        <Row><h4>Suggest Topic</h4></Row>
                        <Row>
                            <form className='suggest-a-topic-form' onSubmit={handleSubmit}>
                                <Row className='field-padding'>
                                    <TextField
                                        id="standard-basic" 
                                        variant="standard"
                                        type='text'
                                        name='name'
                                        value= {name}
                                        onChange = { handleChange }
                                        label= 'Name'
                                        required
                                    />
                                </Row>
                                <Row className='field-padding'>
                                    <TextField
                                        id="standard-basic" 
                                        variant="standard"
                                        type='email'
                                        name='email'
                                        value= {email}
                                        onChange = { handleChange }
                                        label= 'Email'
                                        required
                                    />
                                </Row>
                                <Row className='field-padding'>
                                    <TextField
                                        id="standard-basic" 
                                        variant="standard"
                                        type='text'
                                        name='phone'
                                        value= {phone}
                                        onChange = { handleChange }
                                        label= 'Phone'
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
                                </Row>
                                <Row className='field-padding'>
                                    <TextField
                                        id="standard-basic" 
                                        variant="standard"
                                        type='text'
                                        name='title'
                                        value= {title}
                                        onChange = { handleChange }
                                        label= 'Job Title'
                                        required
                                    />
                                </Row>
                                <Row className='field-padding'>
                                    <TextField
                                        id="standard-basic" 
                                        variant="standard"
                                        type='text'
                                        name='industry'
                                        value= {industry}
                                        onChange = { handleChange }
                                        label= 'Your Industry & Expertise'
                                        required
                                    />
                                </Row>
                                <Row className='field-padding'>
                                    <TextField
                                        id="standard-basic" 
                                        variant="standard"
                                        type='text'
                                        name='topicSuggestion'
                                        value= {topicSuggestion}
                                        onChange = { handleChange }
                                        label= 'Topic Suggestion'
                                        required
                                    />
                                </Row>
                                <Row className='field-padding' md={4} xs={8} xm={8} style={{display: 'flex'}}>
                                    <Button style={{marginLeft: 'auto', marginRight: 'auto'}}variant="contained"  type = 'submit'>
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
    addSuggestTopicStart: (data) => dispatch(addSuggestTopicStart(data))
})
export default connect(null, mapDispatchToProps)(TopicSuggestionPage);