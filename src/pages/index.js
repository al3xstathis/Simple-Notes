import React from 'react'
import {Route, Routes} from "react-router";
import Login from "./auth/login";
import Notes from "./notes";
import Note from "./notes/Note";
import {AnimatePresence} from "framer-motion";

const Nav = () => {
    return (
        <AnimatePresence exitBeforeEnter>
            <Routes>
                <Route path="notes" exact element={<Notes/>}/>
                <Route path="/notes/:noteId" element={<Note/>}/>
                <Route path="login" exact element={<Login/>}/>
            </Routes>
        </AnimatePresence>
    )
}
export default Nav
