import React, {useState} from 'react'
import styled from "styled-components";
import {FlexBox, StyledButton} from "../../styles";
import {useAddNote, useGetNotes} from "../../hooks/note.hooks";
import {config} from "../../config";
import moment from "moment";
import {getAuth} from 'firebase/auth'
import {v4 as uuidv4} from 'uuid'
import {useQueryClient} from "react-query";
import {Input} from "@mantine/core";
import Note from "./Note";
import {IoAddSharp, IoSearch} from "react-icons/io5";
import NotePreview from "./NotePreview";
import {useNavigate} from "react-router";

const Notes = () => {
    const {data: notes} = useGetNotes()
    const navigate = useNavigate()
    const auth = getAuth()
    const client = useQueryClient()
    const sortedNotes = notes?.notes.sort((a, b) => moment(b.time).format('DD') - moment(a.time).format('DD'))
    let pinned = sortedNotes?.filter(o => o.pinned === true)
    let notPinned = sortedNotes?.filter(o => o.pinned === false)
    const addNewNote = useAddNote()
    const [searchKey, setSearchKey] = useState('')


    const pinnedList = pinned?.filter(o =>
        o.content.toLocaleLowerCase().includes(searchKey.toLocaleLowerCase()) || o.title.toLocaleLowerCase().includes(searchKey.toLocaleLowerCase())
    ).map(o => (
        <NotePreview note={o} key={o.uid} onClick={() => OpenNote(o)}/>
    ))

    const notPinnedList = notPinned?.filter(o =>
        o.content.toLocaleLowerCase().includes(searchKey.toLocaleLowerCase()) || o.title.toLocaleLowerCase().includes(searchKey.toLocaleLowerCase())
    ).map(o => (
        <NotePreview note={o} key={o.uid} onClick={() => OpenNote(o)}/>
    ))

    const OpenNote = (o) => {
        navigate(`/notes/${o.uid}`, { replace: true });
    }

    const addNote = async () => {
        const uid = uuidv4()
        const newNote = {
            time: moment().format(),
            pinned: false,
            title: '',
            content: '',
            color: '',
            creator: auth.currentUser.uid,
            uid: uid
        }
        await addNewNote.mutate(newNote, uid)
        await client.invalidateQueries(['notes', auth.currentUser.uid])
        navigate(`/notes/${uid}`, { replace: true })
    }

    return (
        <div>
            <FlexBox justify={'space-between'} style={{paddingRight: 10}}>
                <CInput onChange={(e) => setSearchKey(e.target.value)} icon={<IoSearch/>}
                        placeholder={'search for note'}
                        variant={'unstyled'}
                />
                <StyledButton onClick={addNote} rightIcon={<IoAddSharp/>}
                              size='sm'
                              compact radius={'sm'}>
                    add note
                </StyledButton>
            </FlexBox>
            <NotesContainer>
                {pinned?.length > 0 &&
                <ListContainer direction={'column'} align={'flex-start'}>
                    <Header justify={'space-between'}>
                        pinned
                    </Header>
                    <FlexBox style={{display: 'inline-flex', gap: '1rem', paddingTop: '1rem'}} wrap={'wrap'}
                             align={'space-between'}>
                        {pinnedList}
                    </FlexBox>

                </ListContainer>
                }
                <ListContainer direction={'column'} align={'flex-start'}>
                    <Header justify={'space-between'}>
                        all notes
                    </Header>
                    <FlexBox style={{display: 'inline-flex', gap: '1rem', paddingTop: '1rem'}} wrap={'wrap'}
                             align={'space-between'}>
                        {notPinnedList}
                    </FlexBox>
                </ListContainer>
            </NotesContainer>
        </div>
    )
}
export default Notes

const ListContainer = styled(FlexBox)`
  width: 100%;
  padding-top: 0;
  padding-left: 16px;
  padding-right: 16px;
  padding-bottom: 32px;
  margin-inside: 16px;
`

const Header = styled(FlexBox)`
  font-size: 16px;
  width: 100%;
  color: ${config.colors.black.black0};
  opacity: .9;
`

const NotesContainer = styled.div`
  // background-color: ${config.colors.white};
  min-height: 100%;
  color: ${config.colors.black};
`

const CInput = styled(Input)`
  // background-color: ${config.colors.white};
  padding: 8px;
`
