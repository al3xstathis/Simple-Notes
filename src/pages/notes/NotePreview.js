import React from 'react'
import {FlexBox} from "../../styles";
import styled from 'styled-components'
import {config} from "../../config";
import moment from "moment";

const NotePreview = ({onClick, note}) => {
    return (
        <NoteContainer pinned={note.pinned ? 1 : 0} background={note.color} onClick={onClick} direction={'column'} align={'flex-start'}>
            <NoteHeader justify={'space-between'}>
                {note.title}
            </NoteHeader>
            <NoteContent>
                {note.content}
            </NoteContent>
            <NoteTime justify={'flex-end'}>
                {moment(note.time).format('MMM D YY')}
            </NoteTime>
        </NoteContainer>
    )
}

export default NotePreview

const NoteContainer = styled(FlexBox)`
  cursor: pointer;
  min-width: 160px;
  max-width: 160px;
  word-break: break-word;
  height: max-content;
  background-color: ${props => props.pinned ? '#e7017ac2' : '#df4a1fbf'};
  border-radius: 6px;
  padding: 10px;
  color: ${config.colors.white};
  box-shadow: 0 0 12px 1px rgb(0 0 0 / 25%);
  border: 0.1px solid rgba(255, 255, 255, 0.2);
  @media (max-width: 385px) {
    min-width: 160px;
    max-width: 160px;
  }
  @media (max-width: 365px) {
    min-width: 150px;
    max-width: 150px;
  }
  @media (max-width: 350px) {
    min-width: 100%;
    max-width: 100%;
  }
`

const NoteHeader = styled(FlexBox)`
  font-size: 16px;
  width: 100%;
`

const NoteContent = styled(FlexBox)`
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
  font-size: 10px;
  width: 100%;
`
