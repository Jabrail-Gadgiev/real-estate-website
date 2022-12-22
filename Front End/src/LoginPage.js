import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import { CircularProgress, Alert } from '@mui/material';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Redirect } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { FormControl } from '@mui/material';
import { useState, useContext } from 'react';
import { UserContext } from './UserContext.js';

const theme = createTheme(
  {
    palette: {
      primary: {
        main: '#9E7676'
      }
    },
    typography: {
      h2: {
        color: '#594545'
      },
      h5: {
        color: '#594545'
      }
    }
  }
);

export default function LoginPage() {

  var [formState, setFormState] = useState(null);
  var [errorsState, setErrorsState] = useState();
  var { updateUser } = useContext(UserContext);

  let emailField;
  let passwordField;

  const data = new FormData();

  function login() {
    var errors = [];

    if(emailField.value.length === 0) {
        errors.push('Please enter your email');
    }

    if(passwordField.value.length === 0) {
        errors.push('Please enter your password');
    }
    
    if (errors.length > 0) {
      setFormState("Client Error")
      setErrorsState(errors)
    } else {
      setFormState("Loading")
      setErrorsState()

      data.append('email', emailField.value);
      data.append('password', passwordField.value);

      fetch(
        `${process.env.REACT_APP_BACKEND_ENDPOINT}/users/login`,
        {
          "method": "POST",
          "body": data
        }
      )
      .then(
          function(backendResponse) {
            return backendResponse.json();
        }
      )
      .then(
          function(jsonResponse) {
            if(jsonResponse.status === "ok") {
                console.log('backend response /users/login', jsonResponse)
                setFormState("success");
                updateUser(
                    {
                        "email": jsonResponse.message.email,
                        "firstName": jsonResponse.message.firstName,
                        "lastName": jsonResponse.message.lastName,
                        "avatar": jsonResponse.message.avatar,
                        "jsonwebtoken": jsonResponse.message.jsonwebtoken,
                        "loggedIn": true
                    }
                )
            }
            else {
                setFormState("Backend Error");
            }
        }
      )
      .catch(
        function(backendError) {
            console.log('backendError at /users/login', backendError)
            setFormState("Backend Error");
        }
      )
    }
  };
 
  function addListItem(str) {
    return <li>{str}</li>
  }

  if(formState === "success") {
    return (
      <Redirect to="/" />
    )
  } else {
    return (
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Login
            </Typography>
            <Box component="form" sx={{ mt: 1 }}>
              <FormControl fullWidth sx={{ mb: 2 }}>
                <TextField 
                inputRef={ 
                    function( thisElement ){
                        emailField = thisElement;
                    } 
                }
                label="Email" required={true}/>
              </FormControl>
              <FormControl fullWidth sx={{ mb: 2 }}>
                <TextField 
                inputRef={ 
                    function( thisElement ){
                        passwordField = thisElement;
                    } 
                }
                type="password"
                label="Password" required={true} />
              </FormControl>
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Box display="flex">
                    
                    {
                        formState !== "Loading" &&
                        <Button onClick={login} sx={{ mt: 3, mb: 2 }} fullWidth variant="contained">Submit</Button>
                    }
                    
                    {
                        formState === "Loading" &&
                        <CircularProgress />
                    }
                </Box>

                <Box mt={2}>

                    { 
                        formState === "Client Error" &&
                        <Alert severity="error">
                            <ul>
                            {
                                errorsState.map(addListItem)
                            }
                            </ul>
                        </Alert>
                    }

                    {/* { 
                        formState === "Backend Error" &&
                        <Alert severity="error">
                            <ul>
                            {
                                errorsState.map(addListItem)
                            }
                            </ul>
                        </Alert>
                    } */}

                    {
                        formState === "success" &&
                        <Alert severity="success">
                            You have logged in successfully!
                        </Alert>
                    }
                </Box>
              <Grid container>
                <Grid item xs>
                  <Link href="/" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    );
  }
}