import React, { useState, useEffect } from "react";
import SpotifyWebApi from "spotify-web-api-node";
import {
  Box,
  IconButton,
  Snackbar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  Button,
} from "@mui/material";
import axios from "axios";
import dotenv from "dotenv";

import CloseIcon from "@mui/icons-material/Close";

import useAuth from "../useAuth";
import Header from "../Header/Header";
import Home from "../Home/Home";
import SearchResults from "../SearchResults/SearchResults";
import FloatingPlayer from "../FloatingPlayer/FloatingPlayer";
import CategoryPlaylist from "../CategoryPlaylist/CategoryPlaylist";
import ArtistDetails from "../ArtistDetails/ArtistDetails";
import Artists from "../Artists/Artists";
import NewReleases from "../Home/NewReleases/NewReleases";
import RecentlyPlayed from "../Home/RecentlyPlayed/RecentlyPlayed";
import RecentlyPlayedMobile from "../Home/RecentlyPlayed/RecentlyPlayedMobile";
import MySavedTracks from "../MySavedTracks/MySavedTracks";
import MyPlaylist from "../MyPlaylist/MyPlaylist";

dotenv.config();

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
});

const drawerWidth = 240;
const recentSongsWidth = 320;

const Dashboard = ({ code }) => {
  const [width, setWidth] = useState(document.body.offsetWidth);
  const accessToken = useAuth(code);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchData, setSearchData] = useState([]);
  const [chooseTrack, setChooseTrack] = useState("");
  const [newReleases, setNewReleases] = useState([]);
  const [showSearchSongs, setShowSearchSongs] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showAlbumList, setShowAlbumList] = useState(false);
  const [currentSongPlayingId, setCurrentSongPlayingId] = useState("");
  const [floatingPlayerPlay, setFloatingPlayerPlay] = useState(false);
  const [playerDetails, setPlayerDetails] = useState({});
  const [album, setAlbum] = useState({});
  const [currentSongArtistAlbums, setCurrentSongArtistAlbums] = useState([]);
  const [category, setCategory] = useState("Home");
  const [currentUser, setCurrentUser] = useState();
  const [categorySublist, setCategorySublist] = useState([]);
  const [categorySublistTitle, setCategorySublistTitle] = useState({});
  const [currentPlaylistPlayingId, setCurrentPlaylistPlayingId] = useState("");
  const [playlistTracks, setPlaylistTracks] = useState("");
  const [albumTracks, setAlbumTracks] = useState([]);
  const [recentlyPlayedSongs, setRecentlyPlayedSongs] = useState([]);
  const [myTopArtists, setMyTopArtists] = useState([]);
  const [myTopTracks, setMyTopTracks] = useState([]);
  const [musicCategories, setMusicCategories] = useState([]);
  const [artistDetails, setArtistDetails] = useState([]);
  const [artistTopTracks, setArtistTopTracks] = useState([]);
  const [showArtistDetails, setShowArtistDetails] = useState(false);
  const [songProgress, setSongProgress] = useState(null);
  const [playButtonPressedCount, setPlayButtonPressedCount] = useState(0);
  const [showArtistsCategory, setShowArtistsCategory] = useState(false);
  const [showNewReleasesCategory, setShowNewReleasesCategory] = useState(false);
  const [showSavedTracks, setShowSavedTracks] = useState(false);
  const [showMyPlaylists, setShowMyPlaylists] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [relatedArtists, setRelatedArtists] = useState([]);
  const [myPlaylist, setMyPlaylist] = useState([]);
  const [myPlaylistTitle, setMyPlaylistTitle] = useState("");
  const [mySavedTracks, setMySavedTracks] = useState([]);
  const [createPlaylistSearchTerm, setCreatePlaylistSearchTerm] = useState("");
  const [createPlaylistSearchData, setCreatePlaylistSearchData] = useState([]);
  const [openSnackbar, setOpenSnackbar] = useState({});
  const [anchorEl, setAnchorEl] = useState(null);
  const [openAlert, setOpenAlert] = useState({});
  const [selectPlaylistOpen, setSelectPlaylistOpen] = useState(false);

  const handleCloseAlert = () => {
    setOpenAlert({
      message: openAlert.message,
      open: false,
    });
  };

  useEffect(() => {
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken);
    setCategory("Home");
  }, [accessToken]);

  useEffect(() => {
    if (!accessToken) return;
    spotifyApi.getMe().then(
      function (data) {
        console.log("Some information about the authenticated user", data.body);
        setCurrentUser(data.body);
      },
      function (err) {
        console.log("Something went wrong!", err);
      }
    );
  }, [accessToken]);

  window.addEventListener("resize", () => {
    setWidth(document.body.offsetWidth);
  });

  // console.log(relatedArtists);

  useEffect(() => {
    if (!accessToken) return;

    getMyRecentPlayedSongs();
    getMyTopArtists();
    getMyTopTracks();
    getMyPlaylists();
    getMySavedTracks();

    // window.onSpotifyWebPlaybackSDKReady = () => {
    //   const player = new window.Spotify.Player({
    //     name: "Carly Rae Jepsen Player",
    //     getOAuthToken: (callback) => {
    //       callback(accessToken);
    //     },
    //     volume: 0.5,
    //   });

    //   const playTrack = () => {
    //     console.log("lol");

    //     player.connect().then((success) => {
    //       if (success) {
    //         console.log(
    //           "The Web Playback SDK successfully connected to Spotify!"
    //         );
    //       }
    //     });

    //     player.addListener("ready", async ({ device_id }) => {
    //       const spotify_uri = "spotify:track:7xGfFoTpQ2E7fRF5lN10tr";
    //       console.log("Connected with Device ID", device_id);

    //       const response = await fetch(
    //         `https://api.spotify.com/v1/me/player/play?device_id=${device_id}`,
    //         {
    //           method: "PUT",
    //           body: JSON.stringify({ uris: [spotify_uri] }),
    //           headers: {
    //             "Content-Type": "application/json",
    //             Authorization: `Bearer ${accessToken}`,
    //           },
    //         }
    //       );

    //       const data = await response.text();
    //       console.log(data ? JSON.parse(data) : response);
    //     });
    //   };

    //   const button = document.createElement("button");
    //   button.innerHTML = "Play";
    //   button.addEventListener("click", playTrack);
    //   document.getElementById("root").append(button);

    //   const play = ({
    //     spotify_uri,
    //     playerInstance: {
    //       _options: { getOAuthToken },
    //     },
    //   }) => {
    //     getOAuthToken((access_token) => {
    //   fetch(
    //     `https://api.spotify.com/v1/me/player/play?device_id=${device_id}`,
    //     {
    //       method: "PUT",
    //       body: JSON.stringify({ uris: [spotify_uri] }),
    //       headers: {
    //         "Content-Type": "application/json",
    //         Authorization: `Bearer ${access_token}`,
    //       },
    //     }
    //   );
    //     });
    //   };
    // };
  }, [accessToken]);

  const searchTracks = (searchterm) => {
    if (!searchTerm) return;
    let cancel = false;

    spotifyApi.searchTracks(searchterm).then((res) => {
      if (cancel) return;
      setSearchData(res.body.tracks.items);
      setCurrentSongPlayingId(currentSongPlayingId);
    });

    return () => (cancel = true);
  };

  useEffect(() => {
    // if (!searchTerm) return setSearchData([]);
    if (!accessToken) return;
    // let cancel = false;
    searchTracks(searchTerm);
    setShowSearchSongs(true);

    // return () => (cancel = true);
  }, [searchTerm, accessToken]);

  const createPlaylistSearchTracks = (searchterm) => {
    if (!searchterm) return;
    let cancel = false;

    spotifyApi.searchTracks(searchterm).then((res) => {
      if (cancel) return;
      setCreatePlaylistSearchData(res.body.tracks.items);
      // console.log(res.body.tracks);
    });

    return () => (cancel = true);
  };

  useEffect(() => {
    if (!accessToken) return;
    if (createPlaylistSearchTerm === "") setCreatePlaylistSearchData([]);
    console.log(createPlaylistSearchTerm);
    createPlaylistSearchTracks(createPlaylistSearchTerm);
  }, [createPlaylistSearchTerm, accessToken]);

  // console.log(newReleases);

  useEffect(() => {
    if (!accessToken) return;
    if (searchTerm === "") setSearchData([]);

    if (category === "Home") {
      getNewReleases();
      getMusicCategories();
      getMyRecentPlayedSongs();
      getMyTopArtists();
      getMyTopTracks();
      setCategorySublist([]);
      setSearchTerm("");
    } else if (category === "Artists") {
      setShowArtistsCategory(true);
      setShowNewReleasesCategory(false);
      setShowSavedTracks(false);
      setShowMyPlaylists(false);
      getArtist(myTopArtists[0].id);
      getArtistRelatedArtists(artistDetails.id);
      setCategorySublist([]);
      setSearchTerm("");
    } else if (category === "New Releases") {
      setShowArtistsCategory(false);
      setShowNewReleasesCategory(true);
      setShowSavedTracks(false);
      setShowMyPlaylists(false);
      setAlbum(newReleases[0].id);
      selectAlbum(newReleases[0].id);
      setCategorySublist([]);
      setSearchTerm("");
    } else if (category === "Saved Tracks") {
      getMySavedTracks();
      setShowArtistsCategory(false);
      setShowNewReleasesCategory(false);
      setShowSavedTracks(true);
      setShowMyPlaylists(false);
      setCategorySublist([]);
      setSearchTerm("");
    } else if (category === "My Playlists") {
      getMyPlaylists();
      setShowArtistsCategory(false);
      setShowNewReleasesCategory(false);
      setShowSavedTracks(false);
      setShowMyPlaylists(true);
      setCategorySublist([]);
      setSearchTerm("");
    }
    getMyPlaylistsForSearchResults();
    getMyRecentPlayedSongs();
  }, [accessToken, category, currentUser]);

  const selectCategorySublist = (album) => {
    if (!accessToken) return;
    spotifyApi
      .getPlaylistsForCategory(album.id, {
        country: "IN",
        limit: 20,
        offset: 2,
      })
      .then(
        function (data) {
          setCategorySublist(data.body.playlists.items);
          setCategorySublistTitle({
            id: album.id,
            name: album.name,
            image: album.icons[0].url,
          });
          selectCategoryPlaylist(data.body.playlists.items[0]);
        },
        function (err) {
          console.log("Something went wrong!", err);
        }
      );
  };

  useEffect(() => {
    if (!accessToken) return;
    spotifyApi.getAudioAnalysisForTrack("3Qm86XLflmIXVm1wcwkgDK").then(
      function (data) {
        console.log(data.body);
      },
      function (err) {
        console.log(err);
      }
    );
  }, [accessToken]);

  const selectCategoryPlaylist = (playlist) => {
    if (!accessToken) return;
    setIsLoading(true);
    spotifyApi
      .getPlaylist(playlist.id)
      .then(function (data) {
        setAlbum(data.body);
        setPlaylistTracks(playlist.tracks.total);

        spotifyApi
          .getPlaylistTracks(playlist.id, {
            offset: 1,
          })
          .then((data) => {
            setShowAlbumList(true);
            setAlbumTracks(data.body);
            setSearchData([]);
            setIsLoading(false);
          });
      })

      .catch(function (error) {
        console.error(error);
      });
  };

  const selectAlbum = (albumId) => {
    if (!accessToken) return;
    // console.log(albumId);
    setIsLoading(true);

    spotifyApi
      .getAlbum(albumId)
      .then(function (data) {
        // console.log(data);
        spotifyApi.getArtistAlbums(data.body.artists[0].id).then(
          (data) => {
            setCurrentSongArtistAlbums(data.body);
            setIsLoading(false);
          },
          (err) => {
            console.error(err);
          }
        );
        setAlbum(data.body);
        return data.body.tracks.items.map(function (t) {
          return t.id;
        });
      })
      .then(function (trackIds) {
        return spotifyApi.getTracks(trackIds);
      })
      .then(function (data) {
        // console.log(data.body);
        // setShowAlbumList(true);

        setAlbumTracks(data.body.tracks);
        // setSearchData([]);
        // setIsLoading(false);
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  useEffect(() => {
    if (searchData.length > 0) {
      spotifyApi
        .getArtistAlbums(
          chooseTrack ? chooseTrack.artists[0].id : searchData[0].artists[0].id
        )
        .then(
          (data) => {
            setCurrentSongArtistAlbums(data.body);
            // console.log(searchData);
            // setFloatingPlayerPlay(true);
          },
          (err) => {
            console.error(err);
          }
        );
    }
  }, [searchData, chooseTrack]);

  useEffect(() => {
    if (!chooseTrack) return;
    setFloatingPlayerPlay(true);
  }, [chooseTrack]);

  const getMyPlaylistsForSearchResults = () => {
    if (!accessToken) return;
    console.log(currentUser);
    axios
      .get("https://api.spotify.com/v1/me/playlists", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-type": "application/json",
        },
      })
      .then((response) => {
        console.log(response.data.items);
        setMyPlaylist(response.data.items);
      });
  };

  const getNewReleases = () => {
    if (!accessToken) return;
    spotifyApi
      .getNewReleases({ limit: 45, offset: 0, country: "US" })
      .then((res) => {
        setNewReleases(res.body.albums.items);
        // console.log(res.body.albums.items);
      });
  };

  const getMusicCategories = () => {
    setShowArtistDetails(false);
    if (!accessToken) return;
    spotifyApi
      .getCategories({
        limit: 20,
        offset: 0,
        country: "AU",
        locale: "en_AU",
      })
      .then(
        function (data) {
          // console.log("get categories", data.body);

          setMusicCategories(data.body.categories.items);
        },
        function (err) {
          console.log("Something went wrong!", err);
        }
      );
  };

  const getMyRecentPlayedSongs = () => {
    if (!accessToken) return;
    spotifyApi
      .getMyRecentlyPlayedTracks({
        limit: 7,
      })
      .then(
        function (data) {
          // Output items
          // console.log("Your 40 most recently played tracks are:");
          setRecentlyPlayedSongs(data.body.items);
        },
        function (err) {
          console.log("Something went wrong!", err);
        }
      );
  };

  let filteredRecentlyPlayedSongs = recentlyPlayedSongs
    .map((e) => e.track["id"])
    .map((e, i, final) => final.indexOf(e) === i && i)
    .filter((obj) => recentlyPlayedSongs[obj])
    .map((e) => recentlyPlayedSongs[e]);

  const getMyTopArtists = () => {
    if (!accessToken) return;
    spotifyApi.getMyTopArtists({ limit: 32 }).then(
      function (data) {
        let topArtists = data.body.items;
        setMyTopArtists(topArtists);
        setArtistDetails(topArtists[0]);
      },
      function (err) {
        console.log("Something went wrong!", err);
      }
    );
  };

  const getMyTopTracks = () => {
    if (!accessToken) return;
    spotifyApi.getMyTopTracks({ limit: 30, offset: 1 }).then(
      function (data) {
        let topTracks = data.body.items;
        // console.log(topTracks);
        setMyTopTracks(topTracks);
      },
      function (err) {
        console.log("Something went wrong!", err);
      }
    );
  };

  const getArtist = (artistId) => {
    if (!accessToken) return;
    setIsLoading(true);
    // setShowArtistDetails(true);
    spotifyApi.getArtistTopTracks(artistId, "IN").then(
      function (data) {
        // console.log(data.body);
        setArtistTopTracks(data.body);
        getArtistRelatedArtists(artistId);

        setAlbumTracks(data.body.tracks);
        setSearchData([]);
        setIsLoading(false);
      },
      function (err) {
        console.log("Something went wrong!", err);
      }
    );
    spotifyApi.getArtist(artistId).then(
      function (data) {
        // console.log("Artist information", data.body);
        setArtistDetails(data.body);
        setSearchData([]);
      },
      function (err) {
        console.error(err);
      }
    );
  };

  const getArtistRelatedArtists = (artistId) => {
    if (!accessToken) return;
    spotifyApi.getArtistRelatedArtists(artistId).then(
      function (data) {
        // console.log("RelatedArtists", data.body);
        setRelatedArtists(data.body.artists);
      },
      function (err) {
        console.log(err);
      }
    );
  };

  const getMySavedTracks = () => {
    if (!accessToken) return;
    spotifyApi.getMySavedTracks().then(
      function (data) {
        console.log("Done!", data.body);
        setMySavedTracks(data.body.items);
      },
      function (err) {
        console.log("Something went wrong!", err);
      }
    );

    spotifyApi.getMySavedAlbums().then(
      function (data) {
        // Output items
        console.log("Saved Albums", data.body.items);
      },
      function (err) {
        console.log("Something went wrong!", err);
      }
    );
  };

  const getMyPlaylists = () => {
    if (!accessToken) return;
    console.log(currentUser);
    axios
      .get("https://api.spotify.com/v1/me/playlists", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-type": "application/json",
        },
      })
      .then((response) => {
        console.log(response.data.items);
        setMyPlaylist(response.data.items);
        spotifyApi.getPlaylistTracks(response.data.items[0].id).then((data) => {
          setAlbumTracks(data.body);
          setMyPlaylistTitle(response.data.items[0]);
          console.log(data.body.items);
        });
      });
  };

  const selectMyPlaylist = (playlist) => {
    if (!accessToken) return;
    setIsLoading(true);
    console.log(playlist);
    spotifyApi
      .getPlaylistTracks(playlist.id)
      .then((data) => {
        setAlbumTracks(data.body);
        setMyPlaylistTitle(playlist);
        console.log(data.body);
      })
      .then(() => setIsLoading(false));
  };

  const addTracksToMyPlaylist = (
    playlistId,
    myPlaylistTitle,
    spotifyUri,
    audioId
  ) => {
    if (!accessToken) return;
    console.log(playlistId, myPlaylistTitle, spotifyUri, audioId);
    spotifyApi.getPlaylistTracks(playlistId).then((data) => {
      console.log(data.body.items);
      if (
        data.body.items.find((item) => item.track.id === audioId) === undefined
      ) {
        spotifyApi
          .addTracksToPlaylist(playlistId, [spotifyUri])
          .then((data) => {
            console.log("Added tracks to playlist!", data.body.snapshot_id);
          })
          .then(() => {
            getMyPlaylists();
          })
          .then(() => {
            selectMyPlaylist(myPlaylistTitle);
            setOpenSnackbar({ message: "Added to playlist..", open: true });
            setSelectPlaylistOpen(false);
          })
          .catch((err) => console.log(err));
      } else {
        setOpenAlert({
          message: "Track already exists in this playlist..",
          open: true,
        });
      }
    });
  };

  const removeTracksFromMyPlaylist = (playlistId, spotifyUri) => {
    console.log(playlistId, spotifyUri);
    if (!accessToken) return;
    const tracks = [{ uri: spotifyUri }];
    spotifyApi
      .removeTracksFromPlaylist(playlistId, tracks)
      .then((data) => {
        console.log("Track removed", data.body.snapshot_id);
      })
      .then(() => {
        getMyPlaylists();
      })
      .then(() =>
        setOpenSnackbar({
          message: "Removed from playlist..",
          open: true,
        })
      )
      .catch((err) => console.log(err));
  };

  const addToSavedTracks = (track) => {
    console.log(track.id);
    spotifyApi.containsMySavedTracks([track.id]).then(
      function (data) {
        // An array is returned, where the first element corresponds to the first track ID in the query
        var trackIsInYourMusic = data.body[0];
        console.log(trackIsInYourMusic);
        setAnchorEl(null);

        if (trackIsInYourMusic) {
          console.log("Track was found in the user's Your Music library");
          setOpenAlert({
            message: "Track already exists in your Saved Albums..",
            open: true,
          });
        } else {
          console.log("Track was not found.");
          spotifyApi
            .addToMySavedTracks([track.id])
            .then((response) => {
              console.log("Track added to saved albums", response.body);
              getMySavedTracks();
            })
            .then(() => {
              setOpenSnackbar({
                message: "Added to saved tracks..",
                open: true,
              });
            })
            .catch((err) => console.log(err));
        }
      },
      function (err) {
        console.log("Something went wrong!", err);
      }
    );
  };

  const removeTrackFromSavedTracks = (trackId) => {
    if (!accessToken) return;
    spotifyApi
      .removeFromMySavedTracks([trackId])
      .then((data) => {
        console.log(data.body);
        getMySavedTracks();
      })
      .then(() => {
        setOpenSnackbar({
          message: "Removed from saved tracks..",
          open: true,
        });
      });
  };

  const createPlaylist = (title, description, longbase64uri) => {
    if (!accessToken) return;
    spotifyApi
      .createPlaylist(title, {
        description: description,
        public: true,
      })
      .then(
        function (data) {
          console.log("Created playlist!", data.body.id);
          if (longbase64uri !== null) {
            spotifyApi
              .uploadCustomPlaylistCoverImage(
                data.body.id,
                longbase64uri.split(",")[1]
              )
              .then(
                function (result) {
                  console.log("Playlsit cover image uploaded!", result.body);
                },
                function (err) {
                  console.log("Something went wrong!", err);
                }
              )
              .then(() => getMyPlaylists());
          }
          getMyPlaylists();
          // setOpenSnackbar("Playlist created successfully..")
        },
        function (err) {
          console.log("Something went wrong!", err);
        }
      );
  };

  const pauseSong = () => {
    if (!accessToken) return;
    spotifyApi.pause().then(
      function () {
        console.log("Playback paused");
      },
      function (err) {
        //if the user making the request is non-premium, a 403 FORBIDDEN response code will be returned
        console.log("Something went wrong!", err);
      }
    );
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnackbar(false);
  };

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleCloseSnackbar}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <div className="">
      <div>
        <div style={{ position: "fixed", width: "100%", zIndex: 1 }}>
          <Header
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            setCategory={setCategory}
            drawerWidth={drawerWidth}
            mobileOpen={mobileOpen}
            setMobileOpen={setMobileOpen}
            width={width}
            currentUser={currentUser}
            setSearchTerm={setSearchTerm}
          />
        </div>
        <Box
          className="p-4 pt-14 md:p-10 md:pt-14 lg:p-10 lg:pt-14 "
          sx={{
            display: { lg: "flex", md: "block", sm: "block", xs: "block" },
          }}
          style={
            chooseTrack
              ? {
                  paddingBottom: 130,
                }
              : {
                  paddingBottom: 0,
                }
          }
        >
          <Box
            component="main"
            sx={{
              width: {
                lg: `calc(100% - ${drawerWidth + recentSongsWidth + 30}px)`,
              },
              ml: { sm: `${drawerWidth}px` },
            }}
          >
            <div
              style={{
                display: "flex",

                justifyContent: "space-evenly",
                alignContent: "center",
              }}
            >
              <div
                style={
                  chooseTrack
                    ? {
                        display: "block",
                        width: "100%",
                      }
                    : {
                        display: "block",
                        width: "100%",
                      }
                }
              >
                {showSearchSongs && searchTerm !== "" ? (
                  <div
                    style={{
                      marginTop: 30,
                    }}
                  >
                    <SearchResults
                      searchTerm={searchTerm}
                      searchData={searchData}
                      chooseTrack={chooseTrack}
                      setChooseTrack={setChooseTrack}
                      currentSongPlayingId={currentSongPlayingId}
                      floatingPlayerPlay={floatingPlayerPlay}
                      setFloatingPlayerPlay={setFloatingPlayerPlay}
                      setCurrentSongPlayingId={setCurrentSongPlayingId}
                      setPlayButtonPressedCount={setPlayButtonPressedCount}
                      playButtonPressedCount={playButtonPressedCount}
                      addToSavedTracks={addToSavedTracks}
                      anchorEl={anchorEl}
                      setAnchorEl={setAnchorEl}
                      myPlaylist={myPlaylist}
                      addTracksToMyPlaylist={addTracksToMyPlaylist}
                      selectPlaylistOpen={selectPlaylistOpen}
                      setSelectPlaylistOpen={setSelectPlaylistOpen}
                    />
                  </div>
                ) : (
                  <div>
                    {categorySublist.length > 0 ? (
                      <div>
                        <CategoryPlaylist
                          searchTerm={searchTerm}
                          album={album}
                          categorySublist={categorySublist}
                          selectCategoryPlaylist={selectCategoryPlaylist}
                          categorySublistTitle={categorySublistTitle}
                          setCategorySublist={setCategorySublist}
                          searchData={searchData}
                          setChooseTrack={setChooseTrack}
                          setCurrentSongPlayingId={setCurrentSongPlayingId}
                          currentPlaylistPlayingId={currentPlaylistPlayingId}
                          setCurrentPlaylistPlayingId={
                            setCurrentPlaylistPlayingId
                          }
                          floatingPlayerPlay={floatingPlayerPlay}
                          setFloatingPlayerPlay={setFloatingPlayerPlay}
                          isLoading={isLoading}
                          setSearchData={setSearchData}
                          setAlbumTracks={setAlbumTracks}
                          albumTracks={albumTracks}
                          chooseTrack={chooseTrack}
                          setChooseTrack={setChooseTrack}
                          currentSongPlayingId={currentSongPlayingId}
                          floatingPlayerPlay={floatingPlayerPlay}
                          setFloatingPlayerPlay={setFloatingPlayerPlay}
                          setCurrentSongPlayingId={setCurrentSongPlayingId}
                          setPlayButtonPressedCount={setPlayButtonPressedCount}
                          playButtonPressedCount={playButtonPressedCount}
                        />
                      </div>
                    ) : showArtistDetails ? (
                      <ArtistDetails
                        floatingPlayerPlay={floatingPlayerPlay}
                        artistDetails={artistDetails}
                        artistTopTracks={artistTopTracks}
                        selectCategoryPlaylist={selectCategoryPlaylist}
                        setShowArtistDetails={setShowArtistDetails}
                        albumTracks={albumTracks}
                        chooseTrack={chooseTrack}
                        setChooseTrack={setChooseTrack}
                        currentSongPlayingId={currentSongPlayingId}
                        setFloatingPlayerPlay={setFloatingPlayerPlay}
                        setCurrentSongPlayingId={setCurrentSongPlayingId}
                        isLoading={isLoading}
                        setIsLoading={setIsLoading}
                        setPlayButtonPressedCount={setPlayButtonPressedCount}
                        playButtonPressedCount={playButtonPressedCount}
                        setSearchData={setSearchData}
                        setAlbumTracks={setAlbumTracks}
                      />
                    ) : category === "Home" ? (
                      <Home
                        chooseTrack={chooseTrack}
                        setChooseTrack={setChooseTrack}
                        floatingPlayerPlay={floatingPlayerPlay}
                        setFloatingPlayerPlay={setFloatingPlayerPlay}
                        currentSongPlayingId={currentSongPlayingId}
                        setCurrentSongPlayingId={setCurrentSongPlayingId}
                        recentlyPlayedSongs={recentlyPlayedSongs}
                        newReleases={newReleases}
                        myTopArtists={myTopArtists}
                        myTopTracks={myTopTracks}
                        selectAlbum={selectAlbum}
                        musicCategories={musicCategories}
                        selectCategorySublist={selectCategorySublist}
                        getArtist={getArtist}
                        album={album}
                        setShowAlbumList={setShowAlbumList}
                        searchTerm={searchTerm}
                        searchTracks={searchTracks}
                        playlistTracks={playlistTracks}
                        setSearchData={setSearchData}
                        setAlbumTracks={setAlbumTracks}
                        setPlayButtonPressedCount={setPlayButtonPressedCount}
                        playButtonPressedCount={playButtonPressedCount}
                        albumTracks={albumTracks}
                      />
                    ) : category === "Artists" ? (
                      <div>
                        <Artists
                          width={width}
                          myTopArtists={myTopArtists}
                          getArtist={getArtist}
                          getArtistRelatedArtists={getArtistRelatedArtists}
                          artistDetails={artistDetails}
                        />
                        <ArtistDetails
                          floatingPlayerPlay={floatingPlayerPlay}
                          artistDetails={artistDetails}
                          artistTopTracks={artistTopTracks}
                          selectCategoryPlaylist={selectCategoryPlaylist}
                          setShowArtistDetails={setShowArtistDetails}
                          albumTracks={albumTracks}
                          chooseTrack={chooseTrack}
                          setChooseTrack={setChooseTrack}
                          currentSongPlayingId={currentSongPlayingId}
                          setFloatingPlayerPlay={setFloatingPlayerPlay}
                          setCurrentSongPlayingId={setCurrentSongPlayingId}
                          isLoading={isLoading}
                          setIsLoading={setIsLoading}
                          setPlayButtonPressedCount={setPlayButtonPressedCount}
                          playButtonPressedCount={playButtonPressedCount}
                          setSearchData={setSearchData}
                          setAlbumTracks={setAlbumTracks}
                          relatedArtists={relatedArtists}
                          getArtist={getArtist}
                          getArtistRelatedArtists={getArtistRelatedArtists}
                        />
                      </div>
                    ) : category === "New Releases" ? (
                      <div>
                        <NewReleases
                          newReleases={newReleases}
                          selectAlbum={selectAlbum}
                          album={album}
                          setShowAlbumList={setShowAlbumList}
                          searchTerm={searchTerm}
                          searchTracks={searchTracks}
                          playlistTracks={playlistTracks}
                          setSearchData={setSearchData}
                          setAlbumTracks={setAlbumTracks}
                          albumTracks={albumTracks}
                          chooseTrack={chooseTrack}
                          setChooseTrack={setChooseTrack}
                          currentSongPlayingId={currentSongPlayingId}
                          floatingPlayerPlay={floatingPlayerPlay}
                          setFloatingPlayerPlay={setFloatingPlayerPlay}
                          setCurrentSongPlayingId={setCurrentSongPlayingId}
                          setPlayButtonPressedCount={setPlayButtonPressedCount}
                          playButtonPressedCount={playButtonPressedCount}
                          isLoading={isLoading}
                        />
                      </div>
                    ) : category === "Saved Tracks" ? (
                      <MySavedTracks
                        createPlaylistSearchTerm={createPlaylistSearchTerm}
                        setCreatePlaylistSearchTerm={
                          setCreatePlaylistSearchTerm
                        }
                        createPlaylistSearchData={createPlaylistSearchData}
                        addTracksToMyPlaylist={addTracksToMyPlaylist}
                        addToSavedTracks={addToSavedTracks}
                        mySavedTracks={mySavedTracks}
                        floatingPlayerPlay={floatingPlayerPlay}
                        setFloatingPlayerPlay={setFloatingPlayerPlay}
                        currentSongPlayingId={currentSongPlayingId}
                        setCurrentSongPlayingId={setCurrentSongPlayingId}
                        setChooseTrack={setChooseTrack}
                        setPlayButtonPressedCount={setPlayButtonPressedCount}
                        playButtonPressedCount={playButtonPressedCount}
                        removeTrackFromSavedTracks={removeTrackFromSavedTracks}
                      />
                    ) : category === "My Playlists" ? (
                      <MyPlaylist
                        createPlaylistSearchTerm={createPlaylistSearchTerm}
                        setCreatePlaylistSearchTerm={
                          setCreatePlaylistSearchTerm
                        }
                        createPlaylistSearchData={createPlaylistSearchData}
                        setCreatePlaylistSearchData={
                          setCreatePlaylistSearchData
                        }
                        chooseTrack={chooseTrack}
                        myPlaylist={myPlaylist}
                        myPlaylistTitle={myPlaylistTitle}
                        selectMyPlaylist={selectMyPlaylist}
                        setChooseTrack={setChooseTrack}
                        currentSongPlayingId={currentSongPlayingId}
                        floatingPlayerPlay={floatingPlayerPlay}
                        setFloatingPlayerPlay={setFloatingPlayerPlay}
                        setCurrentSongPlayingId={setCurrentSongPlayingId}
                        setPlayButtonPressedCount={setPlayButtonPressedCount}
                        playButtonPressedCount={playButtonPressedCount}
                        addTracksToMyPlaylist={addTracksToMyPlaylist}
                        removeTracksFromMyPlaylist={removeTracksFromMyPlaylist}
                        createPlaylist={createPlaylist}
                        albumTracks={albumTracks}
                        isLoading={isLoading}
                      />
                    ) : null}
                  </div>
                )}
              </div>
            </div>
            {chooseTrack ? (
              <div
                style={{
                  position: "fixed",
                  bottom: 0,
                  zIndex: 1,
                  right: 0,
                  left: width < 582 ? 0 : drawerWidth,
                  width: { sm: `calc(100% - ${drawerWidth}px)` },
                }}
              >
                <div>
                  <FloatingPlayer
                    accessToken={accessToken}
                    searchTerm={searchTerm}
                    searchData={searchData}
                    floatingPlayerPlay={floatingPlayerPlay}
                    setFloatingPlayerPlay={setFloatingPlayerPlay}
                    chooseTrack={chooseTrack}
                    setChooseTrack={setChooseTrack}
                    currentSongPlayingId={currentSongPlayingId}
                    setCurrentSongPlayingId={setCurrentSongPlayingId}
                    playerDetails={playerDetails}
                    setPlayerDetails={setPlayerDetails}
                    pauseSong={pauseSong}
                    setSongProgress={setSongProgress}
                    setPlayButtonPressedCount={setPlayButtonPressedCount}
                    playButtonPressedCount={playButtonPressedCount}
                    albumTracks={albumTracks}
                  />
                </div>
              </div>
            ) : null}
          </Box>

          <Box
            sx={{
              display: { xs: "none", sm: "none", md: "none", lg: "block" },
            }}
          >
            <RecentlyPlayed
              recentlyPlayedSongs={recentlyPlayedSongs}
              filteredRecentlyPlayedSongs={filteredRecentlyPlayedSongs}
              floatingPlayerPlay={floatingPlayerPlay}
              setFloatingPlayerPlay={setFloatingPlayerPlay}
              currentSongPlayingId={currentSongPlayingId}
              setCurrentSongPlayingId={setCurrentSongPlayingId}
              setChooseTrack={setChooseTrack}
              setPlayButtonPressedCount={setPlayButtonPressedCount}
              playButtonPressedCount={playButtonPressedCount}
              recentSongsWidth={recentSongsWidth}
            />
          </Box>
          {searchTerm === "" ? (
            <Box
              sx={{
                display: { xs: "block", sm: "block", md: "block", lg: "none" },
                width: {
                  lg: `calc(100% - ${drawerWidth + recentSongsWidth + 30}px)`,
                },
                ml: { sm: `${drawerWidth}px` },
              }}
              className="mt-10 "
            >
              <RecentlyPlayedMobile
                recentlyPlayedSongs={recentlyPlayedSongs}
                filteredRecentlyPlayedSongs={filteredRecentlyPlayedSongs}
                floatingPlayerPlay={floatingPlayerPlay}
                setFloatingPlayerPlay={setFloatingPlayerPlay}
                currentSongPlayingId={currentSongPlayingId}
                setCurrentSongPlayingId={setCurrentSongPlayingId}
                setChooseTrack={setChooseTrack}
                setPlayButtonPressedCount={setPlayButtonPressedCount}
                playButtonPressedCount={playButtonPressedCount}
                recentSongsWidth={recentSongsWidth}
              />
            </Box>
          ) : null}
        </Box>
      </div>
      <Snackbar
        open={openSnackbar.open}
        autoHideDuration={2000}
        onClose={handleCloseSnackbar}
        action={action}
        message={openSnackbar.message}
      />
      <Dialog
        open={openAlert.open}
        onClose={handleCloseAlert}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle
          id="alert-dialog-title"
          style={{ fontSize: 16, textTransform: "uppercase", letterSpacing: 2 }}
        >
          Track found!
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            id="alert-dialog-description"
            style={{ fontSize: 14 }}
          >
            {openAlert.message}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAlert} autoFocus>
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Dashboard;
