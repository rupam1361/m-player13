import React, { useEffect, useState } from "react";
import {
  IconButton,
  Grid,
  Paper,
  Fab,
  Tooltip,
  Modal,
  Box,
  InputBase,
  Typography,
} from "@mui/material";

import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import AddCircleOutlinedIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";

import { styled, alpha } from "@mui/material/styles";

import noImage from "../../assets/no-image1.jpg";

const truncate = (str) => {
  return str.length > 20 ? str.substr(0, 15) + "..." : str;
};

const truncateMobile = (str) => {
  return str.length > 30 ? str.substr(0, 22) + "..." : str;
};

const truncateArtistNameMobile = (str) => {
  return str.length > 12 ? str.substr(0, 10) + " ..." : str;
};

const msToTime = (duration) => {
  let seconds = Math.floor((duration / 1000) % 60),
    minutes = Math.floor((duration / (1000 * 60)) % 60);

  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;

  return minutes + ":" + seconds;
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

const MySavedTracks = ({
  createPlaylistSearchTerm,
  setCreatePlaylistSearchTerm,
  createPlaylistSearchData,
  addToSavedTracks,
  mySavedTracks,
  floatingPlayerPlay,
  setFloatingPlayerPlay,
  currentSongPlayingId,
  setCurrentSongPlayingId,
  setChooseTrack,
  setPlayButtonPressedCount,
  playButtonPressedCount,
  removeTrackFromSavedTracks,
}) => {
  const [selectTracksOpen, setSelectTracksOpen] = useState(false);
  const handleSelectTracksClose = () => setSelectTracksOpen(false);

  const Search = styled("div")(({ theme }) => ({
    position: "relative",
    // borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    // marginLeft: 0,
    width: "auto",
    // [theme.breakpoints.up("sm")]: {
    //   marginLeft: theme.spacing(1),
    //   width: "auto",
    // },
  }));

  const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    "& .MuiInputBase-input": {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        // "&:focus": {
        //   width: "32ch",
        // },
      },
    },
  }));

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  console.log(mySavedTracks);

  return (
    <div>
      <div
        style={{
          margin: 12,
          marginTop: 30,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <p
          className="text-gray-900"
          style={{
            fontSize: 14,
            letterSpacing: 2,
          }}
        >
          MY SAVED TRACKS ({mySavedTracks.length})
        </p>
        <Tooltip placement="top" title="Add Tracks">
          <Fab
            color="inherit"
            aria-label="add"
            size="small"
            style={{ marginRight: 8 }}
            onClick={setSelectTracksOpen}
          >
            <AddIcon />
          </Fab>
        </Tooltip>
      </div>
      {/* {console.log(myTopTracks)} */}

      <Grid
        container
        spacing={2}
        // columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {mySavedTracks?.map((savedTrack, index) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            lg={4}
            xl={3}
            key={savedTrack.track.id}
          >
            <Item
              variant="outlined"
              style={{ cursor: "pointer", position: "relative" }}
              className="cardHover"
            >
              {console.log(savedTrack)}
              <li
                key={savedTrack.track.id}
                style={{
                  marginRight: 10,
                  alignItems: "center",
                  listStyleType: "none",
                }}
                className="py-1 flex-shrink-0 w-30  rounded-md overflow-hidden"
              >
                <div className="ml-1 mr-1 mb-2 flex-shrink-0   rounded-md overflow-hidden">
                  {savedTrack.track.album.images[0] !== undefined ? (
                    <img
                      src={savedTrack.track.album.images[0].url}
                      // alt={album.id ? album.images[0].url : noImage}
                      className="w-full h-full object-center object-cover"
                    />
                  ) : (
                    <img
                      src={noImage}
                      alt={
                        savedTrack.track.album.id
                          ? savedTrack.track.album.images[0].url
                          : noImage
                      }
                      className="w-full h-full object-center object-cover"
                    />
                  )}
                  {floatingPlayerPlay &&
                  savedTrack.track.id === currentSongPlayingId ? (
                    <div
                      style={{
                        position: "absolute",
                        bottom: 1,
                        left: 14,
                        // backgroundColor: "white",
                        padding: 17,
                        paddingRight: 19,
                        borderTopRightRadius: 10,
                      }}
                    >
                      <span
                        style={{
                          position: "absolute",
                          left: 6,
                          bottom: 8,
                        }}
                      >
                        <span className="bar"></span>
                        <span className="bar"></span>
                        <span className="bar"></span>
                        <span className="bar"></span>
                        <span className="bar"></span>
                        <span className="bar"></span>
                      </span>
                    </div>
                  ) : null}

                  <div
                    style={{
                      position: "absolute",
                      right: 10,
                      bottom: 10,
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <div>
                      {savedTrack.track.id === currentSongPlayingId ? (
                        floatingPlayerPlay ? (
                          <Tooltip placement="top" title="Pause">
                            <IconButton
                              size="small"
                              style={{
                                backgroundColor: "rgb(220, 220, 220)",
                              }}
                              color={
                                savedTrack.track.id === currentSongPlayingId
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
                                backgroundColor: "rgb(220, 220, 220)",
                              }}
                              color={
                                savedTrack.track.id === currentSongPlayingId
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
                              backgroundColor: "rgb(220, 220, 220)",
                            }}
                            color={
                              savedTrack.track.id === currentSongPlayingId
                                ? "primary"
                                : "inherit"
                            }
                            onClick={() => {
                              setChooseTrack(savedTrack.track);
                              setCurrentSongPlayingId(savedTrack.track.id);
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
                        marginLeft: 14,
                        cursor: "pointer",
                      }}
                      onClick={() =>
                        removeTrackFromSavedTracks(savedTrack.track.id)
                      }
                    >
                      <Tooltip placement="top" title="Remove">
                        <RemoveCircleOutlineIcon
                          color={
                            savedTrack.track.id === currentSongPlayingId
                              ? "primary"
                              : "action"
                          }
                        />
                      </Tooltip>
                    </div>
                  </div>

                  <p
                    className={`flex justify-between text-${
                      savedTrack.track.id === currentSongPlayingId
                        ? "blue"
                        : "gray"
                    }-600`}
                    style={{
                      position: "absolute",
                      right: 16,
                      bottom: 52,
                      fontSize: 13,
                    }}
                  >
                    {savedTrack.track.popularity}
                  </p>
                </div>

                <div className="ml-1 mt-2 mb-2 flex-1 flex flex-col mr-2">
                  <div>
                    <div
                      className={`flex justify-between text-${
                        savedTrack.track.id === currentSongPlayingId
                          ? "blue"
                          : "gray"
                      }-600`}
                      style={{ fontSize: 13, alignItems: "center" }}
                    >
                      <p>{`${truncate(savedTrack.track.name)}`}</p>
                    </div>

                    <div class="mt-1 flex items-center text-sm text-gray-500">
                      <p
                        className={`text-sm text-${
                          savedTrack.track.id === currentSongPlayingId
                            ? "blue"
                            : "gray"
                        }-400`}
                        style={{ fontSize: 12 }}
                      >
                        {savedTrack.track.album.artists[0].name}
                      </p>
                    </div>

                    {/* <div
                      style={{ fontSize: 12.6 }}
                      className="mt-1 flex items-center"
                    >
                      <div
                        style={{
                          textTransform: "capitalize",
                          fontSize: 12.6,
                        }}
                      >
                        {track.album.album_type}
                      </div>
                      <div
                        class="text-base font-normal mx-1"
                        style={{ fontSize: 40 }}
                      >
                        ·
                      </div>

                      <span>
                        {track.album.total_tracks}{" "}
                        {track.album.total_tracks > 1 ? "tracks" : "track"}
                      </span>
                    </div> */}
                  </div>
                </div>
              </li>
            </Item>
          </Grid>
        ))}
      </Grid>
      <Modal
        open={selectTracksOpen}
        onClose={handleSelectTracksClose}
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
              Add Tracks
            </div>
            <IconButton onClick={handleSelectTracksClose} size="small">
              <ClearIcon fontSize="small" />
            </IconButton>
          </div>

          <div style={{ marginTop: 20 }}>
            <Search style={{ position: "relative" }}>
              <SearchIconWrapper>
                <SearchIcon color="primary" />
              </SearchIconWrapper>
              <StyledInputBase
                autoFocus
                placeholder="Search for tracks to add.."
                inputProps={{ "aria-label": "search" }}
                value={createPlaylistSearchTerm}
                onChange={(e) => {
                  setCreatePlaylistSearchTerm(e.target.value);
                }}
                style={{
                  borderWidth: 1,
                  borderColor: "rgb(220, 220, 220)",
                  marginRight: 30,
                  borderRadius: 10,
                  fontSize: 14,
                  width: "100%",
                }}
              />
              {createPlaylistSearchTerm ? (
                <span style={{ position: "absolute", right: 6, top: 4 }}>
                  <IconButton
                    onClick={() => setCreatePlaylistSearchTerm("")}
                    size="small"
                  >
                    <ClearIcon fontSize="small" />
                  </IconButton>
                </span>
              ) : null}
            </Search>
          </div>
          {createPlaylistSearchData.length > 0 ? (
            <div style={{ marginTop: 20 }}>
              <Typography
                id="modal-modal-title"
                variant="body2"
                component="h2"
                style={{ letterSpacing: 1 }}
              >
                Search results
              </Typography>
            </div>
          ) : null}
          <div style={{ marginTop: 20 }}>
            <div className="flex flex-col mt-2 mb-2">
              <div>
                <div>
                  <div className=" align-middle ">
                    <div>
                      <ul
                        className={
                          createPlaylistSearchData.length > 0
                            ? "createPlaylistSongsBox"
                            : null
                        }
                        role="list"
                      >
                        {createPlaylistSearchData?.map((audio) => (
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
                                style={{ cursor: "pointer" }}
                                className="ml-1 flex-shrink-0 w-16 h-16 border border-gray-200 rounded-md overflow-hidden"
                              >
                                {audio.album.images[0] !== undefined ? (
                                  <img
                                    src={audio.album.images[0].url}
                                    className="w-full h-full object-center object-cover"
                                  />
                                ) : (
                                  <img
                                    src={noImage}
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
                                            .filter(
                                              (artist, index) => index < 3
                                            )
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
                                          </span>
                                        ) : null
                                      ) : null}
                                    </div>
                                  </div>
                                </div>
                                <div
                                  style={{
                                    position: "absolute",
                                    right: 0,
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
                                              backgroundColor:
                                                "rgb(240, 240, 240)",
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
                                              backgroundColor:
                                                "rgb(240, 240, 240)",
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
                                            backgroundColor:
                                              "rgb(240, 240, 240)",
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
                                      marginLeft: 14,
                                      cursor: "pointer",
                                    }}
                                    onClick={() => addToSavedTracks(audio)}
                                  >
                                    <Tooltip placement="top" title="Add">
                                      <AddCircleOutlinedIcon
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
            </div>
          </div>
          <div
            style={{ marginTop: 20, display: "flex", justifyContent: "center" }}
          >
            <button
              class="w-1/2 pt-2 pb-2  rounded-md bg-black text-white"
              type="submit"
              onClick={handleSelectTracksClose}
            >
              Done
            </button>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default MySavedTracks;
