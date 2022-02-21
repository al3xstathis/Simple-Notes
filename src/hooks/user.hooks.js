import {useMutation} from "react-query";
import {getAuth} from "firebase/auth";
import {doc,setDoc} from 'firebase/firestore'
import {db} from '../index'

export const useCreateUser = () => {
    const auth = getAuth()
    return useMutation((user) => {
        return setDoc(doc(db, 'users', auth.currentUser?.uid), {
            ...user
        })
    })
}
