import React from 'react'
import {FlexBox} from "../../styles";
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
                <CButton color={'white'} variant={'outline'} onClick={() => signOut()} compact size={'xs'} radius="xs">Sign out</CButton>
            </FlexBox>
        </>
    )
}

export default Settings

const CButton = styled(Button)`
  color: ${config.colors.white};  
  border-color: ${config.colors.white};
  &:focus {
    background-color: ${config.colors.white};
    color: ${config.colors.red};
  }
`
