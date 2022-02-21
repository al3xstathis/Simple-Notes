import React, {useState} from 'react'
import {
    createUserWithEmailAndPassword,
    getAuth,
    GoogleAuthProvider,
    signInWithEmailAndPassword,
    signInWithPopup
} from "firebase/auth";
import styled from 'styled-components'
import {FlexBox} from "../../styles";
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
                if (moment(res.user.metadata.creationTime).format() === moment(res.user.metadata.lastSignInTime).format()) {
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
                }
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
                    <TextInput
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
                <TextInput
                    autoComplete={'email'}
                    style={{paddingBottom: 10}}
                    type={'email'}
                    size={'sm'}
                    required
                    label="Email"
                    placeholder="your@email.com"
                    {...form.getInputProps('email')}
                />
                <TextInput
                    autoComplete={'password'}
                    type={'password'}
                    required
                    label="Password"
                    placeholder="******"
                    {...form.getInputProps('password')}
                />
                <FlexBox justify={'flex-end'} style={{paddingTop: 10}}>
                    {inOut ? <Button type="submit" variant={'default'} radius="xs">sign in</Button> :
                        <Button type="submit" variant={'default'} radius="xs">sign up</Button>
                    }
                </FlexBox>
            </StyledForm>
            <FlexBox justify={'space-around'} style={{width: '60%', maxWidth: '300px'}}>
                <p>or</p>
                <Button onClick={google} rightIcon={<IoLogoGoogle/>} style={{backgroundColor: config.colors.red}}
                        radius="xs">
                    join with
                </Button>
            </FlexBox>
            {inOut ?
                <FlexBox style={{fontSize: 12}}>
                    <p>don't have an account?</p>
                    <p onClick={() => setInOut(0)} style={{color: config.colors.red, paddingLeft: 5}}>
                        sign up
                    </p>
                </FlexBox>
                :
                <FlexBox style={{fontSize: 12}}>
                    <p>already have an account?</p>
                    <p onClick={() => setInOut(1)} style={{color: config.colors.red, paddingLeft: 5}}>
                        sign in
                    </p>
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
