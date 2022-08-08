import React, {useEffect} from 'react';
import {Link} from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import {Container, Row, Col} from 'react-bootstrap';

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

const SpeakerComponent = () => {
    useEffect(() => {
        window.scrollTo(0,0);
    }, []);
    const speakersList = [
        {
            id: 1,
            name: 'Laura A Dixon',
            img: 'https://firebasestorage.googleapis.com/v0/b/seraphim-db.appspot.com/o/Laura-A_1647344853.png?alt=media&token=4930bef5-4807-4d30-9d38-0740784aaf23'
        },
        {
            id: 2,
            name: 'Laura A Dixon',
            img: 'https://firebasestorage.googleapis.com/v0/b/seraphim-db.appspot.com/o/Laura-A_1647344853.png?alt=media&token=4930bef5-4807-4d30-9d38-0740784aaf23'
        },
        {
            id: 3,
            name: 'Laura A Dixon',
            img: 'https://firebasestorage.googleapis.com/v0/b/seraphim-db.appspot.com/o/Laura-A_1647344853.png?alt=media&token=4930bef5-4807-4d30-9d38-0740784aaf23'
        },
        {
            id: 4,
            name: 'Laura A Dixon',
            img: 'https://firebasestorage.googleapis.com/v0/b/seraphim-db.appspot.com/o/Laura-A_1647344853.png?alt=media&token=4930bef5-4807-4d30-9d38-0740784aaf23'
        },
        {
            id: 5,
            name: 'Laura A Dixon',
            img: 'https://firebasestorage.googleapis.com/v0/b/seraphim-db.appspot.com/o/Laura-A_1647344853.png?alt=media&token=4930bef5-4807-4d30-9d38-0740784aaf23'
        },
        {
            id: 6,
            name: 'Laura A Dixon',
            img: 'https://firebasestorage.googleapis.com/v0/b/seraphim-db.appspot.com/o/Laura-A_1647344853.png?alt=media&token=4930bef5-4807-4d30-9d38-0740784aaf23'
        }
    ];
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
                    <Col md = {3} xs = {6} xm = {6}>
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
                                                src = {list.img} 
                                                style = {{
                                                    height: 'auto', 
                                                    width: '50%', 
                                                    borderRadius: '50%', 
                                                    marginLeft: 'auto', 
                                                    marginRight: 'auto',
                                                    marginBottom: '20px'
                                                }}
                                                alt = {list.name}
                                            />
                                        </Row>
                                        <Row>
                                            <h5>{list.name}</h5>
                                        </Row>
                                        <Row>
                                            <span style={{textAlign: 'right', margin: '0'}}>Read More...</span>
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

export default SpeakerComponent;