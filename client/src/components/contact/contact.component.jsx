import React, {useState, useEffect} from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';

import './contact.styles.scss';

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    height: 'auto',
    lineHeight: '60px',
    padding: '20px'
}));

const WhyUs = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    textAlign: 'justify',
    color: theme.palette.text.secondary,
    height: 'auto',
    padding: '20px'
}));
const lightTheme = createTheme({ palette: { mode: 'light' } });


const ContactComponent = () => {
    useEffect(() => {
        window.scrollTo(0,0);
    }, []);
    const [form, setForm] = useState({
        name:'',
        email: '',
        subject: '',
        message:''
    });
    const { name,email,subject,message } = form;
    const handleChange = (event) => {
        const { name, value } = event.target;
        setForm({...form, [name]: value});
    }

    const handleSubmit = async(event) => {
        event.preventDefault();
    }

    return(
        <Container>
            <Row>
                <h2 style={{marginTop: '20px', textAlign: 'center'}}>Contact & Why Us</h2>
            </Row>
            <Row>
                <Col md = {8}>
                    <Grid item style={{margin:'20px auto'}}>
                        <ThemeProvider theme={lightTheme}>
                            <Box
                            sx={{
                                p: 2,
                                bgcolor: 'background.default',
                                display: 'grid',
                                gridTemplateColumns: { md: '1fr' }
                            }}
                            >
                            <WhyUs elevation={16}>
                                <Row><h5 style={{textAlign: 'center'}}>Why choose WebinarDock?</h5></Row>
                                <hr/>
                                <Row>
                                    <h6>Why Choose Us?</h6>
                                    <ul style={{paddingLeft: '30px'}}>
                                        <li><strong>We&rsquo;re audience-focused-</strong> Our company works solely for our customers and therefore we leave no stone unturned in enhancing our customer&rsquo;s career/profession via delivering updated knowledge in/her field of interest.</li>
                                        <li><strong>We&rsquo;re aware that YOUR TIME is valuable-</strong> We know and understand how busy your schedule is and therefore we ensure that you gain as much knowledge as you can in a short period of 60-90 minutes in general. Also, along with living webinars, we have other options to choose from- transcripts, recorded links, and DVDs to save your time.</li>
                                        <li><strong>We&rsquo;re career-centric-</strong> We know and understand that the career graph shouldn&rsquo;t be mercurial but rather be constantly rising. Therefore, we give you the best and complete information vital for you to acknowledge and stay ahead for your betterment. Our webinars are not just a chunk of information stacked together, but rather a library of the latest, trending, and correct information which ultimately helps you nurture and grow besides staying aware and compliant.</li>
                                        <li><strong>We&rsquo;re a galaxy of experts-</strong> Our galaxy of experts are well-versed masseurs who&rsquo;ve worked for more than two decades and have seen every slice of career, codes, regulations, and changes. They keep track of the current changes and predictable developments for a fast-paced, well&ndash;informed, crisp, and detailed delivery of information so that you do not miss out on even the smallest change in your niche.</li>
                                        <li><strong>We&rsquo;re not misers, but believe in saving a fortune for good-</strong> Since we&rsquo;re all digital and deliver webinars right on your screens, and all you need is just a good internet connection and a device to connect to, we save your transportation costs largely and your time consumed in commuting to traditional seminars.</li>
                                        <li><strong>We&rsquo;re believers in delivering content that performs-</strong> We&rsquo;re not just a jaw-jaw thing, we do not believe in talking a blue streak or boasting of our features rather we&rsquo;ve greatly helped many audiences with timely delivery of correct information by our experts. Our audience has felt a considerable change in their career after attending our webinars. Don&rsquo;t believe us? Try it now!</li>
                                    </ul>
                                </Row>
                            </WhyUs>
                            </Box>
                        </ThemeProvider>
                    </Grid>
                </Col>
                <Col md = {4}>
                    <Row>
                        <Grid item style={{margin:'20px auto'}}>
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
                                    <Row md = {12} className = "row-margin_bottom">
                                        <Col md = {2} xs = {2} xm = {2}>
                                            <i className="fa fa-envelope-o fa-fw pull-left fa-2x" style = {{margin: '15px'}}></i>  &nbsp;
                                        </Col>
                                        <Col md = {10} xs = {10} xm = {10} style={{paddingLeft: '20px'}}>
                                            <a href = "mailto:cs@webinardock.com" className = "pull-left">
                                                cs@webinardock.com
                                            </a> 
                                        </Col>
                                    </Row>
                                    <Row md = {12} className = "row-margin_bottom">
                                        <Col md = {2} xs = {2} xm = {2}>
                                            <i className="fa fa-map-marker fa-fw pull-left fa-2x" style = {{marginLeft: '15px'}}></i>  &nbsp;
                                        </Col>
                                        <Col md = {10} xs = {10} xm = {10}>
                                            <p className = "pull-left" style = {{lineHeight: '15px', textAlign: 'left', paddingLeft: '8px'}}>
                                                29941 Aventura Rancho Santa Margarita, CA 92688 
                                            </p> 
                                        </Col>
                                    </Row>
                                </Item>
                                </Box>
                            </ThemeProvider>
                        </Grid>
                    </Row>
                    <Row>
                        <Grid item style={{marginBottom:'20px', marginTop: '5px'}}>
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
                                    <Row><h5>Having Any Query? Send Us A Message</h5></Row>
                                    <Row>
                                        <form className='query-form' onSubmit={handleSubmit}>
                                            <Row className='field-padding'>
                                                <TextField
                                                    id="standard-basic" 
                                                    variant="standard"
                                                    type='text'
                                                    name='name'
                                                    value= {name}
                                                    onChange = { handleChange }
                                                    label= 'Your Name'
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
                                                    label= 'Your Email'
                                                    required
                                                />
                                            </Row>
                                            <Row className='field-padding'>
                                                <TextField
                                                    id="standard-basic" 
                                                    variant="standard"
                                                    type='text'
                                                    name='subject'
                                                    value= {subject}
                                                    onChange = { handleChange }
                                                    label= 'Subject'
                                                    required
                                                />
                                            </Row>
                                            <Row className='field-padding'>
                                                <TextField
                                                    id="standard-basic" 
                                                    variant="standard"
                                                    type='text'
                                                    name='message'
                                                    value= {message}
                                                    onChange = { handleChange }
                                                    label= 'Message'
                                                    required
                                                />
                                            </Row>
                                            {/*<Row className='field-padding' style={{lineHeight: '15px', textAlign: 'left'}}>
                                                <span>** Query will be resolved within 24-hrs.</span>
                                            </Row> */}
                                            <Row className='field-padding' md={8} xs={8} xm={8} style={{display: 'flex'}}>
                                                <Button style={{marginLeft: 'auto', marginRight: 'auto'}}variant="contained" endIcon={<SendIcon />} type = 'submit'>
                                                    Submit
                                                </Button>
                                            </Row>
                                        </form>
                                    </Row>
                                </Item>
                                </Box>
                            </ThemeProvider>
                        </Grid>
                    </Row>
                </Col>
            </Row>
        </Container>
    )
}

export default ContactComponent;