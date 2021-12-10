import React, { useState } from "react";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  IconButton,
  Tooltip,
  Typography,
  Popover,
  Modal,
  Box,
  Grid,
  Paper,
} from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ClearIcon from "@mui/icons-material/Clear";

import { styled, alpha } from "@mui/material/styles";

import noImage from "../../assets/no-image1.jpg";

const msToTime = (duration) => {
  let seconds = Math.floor((duration / 1000) % 60),
    minutes = Math.floor((duration / (1000 * 60)) % 60);

  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;

  return minutes + ":" + seconds;
};

const truncateMobile = (str) => {
  return str.length > 30 ? str.substr(0, 22) + "..." : str;
};

const truncateArtistNameMobile = (str) => {
  return str.length > 12 ? str.substr(0, 10) + " ..." : str;
};

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { lg: 400, md: 400, sm: 400, xs: "100%" },
  bgcolor: "background.paper",
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
};

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const SearchResults = ({
  searchTerm,
  searchData,
  chooseTrack,
  setChooseTrack,
  currentSongPlayingId,
  floatingPlayerPlay,
  setFloatingPlayerPlay,
  setCurrentSongPlayingId,
  playButtonPressedCount,
  setPlayButtonPressedCount,
  addToSavedTracks,
  anchorEl,
  setAnchorEl,
  myPlaylist,
  addTracksToMyPlaylist,
  selectPlaylistOpen,
  setSelectPlaylistOpen,
}) => {
  const [selectCurrentTrack, setSelectCurrentTrack] = useState(null);

  const [selectPlaylist, setSelectPlaylist] = useState(null);
  const [selectedTrack, setSelectedTrack] = useState({});

  const handleClick = (event, audio) => {
    setAnchorEl(event.currentTarget);
    setSelectCurrentTrack(audio);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSelectPlaylistClose = () => {
    setSelectPlaylistOpen(false);
  };

  console.log(selectPlaylist);

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  return (
    <div>
      <div style={{ margin: 2, marginBottom: 20, fontSize: 14 }}>
        <span className="text-gray-400">Showing top 20 results for</span>{" "}
        {searchTerm ? `"${searchTerm}"` : null}
      </div>

      {searchData.length !== 0 ? (
        <div className="flex flex-col mt-2 mb-2">
          <div>
            <div className={searchData.length > 5 ? "songsBox" : null}>
              <div className=" align-middle ">
                <div>
                  <ul
                    role="list"
                    className={searchData ? "sidebarMobile" : null}
                  >
                    {/* {console.log(searchData)} */}
                    {searchData?.map((audio) => (
                      <div
                        style={{
                          display: "block",
                          margin: "0 auto",
                          width: "100%",
                        }}
                        key={audio.id}
                      >
                        <li
                          style={{ alignItems: "center" }}
                          className="py-1 flex border border-gray-200 rounded-md overflow-hidden"
                        >
                          <div
                            // onClick={() => selectAlbum(audio.track.id)}
                            style={{ cursor: "pointer" }}
                            className="ml-1 flex-shrink-0 w-16 h-16 border border-gray-200 rounded-md overflow-hidden"
                          >
                            {audio.album.images[0] !== undefined ? (
                              <img
                                src={audio.album.images[0].url}
                                // alt={album.id ? album.images[0].url : noImage}
                                className="w-full h-full object-center object-cover"
                              />
                            ) : (
                              <img
                                src={noImage}
                                // alt={album.id ? album.images[0].url : noImage}
                                className="w-full h-full object-center object-cover"
                              />
                            )}
                          </div>

                          <div
                            className="ml-3 flex-1 flex flex-col mr-2"
                            style={{ position: "relative" }}
                          >
                            <div>
                              <div
                                className={`flex justify-between text-${
                                  audio.id === currentSongPlayingId
                                    ? "blue"
                                    : "gray"
                                }-600`}
                              >
                                <Typography
                                  style={{
                                    fontSize: 13,
                                    textTransform: "capitalize",
                                  }}
                                >
                                  {audio.name
                                    ? truncateMobile(audio.name)
                                    : "No name"}
                                </Typography>
                              </div>

                              <div
                                className={`mt-1 mb-1 flex items-center  text-${
                                  audio.id === currentSongPlayingId
                                    ? "blue"
                                    : "gray"
                                }-400`}
                              >
                                {audio.artists.length < 2 ? (
                                  <span
                                    style={{ fontSize: 12 }}
                                    color={
                                      audio.id === currentSongPlayingId
                                        ? "blue"
                                        : ""
                                    }
                                  >
                                    {audio.artists[0].name
                                      ? audio.artists[0].name
                                      : "No artist name"}
                                  </span>
                                ) : (
                                  <>
                                    <span style={{ fontSize: 12 }}>
                                      {audio.artists
                                        .filter((artist, index) => index < 3)
                                        .map((artist, index) =>
                                          index >= 2 ? null : (
                                            <span
                                              key={artist.id}
                                              style={
                                                index === 1
                                                  ? {
                                                      fontSize: 12,
                                                      marginLeft: 4,
                                                    }
                                                  : { fontSize: 12 }
                                              }
                                            >
                                              {index === 1
                                                ? truncateArtistNameMobile(
                                                    artist.name
                                                  )
                                                : artist.name}

                                              {index !== 1 ? "," : ""}
                                            </span>
                                          )
                                        )}
                                    </span>
                                  </>
                                )}
                              </div>
                              <div
                                style={{
                                  fontSize: 12,
                                  position: "relative",
                                }}
                                className={`text-${
                                  audio.id === currentSongPlayingId
                                    ? "blue"
                                    : "gray"
                                }-700`}
                              >
                                {msToTime(audio.duration_ms)}
                                <div>
                                  {audio.id === currentSongPlayingId ? (
                                    floatingPlayerPlay ? (
                                      <span id="bars">
                                        <span className="bar"></span>
                                        <span className="bar"></span>
                                        <span className="bar"></span>
                                        <span className="bar"></span>
                                        <span className="bar"></span>
                                        <span className="bar"></span>
                                        <span className="bar"></span>
                                      </span>
                                    ) : null
                                  ) : null}
                                </div>
                              </div>
                            </div>

                            <div
                              style={{
                                position: "absolute",
                                right: 6,
                                top: 14,
                                display: "flex",
                                alignItems: "center",
                              }}
                            >
                              <div>
                                {audio.id === currentSongPlayingId ? (
                                  floatingPlayerPlay ? (
                                    <Tooltip placement="top" title="Pause">
                                      <IconButton
                                        size="small"
                                        style={{
                                          backgroundColor: "rgb(240, 240, 240)",
                                        }}
                                        color={
                                          audio.id === currentSongPlayingId
                                            ? "primary"
                                            : "inherit"
                                        }
                                        onClick={() => {
                                          console.log("Pause");
                                          setFloatingPlayerPlay(false);
                                        }}
                                      >
                                        <PauseIcon />
                                      </IconButton>
                                    </Tooltip>
                                  ) : (
                                    <Tooltip placement="top" title="Play">
                                      <IconButton
                                        size="small"
                                        style={{
                                          backgroundColor: "rgb(240, 240, 240)",
                                        }}
                                        color={
                                          audio.id === currentSongPlayingId
                                            ? "primary"
                                            : "inherit"
                                        }
                                        onClick={() => {
                                          console.log("Play");
                                          setFloatingPlayerPlay(true);
                                        }}
                                      >
                                        <PlayArrowIcon />
                                      </IconButton>
                                    </Tooltip>
                                  )
                                ) : (
                                  <Tooltip placement="top" title="Play">
                                    <IconButton
                                      size="small"
                                      style={{
                                        backgroundColor: "rgb(240, 240, 240)",
                                      }}
                                      color={
                                        audio.id === currentSongPlayingId
                                          ? "primary"
                                          : "inherit"
                                      }
                                      onClick={() => {
                                        setChooseTrack(audio);
                                        setCurrentSongPlayingId(audio.id);
                                        setPlayButtonPressedCount(
                                          (playButtonPressedCount += 1)
                                        );
                                      }}
                                    >
                                      <PlayArrowIcon />
                                    </IconButton>
                                  </Tooltip>
                                )}
                              </div>
                              <div
                                style={{
                                  marginLeft: 8,
                                  cursor: "pointer",
                                }}
                                onClick={(event) => {
                                  handleClick(event, audio);
                                }}
                              >
                                <Tooltip placement="top" title="More">
                                  <MoreHorizIcon
                                    color={
                                      audio.id === currentSongPlayingId
                                        ? "primary"
                                        : "action"
                                    }
                                  />
                                </Tooltip>
                              </div>
                            </div>
                          </div>
                        </li>
                      </div>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
          >
            {/* <Typography sx={{ p: 1.5, fontSize: 14 }}>
            The content of the Popover.
          </Typography> */}
            <List sx={{ fontSize: 14 }} dense>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemText
                    onClick={() => {
                      addToSavedTracks(selectCurrentTrack);
                    }}
                    primary={
                      <Typography style={{ fontSize: 13 }}>
                        Add to Saved Tracks
                      </Typography>
                    }
                  />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton component="a" href="#simple-list">
                  <ListItemText
                    onClick={() => {
                      setSelectPlaylistOpen(true);
                      setAnchorEl(null);
                    }}
                    primary={
                      <Typography style={{ fontSize: 13 }}>
                        Add to My Playlist
                      </Typography>
                    }
                  />
                </ListItemButton>
              </ListItem>
            </List>
          </Popover>
          <Modal
            open={selectPlaylistOpen}
            onClose={handleSelectPlaylistClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div
                  className="text-gray-900"
                  style={{
                    fontSize: 15,
                    letterSpacing: 1,
                    textTransform: "uppercase",
                  }}
                >
                  Select a Playlist
                </div>
                <IconButton onClick={handleSelectPlaylistClose} size="small">
                  <ClearIcon fontSize="small" />
                </IconButton>
              </div>
              {myPlaylist.length > 0 ? (
                <Grid
                  container
                  spacing={2}
                  // columns={{ xs: 4, sm: 8, md: 12 }}
                  style={{ marginTop: 10, height: 400, overflowY: "scroll" }}
                >
                  {myPlaylist?.map((playlist, index) => (
                    <Grid
                      item
                      xs={6}
                      sm={6}
                      md={6}
                      lg={6}
                      xl={6}
                      key={playlist.id}
                    >
                      <Item
                        variant="outlined"
                        // style={{ cursor: "pointer", position: "relative",  }}
                        style={
                          selectPlaylist.id === playlist.id
                            ? { backgroundColor: "rgb(230, 230, 230)" }
                            : null
                        }
                        className="cardHover"
                        onClick={() => {
                          setSelectPlaylist(playlist);
                          setSelectedTrack(selectCurrentTrack);
                        }}
                      >
                        <li
                          key={playlist.id}
                          style={{
                            marginRight: 10,

                            listStyleType: "none",
                          }}
                          className="py-1 flex-shrink-0 w-28 rounded-md overflow-hidden"
                        >
                          <div className=" mr-1 mb-2 flex-shrink-0 h-28 align-center rounded-md overflow-hidden">
                            {playlist.images[0] !== undefined ? (
                              <img
                                src={playlist.images[0].url}
                                // alt={album.id ? album.images[0].url : noImage}
                                className="w-full h-full object-center object-cover"
                              />
                            ) : (
                              <img
                                src={noImage}
                                alt={noImage}
                                className="w-full h-full object-center object-cover"
                              />
                            )}
                          </div>
                        </li>
                        <div style={{ fontSize: 13 }} className="mt-1">
                          <div
                            style={{
                              textTransform: "uppercase",
                              fontSize: 13,
                            }}
                          >
                            {playlist.name}
                          </div>

                          {/* <span>
                        {playlist.tracks.total}{" "}
                        {playlist.tracks.total > 1 ? "tracks" : "track"}
                      </span> */}
                        </div>
                      </Item>
                    </Grid>
                  ))}
                </Grid>
              ) : (
                <div
                  style={{
                    margin: "100px 0",
                    fontSize: 14,
                    textAlign: "center",
                  }}
                >
                  <div style={{ textTransform: "uppercase", letterSpacing: 1 }}>
                    No Playlists found...
                  </div>

                  <div style={{ fontSize: 14, marginTop: 10 }}>
                    Create one and come back..
                  </div>
                </div>
              )}

              <div
                style={{
                  marginTop: 20,
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <button
                  class="w-1/2 pt-2 pb-2  rounded-md bg-black text-white"
                  type="submit"
                  onClick={() => {
                    addTracksToMyPlaylist(
                      selectPlaylist.id,
                      selectPlaylist,
                      selectedTrack.uri,
                      selectedTrack.id
                    );
                  }}
                >
                  Done
                </button>
              </div>
            </Box>
          </Modal>
        </div>
      ) : (
        // <div
        //   style={{
        //     display: "flex",
        //     justifyContent: "center",
        //     alignItems: "center",
        //     marginTop: 200,
        //   }}
        // >
        //   <CircularProgress size={28} />
        // </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: 200,
          }}
        >
          <span>No results found...</span>
        </div>
      )}
    </div>
  );
};

export default SearchResults;

