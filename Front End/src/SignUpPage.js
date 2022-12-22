import { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { FormControl } from '@mui/material';
import {Alert} from '@mui/material';
import { CircularProgress } from '@mui/material';
import { Link as ReactLink } from 'react-router-dom';

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

export default function SignUpPage() {

  // (1) null, (2) "Client Error", (3) "Loading", (4) "Backend Error", (5) "success"
  var [formState, setFormState] = useState(null);
  var [errorsState, setErrorsState] = useState();

  let firstNameField;
  let lastNameField;
  let emailField;
  let passwordField;
  let avatarField;

  const data = new FormData();

  function attachFile(evt) {

    console.log('file data', evt.target.files)
    // Creating an array from the files attached by user
    var files = Array.from(evt.target.files);

    files.forEach(
        function(fileAttachment, index) {
            data.append(index, fileAttachment);
        }
    )
  }

  function signUp() {
    const errors = [];

    if (firstNameField.value.length === 0) {
      errors.push('Please enter first name')
    };

    if (lastNameField.value.length === 0) {
      errors.push('Please enter last name')
    };

    if (emailField.value.length === 0) {
      errors.push('Please enter email')
    };

    if (passwordField.value.length === 0) {
      errors.push('Please enter password')
    };

    if (errors.length > 0) {
      setFormState('Client Error');
      setErrorsState(errors);
    } else {
      setFormState("Loading");
      setErrorsState();

      data.append('firstName', firstNameField.value);
      data.append('lastName', lastNameField.value);
      data.append('email', emailField.value);
      data.append('password', passwordField.value);

      fetch(`${process.env.REACT_APP_BACKEND_ENDPOINT}/users/register`,
        {
          'method': 'POST',
          'body': data
        }
      )
      .then(
        function(backEndResponse) {
          return backEndResponse.json();
        }
      )
      .then(
        function(jsonResponse) {
          if (jsonResponse.status === "ok") {
            console.log("Backend Response /users/register", jsonResponse)
            setFormState("success")
          } else {
            setFormState("Backend Error")
            setErrorsState([jsonResponse.message]);
          }
        }
      )
      .catch(
        function(backEndError) {
          console.log('backendError at /users/register', backEndError)
          setFormState("Backend Error")
        }
      )
    }
  }

  function addListItem(str) {
    return <li>{str}</li>
  }

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
            Sign up
          </Typography>
          <Box component="form" noValidate sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth sx={ { mb: 2 } }>
                      <TextField 
                      inputRef={ 
                          function( thisElement ){
                              firstNameField = thisElement;
                          } 
                      }
                      label="Firstname" required={true}/>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth sx={{ mb: 2 }}>
                    <TextField 
                    inputRef={ 
                          function( thisElement ){
                              lastNameField = thisElement;
                          } 
                      }
                    label="Lastname" required={true}/>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth sx={{ mb: 2 }}>
                      <TextField 
                      inputRef={ 
                          function( thisElement ){
                              emailField = thisElement;
                          } 
                      }
                      label="Email Address" required={true}/>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
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
              </Grid>
              <Grid item xs={12}>
                <Typography component="p" variant="body1" gutterBottom>
                    Upload your profile picture (optional)
                </Typography>

                <br/>

                <Button size="small" variant="contained" component="label">
                    Upload
                    <input 
                        ref={function(thisElement){ avatarField = thisElement }} 
                        onClick={attachFile}
                        onChange={attachFile}
                        hidden accept="image/*" 
                        multiple type="file" 
                    />
                </Button>
            </Grid>
            <Grid item xs={12}>
                <Box display="flex">
                
                {
                    formState !== "Loading" &&
                    <Button onClick={signUp} m={4} size="large" variant="contained">Submit</Button>
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

                    { 
                        formState === "Backend Error" &&
                        <Alert severity="error">
                            <ul>
                            {
                                errorsState.map(addListItem)
                            }
                            </ul>
                        </Alert>
                    }

                    {
                        formState === "success" &&
                        <Alert severity="success">
                            You have registered successfully!
                        </Alert>
                    }
                </Box>
            </Grid>
        </Grid>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link component={ReactLink} to={'/login'} variant="body2">
                  Already have an account? Login
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}