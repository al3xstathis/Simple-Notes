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
import {IoAddSharp} from "react-icons/io5";
import ListItem from "./listItem";

const Notes = () => {
    const {data: notes} = useGetNotes()
    const navigate = useNavigate()
    const auth = getAuth()
    const client = useQueryClient()
    const sortedNotes = notes?.notes.sort((a,b) => moment(b.time).format('DD') - moment(a.time).format('DD'))
    const pinned = sortedNotes?.filter(o => o.pinned === true)
    const notPinned = sortedNotes?.filter(o => o.pinned === false)
    const addNewNote = useAddNote()
    const [openNote, setOpenNote] = useState(null)


    const pinnedList = pinned?.map(o => (
        <ListItem key={o.uid} onClick={() => setOpenNote(o)} title={o.title} subtitle={moment(o.time).format('DD/MM')}/>
    ))

    const notPinnedList = notPinned?.map(o => (
        <ListItem key={o.uid} onClick={() => setOpenNote(o)} title={o.title} subtitle={moment(o.time).format('DD/MM')}/>
    ))

    const addNote = async () => {
        const uid = uuidv4()
        const newNote = {
            time: moment().format(),
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
                        <NotesList align={'flex-start'} direction={'column'}>
                            {pinnedList}
                        </NotesList>
                    </CPaper>
                </ListContainer>
                }
                <ListContainer>
                    <CPaper padding='md' radius='xs' shadow='md'>
                        <Header justify={'space-between'}>
                            all notes
                            <StyledButton onClick={addNote} rightIcon={<IoAddSharp/>}
                                          size='xs'
                                          variant={'outline'} compact radius={'xs'}>
                                add note
                            </StyledButton>
                        </Header>
                        <NotesList align={'flex-start'} direction={'column'}>
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
  padding: 15px;
  margin-inside: 15px;
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
  padding-top: 20px;
  padding-left: 10px;
  width: 90%;
  color: ${config.colors.grey};
`

const NotesContainer = styled.div`
  background-color: ${config.colors.white};
  min-height: 100%;
  color: ${config.colors.black};
`
