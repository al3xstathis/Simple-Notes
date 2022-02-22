import React, {useEffect, useState} from 'react'
import styled from 'styled-components'
import {FlexBox, StyledButton} from "../../styles";
import {config} from "../../config";
import {AnimatePresence} from "framer-motion";
import {useDeleteNote, useGetNotes, useUpdateNote} from "../../hooks/note.hooks";
import moment from "moment";
import {useNotifications} from "@mantine/notifications";
import {ColorInput, Modal} from "@mantine/core";
import {useNavigate, useParams} from "react-router";
import {IoIosArrowRoundBack} from "react-icons/io";


const Note = () => {
    const {noteId} = useParams()
    const {data: notes} = useGetNotes()
    const [newNote, setNewNote] = useState(notes?.notes.find(o => o.uid === noteId) || {})
    const updateNote = useUpdateNote()
    const notification = useNotifications()
    const [deleteDoc, setDeleteDoc] = useState(null)
    const useDelete = useDeleteNote()
    const navigate = useNavigate()


    useEffect(() => {
        updateNote.mutate(newNote, newNote.uid)
    }, [newNote.pinned])

    const handleChange = (name, value) => {
        setNewNote({
            ...newNote,
            [name]: value
        })
    }

    const handleColor = (value) => {
        setNewNote({
            ...newNote,
            color: value
        })
    }

    const del = async () => {
        setDeleteDoc(false)
        navigate('/notes')
        await useDelete.mutate(newNote.uid)
    }

    const update = async () => {
        await updateNote.mutate(newNote, newNote.uid)
    }

    const pin = async () => {
        notification.showNotification({
            title: !newNote?.pinned ? 'Pinned note' : 'Unpinned note',
            autoClose: 2000
        })

        setNewNote({
            ...newNote,
            pinned: !newNote.pinned
        })
    }

    return (
        <AnimatePresence>
            <NoteContainer
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                exit={{opacity: 0}}
                transition={{duration: 0.5}}
                direction={'column'}
            >
                <Header justify={'space-between'}>
                    <CButton style={{color: config.colors.white}} variant={'outline'} radius={'xs'} onClick={() => {
                        navigate('/notes')
                    }}>
                        <IoIosArrowRoundBack/>
                    </CButton>
                    <CInput maxLength='20' name="title" onBlur={update}
                            onChange={e => handleChange(e.target.name, e.target.value)}
                            placeholder={'Add a title'} value={newNote.title}/>
                    <Tools justify={'center'}>
                        <ion-icon onClick={pin} style={{
                            padding: '4px',
                            color: newNote?.pinned ? config.colors.red : config.colors.black90
                        }} name='pin-outline'>

                        </ion-icon>
                        <ion-icon onClick={() => setDeleteDoc(newNote)} style={{padding: '4px'}} name='trash-outline'>

                        </ion-icon>
                    </Tools>
                </Header>

                <Content direction={'column'} align={'flex-start'}>
                    <Title justify={'space-between'}>
                        <CColorInput
                            style={{fontSize: 16}}
                            onBlur={update}
                            value={newNote.color}
                            onChange={(e) => handleColor(e)}
                            name="color"
                            // withPicker={false}
                            placeholder={'Pick Color'}
                            variant={'unstyled'}
                        />
                        <Date>{moment(newNote.date).format('MMM D YY')}</Date>
                    </Title>

                    <TextArea
                        name="content"
                        value={newNote.content}
                        onChange={e => handleChange(e.target.name, e.target.value)}
                        onBlur={update}
                        placeholder={'Add a note here'}
                    />
                </Content>

                <Modal
                    opened={deleteDoc}
                    onClose={() => setDeleteDoc(null)}
                    centered
                    hideCloseButton
                    title="Are you sure you want to delete this note?"
                >
                    <FlexBox justify={'center'} width={'100%'}>
                        <StyledButton size='md'
                                      variant={'outline'} compact radius={'xs'} onClick={del}>Delete</StyledButton>
                    </FlexBox>
                </Modal>
            </NoteContainer>
        </AnimatePresence>
    )
}
export default Note

const NoteContainer = styled(FlexBox)`
  height: 100%;
  width: 100%;
`

const Header = styled(FlexBox)`
  padding: 0.4rem 1rem;
  max-width: 100%;
  font-size: 20px;
  color: ${config.colors.white};

`

const CButton = styled(StyledButton)`
  display: flex;
  padding: 0;
  border: none;
  background-color: transparent;
  width: 20%;
  font-size: 30px;
  color: ${config.colors.black.black90};
  justify-content: flex-start;
`

const Tools = styled(FlexBox)`
  height: 30px;
  font-size: 24px;
  width: 20%;
`

const CInput = styled.input`
  border: none;
  font-size: 20px;
  text-align: center;
  width: 60%;
  color: ${config.colors.white};
  background-color: transparent;

  &:focus {
    outline: none;
  }
  
  input {
    color: ${config.colors.white};
    background-color: transparent;
  }
`

const Content = styled(FlexBox)`
  border-top: 0.1px solid rgba(128, 128, 128, 0.21);
  width: 100%;
  padding: 1rem;
  height: 100%;
  max-width: 600px;
`
const Title = styled(FlexBox)`
  height: 1rem;
  margin-bottom: 1rem;
  width: 100%;
  font-size: 16px;
`

const Date = styled.p`
  opacity: 0.5;
`

const TextArea = styled.textarea`
  min-height: 50%;
  max-width: 100%;
  min-width: 100%;
  border: none;
  padding: 10px;
  font-size: 16px;
  background-color: transparent;
  color: ${config.colors.white};


  &:focus {
    outline: none;
  }
`

const CColorInput = styled(ColorInput)`
  background-color: transparent;
  font-size: 16px;
  input {
    color: ${config.colors.white};

  }
`
