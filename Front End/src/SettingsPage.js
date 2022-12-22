import { useEffect, useContext, useState } from "react";
import { Avatar, Input } from "@mui/material";
import { Image } from "@mui/icons-material";
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
// import UserContext from './UserContext.js';

function SettingsPage() {

    const [userDetails, setUserDetails] = useState();

    let firstNameField;
    let lastNameField;
    let emailField;
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

    useEffect(
        function() {
            fetch(
                `${process.env.REACT_APP_BACKEND_ENDPOINT}/users/find`,
                {
                        'method': 'POST',
                        'headers': {
                            'Authorization': `Bearer ${localStorage.getItem('jsonwebtoken')}`
                        }
                }
            )
            .then(
                function(backendResponse) {
                    return backendResponse.json()
                }
            )
            .then(
                function(jsonResponse) {
                    setUserDetails(jsonResponse)
                }
            )
            .catch(
                function(backendError) {
                    console.log('backendError', backendError)
                }
            )
        },

        // This array is empty because use Effect will run once only
        []
    )

    function updateHandler() {
        data.append('firstName', firstNameField.value);
        data.append('lastName', lastNameField.value);
        data.append('email', emailField.value);
        data.append('avatar', avatarField.value)
        fetch(
          `${process.env.REACT_APP_BACKEND_ENDPOINT}/users/update`,
          {
                  'method': 'PUT',
                  'body': data
          }
      )
      .then(
          function(backendResponse) {
              return backendResponse.json()
          }
      )
      .catch(
          function(backendError) {
              console.log('backendError', backendError)
          }
      )
    }

    if (userDetails) {  
        const theme = createTheme();
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
                      <Avatar alt="Avatar" src={`${userDetails.avatar}`} />
                      <Typography component="h1" variant="h5">
                        Settings
                      </Typography>
                      <Box component="form" sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                          <Grid item xs={12}>
                            <Typography>Current First Name: {userDetails.firstName}</Typography>
                            <Input 
                              fullWidth
                              inputRef={ 
                              function( thisElement ){
                                  firstNameField = thisElement;
                                  } 
                                }
                              label="Firstname" required={false}/>
                          </Grid>
                          <Grid item xs={12}>
                            <Typography>Current Last Name: {userDetails.lastName}</Typography>
                            <Input 
                              fullWidth
                              inputRef={ 
                              function( thisElement ){
                                  lastNameField = thisElement;
                                  } 
                                }
                              label="Lastname" required={false}/>
                          </Grid>
                          <Grid item xs={12}>
                            <Typography>Current Email: {userDetails.email}</Typography>
                            <Input 
                              fullWidth
                              inputRef={ 
                              function( thisElement ){
                                  emailField = thisElement;
                                  } 
                                }
                              label="Email" required={false}/>
                          </Grid>
                        </Grid>
                        <Typography mt={2}>Current Avatar:
                          <img width="100px" alt="Avatar" src={`${userDetails.avatar}`} />
                        </Typography>
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
                        <Button
                          type="submit"
                          fullWidth
                          variant="contained"
                          onClick={updateHandler}
                          sx={{ mt: 3, mb: 2 }}
                        >
                          Update
                        </Button>
                      </Box>
                    </Box>
                  </Container>
                </ThemeProvider>
        )
    } else {
        return <p>Loading....</p>
    }
}

export default SettingsPage;