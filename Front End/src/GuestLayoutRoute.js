import React, { useContext } from 'react';
// import Box from '@mui/material/Box';
import { Redirect, Route } from 'react-router-dom';
import NavBar from './NavBar';
import Footer from './Footer';
import { UserContext } from './UserContext';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme(
    {
      palette: {
        primary: {
          main: '#9E7676'
        }
      }
    }
  );  

function GuestLayoutRoute(props) {

    const {loggedIn} = useContext(UserContext);

    if (!loggedIn) {
        return (
              <ThemeProvider theme={theme}>
                <NavBar/>
                <Route path={props.path} exact={props.exact} component={props.component}/>
                <Footer/>
              </ThemeProvider>
        )
    } else {
        return (
            <Redirect to={'/'} />
        )
    }
}

export default GuestLayoutRoute;