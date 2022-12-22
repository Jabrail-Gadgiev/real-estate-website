import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Grid } from "@mui/material";
import Hero from "./Hero";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";
import { ThemeProvider } from "@mui/material/styles";
import { Link } from "react-router-dom";
import { useEffect, useContext, useState } from "react";
import userEvent from "@testing-library/user-event";

export default function MediaControlCard() {
  let user = {
    properties: [
      {
        title: "My Home",
        dis: "This is my home",
        img: "https://c8.alamy.com/comp/2GBY1JA/hand-drawn-cute-house-doodle-sketch-style-home-house-building-with-window-roof-vector-illustration-for-home-icon-2GBY1JA.jpg",
      },
      {
        title: "My Home2",
        dis: "This is my home2",
        img: "https://i.pinimg.com/736x/ef/ba/c1/efbac16bf926288df8c6d5feb33e8db4.jpg",
      },
      {
        title: "My Home3",
        dis: "This is my home3",
        img: "https://previews.123rf.com/images/_fla/_fla1303/_fla130300085/18308743-cartoon-hand-drawing-house.jpg",
      },
    ],
  };

  const theme = useTheme();
  const [userDetails, setUserDetails] = useState();
  useEffect(function () {
    fetch(`http://localhost:3001/property/find`, {
      method: "get",
      // 'body': {}
    })
      // This will recieve string data and convert to json
      .then(function (backendReponse) {
        return backendReponse.json();
      })
      // This will receie the converted json
      .then(function (jsonResponse) {
        setUserDetails(jsonResponse);
      })
      // This will catch errors if any
      .catch(function (backendError) {
        console.log("backendError", backendError);
      });
  });
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box
          sx={{
            backgroundColor: "#FFF8EA",
            color: "#594545",
            pt: 8,
            pb: 6,
            minHeight: "100vh",
          }}
        >
          <Container maxWidth="sm">
            <Typography component="h1" variant="h2" align="center" gutterBottom>
              Your Bookings
            </Typography>

            <Typography component="h5" variant="h4" align="center" gutterBottom>
              WoW Such
            </Typography>
            <Typography variant="h5" align="center" paragraph>
              There is no properties currently booked
            </Typography>
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              <Link to="/">
                <Button variant="contained" sx={{ color: "#594545" }}>
                  Book a Location
                </Button>
              </Link>
            </Stack>
          </Container>
          {/* <div class="col-6 heroImage">
              <img src="images/headerImage.png" width="100%" alt=""/>
          </div> */}
        </Box>
      </ThemeProvider>

      <Grid container justifyContent={"center"}>
        {user.properties.map((e) => {
          return (
            <Grid item m={3}>
              <Card sx={{ display: "flex" }}>
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <CardContent sx={{ flex: "1 0 auto" }}>
                    <Typography component="div" variant="h5">
                      {e.title}
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      color="text.secondary"
                      component="div"
                    >
                      {e.dis}
                    </Typography>
                  </CardContent>
                </Box>
                <CardMedia
                  component="img"
                  sx={{ width: 300 }}
                  image={e.img}
                  alt="Live from space album cover"
                />
              </Card>
            </Grid>
          );
        })}
        {/* //gething data from backend; , // This array is empty because
        useEffect will run once only */}
        {/* ---------- */}
        {/* ---------- */}
        {/* ---------- */}
        {/* ---------- */}
        {/* <Grid item m={3}>
          <Card sx={{ display: "flex" }}>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <CardContent sx={{ flex: "1 0 auto" }}>
                <Typography component="div" variant="h5">
                  My property
                </Typography>
                <Typography
                  variant="subtitle1"
                  color="text.secondary"
                  component="div"
                >
                  Owner Name
                </Typography>
              </CardContent>
            </Box>
            <CardMedia
              component="img"
              sx={{ width: 151 }}
              image="/static/images/cards/live-from-space.jpg"
              alt="Live from space album cover"
            />
          </Card>
        </Grid> */}
      </Grid>
    </>
  );
}
