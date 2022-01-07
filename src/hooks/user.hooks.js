import {useMutation, useQuery, useQueryClient} from "react-query";
import { getAuth } from "firebase/auth";
import {collection, query, where, getDocs, setDoc, doc} from 'firebase/firestore'
import {db} from '../index'

export const useCreateUser = () => {
    const auth = getAuth()
    return useMutation((user) => {
        return setDoc(doc(db, 'users', auth.currentUser?.uid), {
            ...user
        })
    })
}
