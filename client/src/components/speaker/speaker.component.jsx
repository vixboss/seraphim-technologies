import React, {useEffect, useState} from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import { withRouter } from 'react-router-dom';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import {Container, Row, Col} from 'react-bootstrap';

import SpeakerDetailComponent from '../speaker-detail/speaker-detail.component';
import './speaker.styles.scss';

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    height: 'auto',
    lineHeight: '60px',
    padding: '20px'
  }));
const lightTheme = createTheme({ palette: { mode: 'light' } });

const SpeakerComponent = ({allSpeakers, history, match}) => {
    
    useEffect(() => {
        window.scrollTo(0,0);
    }, []);

    const handleSpeaker = (speaker) => {
        history.push(`${match.path}/${speaker.title.replace(/[^a-z0-9]+/gi, '-').replace(/^-+/, '').replace(/-+$/, '')}`, {data: speaker});
    }

    
    const speakersList = allSpeakers;
    return(
        <Container>
            <Row>
                <h2 style={{
                    textAlign: 'center', 
                    paddingTop: '30px',
                    paddingBottom: '30px'
                    }}> Speakers</h2>
            </Row>
            <Row>
            {
                speakersList && speakersList.map((list) => (
                    <Col md = {3} xs = {6} xm = {6} key={list._id}>
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
                                        <Row>
                                            <img 
                                                src = {list.url} 
                                                style = {{
                                                    height: 'auto', 
                                                    width: '50%', 
                                                    borderRadius: '50%', 
                                                    marginLeft: 'auto', 
                                                    marginRight: 'auto',
                                                    marginBottom: '20px'
                                                }}
                                                alt = {list.title}
                                            />
                                        </Row>
                                        <Row>
                                            <h6>{list.title}</h6>
                                        </Row>
                                        <Row className = "clickable-button" style = {{marginTop: '20px'}}>
                                            <Chip label="Read More..." style = {{marginRight: 'auto', marginLeft: 'auto'}} onClick = {() => handleSpeaker(list)}/>
                                        </Row>
                                    </Item>
                                </Box>
                            </ThemeProvider>
                        </Grid>
                    </Col>
                    ))
                }
            </Row>
        </Container>
    )
}

export default withRouter(SpeakerComponent);