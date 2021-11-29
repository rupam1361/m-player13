import express from "express";
import SpotifyWebApi from "spotify-web-api-node";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

router.post("/login", (req, res) => {
  const code = req.body.code;
  const spotifyApi = new SpotifyWebApi({
    redirectUri: "https://young-reef-94653.herokuapp.com",
    clientId: "8c278abff1454cee8821faaa5f55f753",
    clientSecret: "2c08edac92d848558ae56e022e10f155",
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
    redirectUri: "https://young-reef-94653.herokuapp.com",
    clientId: "8c278abff1454cee8821faaa5f55f753",
    clientSecret: "2c08edac92d848558ae56e022e10f155",
    refreshToken,
  });

  spotifyApi
    .refreshAccessToken()
    .then(() => {
      (data) => {
        console.log(data);
        res.json({
          accessToken: data.body.access_token,
          expiresIn: data.body.expires_in,
        });
        // spotifyApi.setAccessToken(data.body["access_token"]);
      };
    })
    .catch((err) => console.log(err));
});

export default router;
