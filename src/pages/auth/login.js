import React from 'react'
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import styled from 'styled-components'
import {FlexBox} from "../../styles";
import {config} from "../../config";
import {Button, Container} from "@mantine/core";


const Login = () => {

    const google = () => {
        const provider = new GoogleAuthProvider();
        const auth = getAuth();

        provider.setCustomParameters({
            prompt: 'select_account'
        });
        signInWithPopup(auth, provider)
            .then(() => {

            })
    }

    return (
        <LoginContainer direction={'column'} justify={"center"}>
            <Container>
                Simple Notes
            </Container>
            <Button onClick={google} style={{backgroundColor: config.colors.red}} radius="xs">
                <ion-icon name="logo-google"></ion-icon>
            </Button>
        </LoginContainer>
    )
}

export default Login

const LoginContainer = styled(FlexBox)`
  height: 100%;
  background-color: ${config.colors.white};
  gap: 40px;
`
