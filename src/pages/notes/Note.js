import React, {useEffect, useState} from 'react'
import styled from 'styled-components'
import {FlexBox, StyledButton} from "../../styles";
import {config} from "../../config";
import {AnimatePresence} from "framer-motion";
import {useDeleteNote, useUpdateNote} from "../../hooks/note.hooks";
import {RichTextEditor} from "@mantine/rte";
import moment from "moment";
import {useNotifications} from "@mantine/notifications";
import {Modal} from "@mantine/core";
import {IoArrowBackOutline} from "react-icons/io5";


const Note = ({note, setOpenNote}) => {
    const [newNote, setNewNote] = useState(note)
    const updateNote = useUpdateNote()
    const notification = useNotifications()
    const [deleteDoc, setDeleteDoc] = useState(null)
    const useDelete = useDeleteNote()


    useEffect(() => {
        updateNote.mutate(newNote, newNote.uid)
    }, [newNote.pinned])

    const handleChange = (name, value) => {
        setNewNote({
            ...newNote,
            [name]: value
        })
    }

    const handleRTF = (value) => {
        setNewNote({
            ...newNote,
            content: value
        })
    }

    const del = async () => {
        setDeleteDoc(false)
        setOpenNote(null)
        await useDelete.mutate(newNote.uid)
    }

    const update = async () => {
        await updateNote.mutate(newNote, newNote.uid)
    }

    const pin = async () => {
        notification.showNotification({
            title: !newNote.pinned ? 'Pinned note' : 'Unpinned note',
            autoClose: 2000
        })

        setNewNote({
            ...newNote,
            pinned: !newNote.pinned
        })
    }

    return (
        <>
            <AnimatePresence>
                {note &&
                <NoteContainer
                    initial={{y: 100, opacity: 0}}
                    animate={{y: 0, opacity: 1}}
                    exit={{y: 100, opacity: 0}}
                    transition={{duration: 0.5}}
                    align={'flex-start'}
                    direction={'column'}
                >
                    <Header justify={'center'}>
                        <CButton variant={'outline'} radius={'xs'} onClick={() => {
                            setOpenNote(null)
                        }}>
                            <IoArrowBackOutline/>
                        </CButton>
                        <CInput maxLength='20' name="title" onBlur={update} onChange={e => handleChange(e.target.name, e.target.value)}
                                style={{color: 'grey'}} placeholder={'Add a title'} value={newNote.title}/>
                    </Header>
                    <Tools justify={'center'}>
                        <ion-icon onClick={pin} style={{
                            padding: '10px',
                            color: newNote.pinned ? config.colors.red : config.colors.black
                        }} name='pin-outline'>

                        </ion-icon>
                        <ion-icon onClick={() => setDeleteDoc(newNote)} style={{padding: '10px'}} name='trash-outline'>

                        </ion-icon>
                    </Tools>
                    <Content direction={'column'} align={'flex-start'}>
                        <Title justify={'flex-end'}>
                            <Date>{moment(newNote.date).format('DD/MM/YY')}</Date>
                        </Title>
                        <RichTextEditor
                            style={{height: '100%', maxWidth: '100%', minWidth: '100%'}}
                            name="content"
                            value={newNote.content}
                            onChange={handleRTF}
                            onBlur={update}
                            controls={[
                                ['bold', 'italic', 'underline'],
                                ['link'],
                                ['unorderedList', 'h1'],
                                ['alignLeft', 'alignCenter', 'alignRight'],
                            ]}
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
                }
            </AnimatePresence>
        </>
    )
}
export default Note

const NoteContainer = styled(FlexBox)`
  z-index: 1;
  height: 100%;
  position: absolute;
  top: 0;
  width: 100%;
  background-color: ${config.colors.white};
`

const Header = styled(FlexBox)`
  padding: 25px;
  padding-top: 35px;
  width: 100%;
  font-size: 20px;
`

const CButton = styled(StyledButton)`
  position: absolute;
  left: 0;
  border: none;
  background-color: transparent;
  font-size: 30px;
`

const Tools = styled(FlexBox)`
  height: 30px;
  width: 100%;
  font-size: 24px;
`

const CInput = styled.input`
  background-color: ${config.colors.white};
  border: none;
  font-size: 20px;
  text-align: center;
`

const Content = styled(FlexBox)`
  width: 100%;
  padding: 15px;
  height: 100%;
`
const Title = styled(FlexBox)`
height: 15px;
margin-bottom: 15px;
width: 100%;
`

const Date = styled.p`
  opacity: 0.5;
`
