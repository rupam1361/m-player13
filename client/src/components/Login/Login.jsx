import React from "react";
import { Button, Typography } from "@mui/material";
import MusicNoteOutlinedIcon from "@mui/icons-material/MusicNoteOutlined";
import dotenv from "dotenv";

dotenv.config();

const SPOTIFY_CLIENT_ID = "8c278abff1454cee8821faaa5f55f753";
const SPOTIFY_CLIENT_SECRET = "2c08edac92d848558ae56e022e10f155";
const SPOTIFY_REDIRECT_URI = "http://localhost:3000";

const AUTH_URL = `https://accounts.spotify.com/authorize?client_id=8c278abff1454cee8821faaa5f55f753&response_type=code&redirect_uri=https://m-player13.herokuapp.com&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state%20user-read-recently-played%20user-top-read%20playlist-modify-private%20playlist-modify-public%20ugc-image-upload`;

const Login = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        height: "100vh",
        alignItems: "center",
      }}
    >
      <div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <MusicNoteOutlinedIcon
            sx={{
              fontSize: 160,
              display: "block",
              margin: "0 auto",
              color: "rgb(120, 120, 120)",
            }}
          />
          <MusicNoteOutlinedIcon
            sx={{
              fontSize: 160,
              display: "block",
              margin: "0 auto",
              color: "rgb(120, 120, 120)",
            }}
          />
        </div>
        <br />
        <Typography style={{ textAlign: "center", fontSize: 17 }}>
          A Web based Music Player created using SPOTIFY API
        </Typography>
        <br />
        <br />
        <Button
          variant="contained"
          disableElevation
          style={{
            display: "block",
            width: "60%",
            margin: "0 auto",
            fontSize: 16,
          }}
        >
          <a href={AUTH_URL}>Login with Spotify</a>
        </Button>
        <div
          className="text-gray-500"
          style={{
            textAlign: "center",
            fontSize: 14,
            textTransform: "uppercase",
            letterSpacing: 1,
            marginTop: 26,
          }}
        >
          Thanks to Spotify..
        </div>
      </div>
    </div>
  );
};

export default Login;
