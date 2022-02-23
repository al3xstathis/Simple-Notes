import React from 'react'
import {FlexBox, StyledButton} from "../../styles";
import {Button} from "@mantine/core";
import styled from 'styled-components'
import {config} from "../../config";
import {getAuth} from "firebase/auth";

const Settings = () => {
    const auth = getAuth();



    const signOut = () => {
        auth.signOut()
    }

    return (
        <>
            <FlexBox
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                exit={{opacity: 0}}
                transition={{duration: 0.5}}
                style={{padding: '1rem'}} fluid={"true"} justify={'space-between'}>
                <p>
                    Click here to sign out
                </p>
                <StyledButton color={config.colors.white} background={'#E7017A linear-gradient(91.78deg, #E7017A 2.57%, #DF4A1F 96.33%)'} onClick={() => signOut()} compact size={'sm'} radius="xs">Sign out</StyledButton>
            </FlexBox>
        </>
    )
}

export default Settings

