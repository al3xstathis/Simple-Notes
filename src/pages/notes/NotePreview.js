import React from 'react'
import {FlexBox} from "../../styles";
import styled from 'styled-components'
import {config} from "../../config";
import moment from "moment";

const NotePreview = ({onClick, note}) => {
    return (
        <NoteContainer background={note.color} onClick={onClick} direction={'column'} align={'flex-start'}>
            <NoteHeader>
                {note.title}
            </NoteHeader>
            <NoteContent>
                {note.content}
            </NoteContent>
            <NoteTime>
                {moment(note.time).format('MMM D')}
            </NoteTime>
        </NoteContainer>
    )
}

export default NotePreview

const NoteContainer = styled(FlexBox)`
  min-width: 140px;
  max-width: 170px;
  word-break: break-all;
  height: max-content;
  background-color: ${props => props.background ? props.background : config.colors.black.black10};
  border-radius: 6px;
  padding: 10px;
  color: ${config.colors.white};
  box-shadow: 0px 0px 12px 1px rgb(0 0 0 / 25%);
`

const NoteHeader = styled.p`
  font-size: 16px;
`

const NoteContent = styled(FlexBox)`
  //max-height: 20px;
  margin-top: 10px;
  margin-bottom: 10px;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  color: ${config.colors.white};
  font-size: 14px;
  opacity: 0.8;
`

const NoteTime = styled(FlexBox)`
font-size: 12px;
`
