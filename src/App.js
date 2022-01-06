import './styles.scss'
import React, {useEffect, useState} from "react";
import {Route, Routes, useLocation, useNavigate} from 'react-router-dom';
import {getAuth, onAuthStateChanged} from "firebase/auth"
import Login from "./pages/auth/login";
import Nav from "./pages";


function App() {
    const navigate = useNavigate()
    const location = useLocation()
    const [loggedIn, setLoggedIn] = useState(null);

    useEffect(() => {
        const auth = getAuth();
        onAuthStateChanged( auth, (user) => {
            if(user !== null) {
                setLoggedIn(true)
                if(!location.pathname.includes('notes')) {
                    navigate('/notes')
                }
            } else {
                if(!location.pathname.includes('login')) {
                    navigate('/login')
                }
                setLoggedIn(false)
            }
        })
    }, []);

    if(loggedIn === false ) {
        return (
            <Routes>
                <Route path="/login" element={<Login/>}/>
            </Routes>
        )
    }

  return (
    <Nav/>
  );
}

export default App;
