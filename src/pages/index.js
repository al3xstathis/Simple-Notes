import React from 'react'
import {Route, Routes} from "react-router";
import Login from "./auth/login";
import Notes from "./notes";

const Nav = () => {
    return (
        <Routes>
            <Route path="/notes/:id" exact  />
            <Route path="/notes" exact element={<Notes/>}/>
            <Route path="/login" exact element={<Login/>}/>
        </Routes>
    )
}
export default Nav
