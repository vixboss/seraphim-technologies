import React from "react";
import {Container, Row, Col} from 'react-bootstrap';

import './sign-in-and-sign-up.styles.scss';
import SignIn from "../../components/sign-in/sign-in.component";
import SignUp from "../../components/sign-up/sign-up.component";

const SignInAndSignUpPage = () => (
    <Container className = "sign-in-and-sign-up-page">
        <Row md={8}>
            <Col>
                <SignIn/>
            </Col>
            <Col>
                <SignUp/>
            </Col>
        </Row>
    </Container>
)

export default SignInAndSignUpPage;