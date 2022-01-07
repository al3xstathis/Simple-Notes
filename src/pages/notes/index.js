import React, {useState} from 'react'
import styled from "styled-components";
import {FlexBox, StyledButton} from "../../styles";
import {useAddNote, useGetNotes} from "../../hooks/note.hooks";
import {config} from "../../config";
import moment from "moment";
import {getAuth} from 'firebase/auth'
import {v4 as uuidv4} from 'uuid'
import {useQueryClient} from "react-query";
import {Paper} from "@mantine/core";
import {useNavigate} from "react-router";
import Note from "./Note";

const Notes = () => {
    const {data: notes} = useGetNotes()
    const navigate = useNavigate()
    const auth = getAuth()
    const client = useQueryClient()
    const pinned = notes?.notes.filter(o => o.pinned === true)
    const notPinned = notes?.notes.filter(o => o.pinned === false)
    const addNewNote = useAddNote()
    const [openNote, setOpenNote] = useState(null)

    const pinnedList = pinned?.map(o => (
        <ListItem key={o.uid} onClick={() => setOpenNote(o)}>
            {o.title}
        </ListItem>
    ))

    const notPinnedList = notPinned?.map(o => (
        <ListItem key={o.uid} onClick={() => setOpenNote(o)}>
            {o.title}
        </ListItem>
    ))

    const addNote = async () => {
        const uid = uuidv4()
        const newNote = {
            time: moment().format(),
            title: "New Note",
            pinned: false,
            content: null,
            creator: auth.currentUser.uid,
            uid: uid
        }
        await addNewNote.mutate(newNote, uid)
        await client.invalidateQueries(['notes', auth.currentUser.uid])
        setOpenNote(newNote)
    }

    return (
        <>
            <NotesContainer>
                {pinned?.length > 0 &&
                <ListContainer>
                    <CPaper padding='md' radius='xs' shadow='md'>
                        <Header justify={'space-between'}>
                            pinned notes
                        </Header>
                        <NotesList direction={'column'}>
                            {pinnedList}
                        </NotesList>
                    </CPaper>
                </ListContainer>
                }
                <ListContainer>
                    <CPaper padding='md' radius='xs' shadow='md'>
                        <Header justify={'space-between'}>
                            all notes
                            <StyledButton onClick={addNote} rightIcon={<ion-icon name="add-outline"></ion-icon>}
                                          size='xs'
                                          variant={'outline'} compact radius={'xs'}>
                                add note
                            </StyledButton>
                        </Header>
                        <NotesList direction={'column'}>
                            {notPinnedList}
                        </NotesList>
                    </CPaper>
                </ListContainer>
            </NotesContainer>
            {openNote &&
                <Note setOpenNote={setOpenNote} note={openNote}/>
            }
        </>
    )
}
export default Notes

const ListContainer = styled(FlexBox)`
  width: 100%;
  padding: 25px;
`

const CPaper = styled(Paper)`
width: 100%;
display: flex;
align-items: flex-start;
flex-direction: column;
`
const Header = styled(FlexBox)`
  font-size: 18px;
  width: 100%;
`
const NotesList = styled(FlexBox)`
  margin-top: 25px;
  margin-left: 15px;
  color: ${config.colors.grey};
`
const ListItem = styled.li`
  list-style: none;
  padding-bottom: 10px;
  text-decoration: underline;
`

const NotesContainer = styled.div`
  background-color: ${config.colors.white};
  min-height: 100%;
  color: ${config.colors.black};
`
