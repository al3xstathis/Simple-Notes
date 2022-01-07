import React from 'react'
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import styled from 'styled-components'
import {FlexBox} from "../../styles";
import {config} from "../../config";
import {Button, Container} from "@mantine/core";
import {useCreateUser} from "../../hooks/user.hooks";
import {useNotifications} from "@mantine/notifications";


const Login = () => {
    const createUser = useCreateUser()
    const notification = useNotifications()

    const google = () => {
        const provider = new GoogleAuthProvider();
        const auth = getAuth();

        provider.setCustomParameters({
            prompt: 'select_account'
        });
        signInWithPopup(auth, provider)
            .then((res) => {
                let user = {
                    name: res.user.displayName,
                    email: res.user.email,
                    uid: res.user.uid
                }
                createUser.mutate(user)
                notification.showNotification({
                    title: 'Successfully logged in.',
                    autoClose: 2000
                })
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
