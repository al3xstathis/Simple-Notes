import './styles.scss'
import React, {useEffect, useState} from "react";
import {Route, Routes, useLocation, useNavigate} from 'react-router-dom';
import {getAuth, onAuthStateChanged} from "firebase/auth"
import Login from "./pages/auth/login";
import Nav from "./pages";
import styled from "styled-components";
import {IoIosCog} from "react-icons/io";
import {IoHomeOutline} from "react-icons/io5";
import {FlexBox} from "./styles";
import {config} from './config/index'


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
            <Header fluid={'true'}>
                <InnerHeader fluid={'true'} align={'center'} justify={'space-between'}>
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
                </InnerHeader>
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

const Header = styled(FlexBox)`
  color: ${config.colors.white};
`

const InnerHeader = styled(FlexBox)`
  background: #E7017A linear-gradient(91.78deg, #E7017A 2.57%, #DF4A1F 96.33%);
  margin: 0.6rem;
  border-radius: 0.4rem;
  height: 50px;
  padding: 0 1rem;
`
