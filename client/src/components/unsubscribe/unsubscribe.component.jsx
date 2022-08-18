import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import {Container, Row} from 'react-bootstrap';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import UnsubscribeIcon from '@mui/icons-material/Unsubscribe';

import { updateSubscriptionStart } from '../../redux/subscription/subscription.action';

import './unsubscribe.styles.scss';

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    height: 'auto',
    lineHeight: '60px',
    padding: '20px'
  }));
const lightTheme = createTheme({ palette: { mode: 'light' } });

const UnsubscribeComponent = ({updateSubscriptionStart}) => {
    useEffect(() => {
        window.scrollTo(0,0);
    }, []);
    const [form, setForm] = useState({
        email: ''
    });
    const { email } = form;
    const handleChange = (event) => {
        const { name, value } = event.target;
        setForm({...form, [name]: value});
    }

    const handleSubmit = async(event) => {
        event.preventDefault();
        updateSubscriptionStart(form);
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
                        <Row><h4>Unsubscribe</h4></Row>
                        <Row>
                            <form className='subscribe-form' onSubmit={handleSubmit}>
                                
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
                                    <span style={{lineHeight: 'normal'}}>
                                        <strong>
                                        Don’t want to receive regular emails? You can unsubscribe us here:
                                        </strong>
                                    </span>
                                </Row>
                                <Row className='field-padding' md={4} xs={8} xm={8} style={{display: 'flex'}}>
                                    <Button style={{marginLeft: 'auto', marginRight: 'auto'}}variant="contained" endIcon={<UnsubscribeIcon />} type = 'submit'>
                                        Unsubscribe
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
    updateSubscriptionStart: (data) => dispatch(updateSubscriptionStart(data))
})
export default connect(null, mapDispatchToProps)(UnsubscribeComponent);