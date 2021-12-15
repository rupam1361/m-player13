import express from "express";
import SpotifyWebApi from "spotify-web-api-node";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

router.post("/login", (req, res) => {
  const code = req.body.code;
  const spotifyApi = new SpotifyWebApi({
    redirectUri: "https://m-player13.herokuapp.com",
    // redirectUri: "http://localhost:3000",
    clientId: "*************",
    clientSecret: "*************",
  });

  spotifyApi
    .authorizationCodeGrant(code)
    .then((data) => {
      res.status(200).json({
        accessToken: data.body.access_token,
        refreshToken: data.body.refresh_token,
        expiresIn: data.body.expires_in,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({
        message: err.message,
      });
    });
});

router.post("/refresh", (req, res) => {
  const refreshToken = req.body.refreshToken;
  const spotifyApi = new SpotifyWebApi({
    redirectUri: "https://m-player13.herokuapp.com",
    // redirectUri: "http://localhost:3000",
    clientId: "*************",
    clientSecret: "**************",
    refreshToken,
  });

  console.log(refreshToken);

  spotifyApi
    .refreshAccessToken()
    .then((data) => {
      console.log(data);
      res.status(200).json({
        accessToken: data.body.access_token,
        expiresIn: data.body.expires_in,
      });
    })
    .catch((err) => console.log(err));
});

export default router;
