import './styles.scss'
import React, {useEffect, useState} from "react";
import {Route, Routes, useLocation, useNavigate} from 'react-router-dom';
import {getAuth, onAuthStateChanged} from "firebase/auth"
import Login from "./pages/auth/login";
import Nav from "./pages";
import {Header, Menu} from "@mantine/core";
import styled from 'styled-components'


function App() {
    const navigate = useNavigate()
    const location = useLocation()
    const auth = getAuth();
    const [loggedIn, setLoggedIn] = useState(null);

    useEffect(() => {

        onAuthStateChanged(auth, (user) => {
            if (user !== null) {
                setLoggedIn(true)
                navigate('/notes')
            } else {
                navigate('/login')
                setLoggedIn(false)
            }
        })
    }, []);

    const signOut = () => {
        auth.signOut()
        setLoggedIn(false)
    }

    if (loggedIn === false) {
        return (
            <Routes>
                <Route path="/login" element={<Login/>}/>
            </Routes>
        )
    }

    return (
        <>
            <Header height={50}>
                <div style={{width: '100%', display: 'flex', alignItems: 'center', height: '100%', justifyContent: 'center'}}>
                    <h3>Simple Notes</h3>
                    <CMenu >
                        <Menu.Label>Settings</Menu.Label>
                        <Menu.Item onClick={signOut}>
                            Sign Out
                        </Menu.Item>
                    </CMenu>
                </div>

            </Header>
            <Nav/>
        </>
    );
}

export default App;

const CMenu = styled(Menu)`
  position: absolute;
  right: 1em;
`
