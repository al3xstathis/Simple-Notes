import {useMutation, useQuery, useQueryClient} from "react-query";
import {getAuth} from "firebase/auth";
import {collection, doc, getDocs, query, setDoc, where, deleteDoc} from 'firebase/firestore'
import {db} from '../index'

export const useGetNotes = () => {
    const auth = getAuth()

    return useQuery(['notes', auth.currentUser?.uid], async () => {
        const notesRef = collection(db, 'notes')
        const q = query(notesRef, where("creator", "==", auth?.currentUser.uid))
        const data = await getDocs(q);
        const notes = data.docs.map(o => ({...o.data(), uid: o.id}))
        return {
            notes
        }

    }, {
        staleTime: Infinity,
        enabled: !!auth.currentUser?.uid,
    })
}


export const useAddNote = () => {
    const auth = getAuth()

    return useMutation((data) => {
        return setDoc(doc(db, "notes", data.uid), {
            ...data
        })
    }, {
        staleTime: Infinity,
        enabled: !!auth.currentUser?.uid,
    })
}

export const useUpdateNote = () => {
    const auth = getAuth()
    const {data: notes} = useGetNotes()
    const client = useQueryClient()

    return useMutation((data) => {
        return setDoc(doc(db, "notes", data.uid), {
            ...data
        }, {merge: true})
            .then(() => {
                const i = notes?.notes.findIndex(o => o.uid === data.uid)
                notes.notes[i] = data
                client.setQueryData(['notes', auth?.currentUser.uid], notes)
            })
    }, {
        staleTime: Infinity,
        enabled: !!auth.currentUser?.uid,
    })
}

export const useDeleteNote = () => {
    const auth = getAuth()
    const {data: notes} = useGetNotes()
    const client = useQueryClient()

    return useMutation((uid) => {
        return deleteDoc(doc(db, "notes", uid))
            .then(() => {
                const i = notes?.notes.findIndex(o => o.uid === uid)
                notes.notes.splice(i,1)
                client.setQueryData(['notes', auth?.currentUser.uid], notes)
            })
    }, {
        staleTime: Infinity,
        enabled: !!auth.currentUser?.uid,
    })
}
