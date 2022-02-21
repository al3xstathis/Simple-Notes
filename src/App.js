import './styles.scss'
import React, {useEffect, useState} from "react";
import {Route, Routes, useLocation, useNavigate} from 'react-router-dom';
import {getAuth, onAuthStateChanged} from "firebase/auth"
import Login from "./pages/auth/login";
import Nav from "./pages";
import {Header, Menu} from "@mantine/core";
import styled from "styled-components";
import {IoIosCog} from "react-icons/io";
import {IoHomeOutline} from "react-icons/io5";


function App() {
    const navigate = useNavigate()
    const auth = getAuth();
    const location = useLocation()
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

    if (loggedIn === false) {
        return (
            <Routes>
                <Route path="/login" element={<Login/>}/>
            </Routes>
        )
    }



    return (
        <>
            <Header style={{width: '100vw'}} height={50}>
                <div style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    height: '100%',
                    justifyContent: 'space-between',
                    paddingLeft: 16,
                    paddingRight: 16
                }}>
                    <h3>Simple Notes</h3>
                    {location.pathname === '/settings' ?
                        <Home onClick={() => navigate('/notes')}>
                            <IoHomeOutline/>
                        </Home>
                        : location.pathname === '/notes' ?
                        <Settings onClick={() => navigate('/settings')}>
                            <IoIosCog/>
                        </Settings>
                        : location.pathname === '/notes/:noteid' && null
                    }
                </div>
            </Header>
            <Nav/>
        </>
    );
}

export default App;

const Settings = styled.div`
  font-size: 24px;
  height: 24px;
`

const Home = styled.div`
  font-size: 24px;
  height: 24px;
`
