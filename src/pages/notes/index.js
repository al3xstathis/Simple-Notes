import React from 'react'
import styled from "styled-components";
import {FlexBox, StyledButton} from "../../styles";
import {useAddLesson, useAddNote, useGetNotes} from "../../hooks/note.hooks";
import {config} from "../../config";
import {doc, setDoc} from 'firebase/firestore'
import {db} from "../../index";
import moment from "moment";
import {getAuth} from 'firebase/auth'
import {v4 as uuidv4} from 'uuid'
import {useQueryClient} from "react-query";

const Notes = () => {
    const {data: notes} = useGetNotes()
    const auth = getAuth()
    const client = useQueryClient()
    const pinned = notes?.notes.filter(o => o.pinned === true)
    const notPinned = notes?.notes.filter(o => o.pinned === false)
    const addNewNote = useAddNote()

    const pinnedList = pinned?.map(o => (
        <ListItem key={o.uid} onClick={() => console.log(o.title)}>
            {o.title}
        </ListItem>
    ))

    const notPinnedList = notPinned?.map(o => (
        <ListItem key={o.uid} onClick={() => console.log(o.title)}>
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

    }

    return (
        <NotesContainer>
            {pinned?.length > 0 &&
                <ListContainer align={'flex-start'} direction={'column'}>
                    <Header justify={'space-between'}>
                        pinned notes
                    </Header>
                    <NotesList direction={'column'}>
                        {pinnedList}
                    </NotesList>
                </ListContainer>
            }
            <ListContainer align={'flex-start'} direction={'column'}>
                <Header justify={'space-between'}>
                    all notes
                    <StyledButton onClick={addNote} rightIcon={<ion-icon name="add-outline"></ion-icon>} size='xs' variant={'outline'} compact radius={'xs'}>
                        add note
                    </StyledButton>
                </Header>
                <NotesList direction={'column'}>
                    {notPinnedList}
                </NotesList>
            </ListContainer>
        </NotesContainer>
    )
}
export default Notes

const ListContainer = styled(FlexBox)`
  padding: 50px;
`
const Header = styled(FlexBox)`
  font-size: 18px;
  width: 100%;
`
const NotesList = styled(FlexBox)`
  margin-top: 25px;
  margin-left: 20px;
  color: ${config.colors.grey};
`
const ListItem = styled.li`
  list-style: none;
  padding-bottom: 10px;
  text-decoration: underline;
`

const NotesContainer = styled.div`
  background-color: ${config.colors.white};
  height: 100%;
  color: ${config.colors.black};
`
