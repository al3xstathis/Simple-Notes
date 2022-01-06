import {useMutation, useQuery, useQueryClient} from "react-query";
import { getAuth } from "firebase/auth";
import {collection, query, where, getDocs, setDoc, doc} from 'firebase/firestore'
import {db} from '../index'

export const useGetNotes = () => {
    const auth = getAuth()

    return useQuery(['notes', auth.currentUser?.uid], async () => {
        const notesRef = collection(db,'notes')
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
        console.log(data)
        return setDoc(doc(db, "notes", data.uid), {
            ...data
        })
    }, {
        staleTime: Infinity,
        enabled: !!auth.currentUser?.uid,
    })
}
