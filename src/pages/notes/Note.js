import React from 'react'
import styled from 'styled-components'
import {FlexBox} from "../../styles";

const Note = ({note}) => {
    return (
        <>
            <NoteList>
                <Header>
                    pinned notes
                </Header>
            </NoteList>
            <NoteList>

            </NoteList>
        </>
    )
}
export default Note

const NoteList = styled(FlexBox)`
  
`

const Header = styled.p`
  font-size: 18px;
`
