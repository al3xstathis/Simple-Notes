import React, {useState} from 'react'
import {
    createUserWithEmailAndPassword,
    getAuth,
    GoogleAuthProvider,
    signInWithEmailAndPassword,
    signInWithPopup
} from "firebase/auth";
import styled from 'styled-components'
import {FlexBox, StyledButton} from "../../styles";
import {config} from "../../config";
import {Button, TextInput} from "@mantine/core";
import {useCreateUser} from "../../hooks/user.hooks";
import {useNotifications} from "@mantine/notifications";
import {IoLogoGoogle} from "react-icons/io5";
import {useForm} from "@mantine/hooks";
import {v4 as uuidv4} from "uuid";
import moment from "moment";
import {useAddNote} from "../../hooks/note.hooks";


const Login = () => {
    const addNewNote = useAddNote()
    const createUser = useCreateUser()
    const notification = useNotifications()
    const [inOut, setInOut] = useState(1)
    const form = useForm({
        initialValues: {
            email: '',
            password: '',
            name: ''
        },

        validationRules: {
            email: (value) => /^\S+@\S+$/.test(value),
            password: (value) => value.length >= 6
        },
        errorMessages: {
            email: "Email must be of form your@email.com",
            password: "Password must be at least 6 characters"
        }
    });


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
                    title: 'Successfully logged in with Google.',
                    autoClose: 2000
                })
            })

    }

    const createEmailAndPassword = () => {
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, form.values.email, form.values.password)
            .then((res) => {
                // Signed in
                let user = {
                    name: form.values.name,
                    email: form.values.email,
                    uid: res.user.uid
                }
                createUser.mutate(user)
                const uid = uuidv4()
                const newNote = {
                    time: moment().format(),
                    pinned: false,
                    title: 'First Note',
                    content: 'Hey This is your first note! You can edit the title, background ' +
                        'color and content of this note. Pin it to keep track of important notes or delete it when you\'re done with it.',
                    color: '',
                    creator: auth.currentUser.uid,
                    uid: uid
                }
                addNewNote.mutate(newNote, uid)
                notification.showNotification({
                    title: 'Successfully created an account.',
                    autoClose: 2000
                })
                // ...
            })
            .catch((error) => {
            });
    }

    const signInEmailAndPassword = () => {
        const auth = getAuth();
        signInWithEmailAndPassword(auth, form.values.email, form.values.password)
            .then(() => {
                notification.showNotification({
                    title: 'Successfully logged in.',
                    autoClose: 2000
                })
            })
            .catch((error) => {

            });

    }

    const handleSubmit = () => {
        if (inOut) {
            signInEmailAndPassword()
        } else {
            createEmailAndPassword()
        }
    }


    return (
        <LoginContainer direction={'column'} justify={"center"}>
            <FlexBox style={{maxWidth: 300, width: '80%'}} align={'flex-start'} dir={'column'}>
                <p>welcome to</p>
                <h2>simple notes</h2>
            </FlexBox>
            <StyledForm
                onSubmit={form.onSubmit(handleSubmit)}>
                {!inOut &&
                    <CInput
                        autoComplete={'name'}
                        style={{paddingBottom: 10}}
                        type={'name'}
                        size={'sm'}
                        required
                        label="Full Name"
                        placeholder="John Doe"
                        {...form.getInputProps('name')}
                    />
                }
                <CInput
                    autoComplete={'email'}
                    style={{paddingBottom: 10}}
                    type={'email'}
                    size={'sm'}
                    required
                    label="Email"
                    placeholder="your@email.com"
                    {...form.getInputProps('email')}
                />
                <CInput
                    autoComplete={'password'}
                    type={'password'}
                    required
                    label="Password"
                    placeholder="******"
                    {...form.getInputProps('password')}
                />
                <FlexBox justify={'flex-end'} style={{paddingTop: 10}}>
                    {inOut ? <StyledButton  color={'white'} type="submit" compact variant={'default'} radius="xs">sign in</StyledButton> :
                        <StyledButton color={'white'} type="submit" compact variant={'default'} radius="xs">sign up</StyledButton>
                    }
                </FlexBox>
            </StyledForm>
            <FlexBox justify={'space-around'} style={{maxWidth: '300px'}}>
                <StyledButton width={'200px'} color={config.colors.white} background={'#E7017A linear-gradient(91.78deg, #E7017A 2.57%, #DF4A1F 96.33%)'} onClick={google} rightIcon={<IoLogoGoogle/>} style={{backgroundColor: config.colors.red}}
                        radius="xs">
                    sign in with
                </StyledButton>
            </FlexBox>
            {inOut ?
                <FlexBox style={{fontSize: 12}}>
                    <p>don't have an account?</p>
                    <CText onClick={() => setInOut(0)} style={{color: config.colors.white, paddingLeft: 5}}>
                        sign up
                    </CText>
                </FlexBox>
                :
                <FlexBox style={{fontSize: 12}}>
                    <p>already have an account?</p>
                    <CText onClick={() => setInOut(1)} style={{color: config.colors.white, paddingLeft: 5}}>
                        sign in
                    </CText>
                </FlexBox>
            }

        </LoginContainer>
    )
}

export default Login

const LoginContainer = styled(FlexBox)`
  height: 100%;
  gap: 40px;
`

const StyledForm = styled.form`
  width: 80%;
  max-width: 300px;
`

const CText = styled.p`
  background: #E7017A linear-gradient(91.78deg, #E7017A 2.57%, #DF4A1F 96.33%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`

const CInput = styled(TextInput)`
  color: ${config.colors.white};
  input {
    background-color: transparent;
    color: ${config.colors.white};
    &:focus {
      border-color: #E7017A;
    }
  }
  
`