import React, { useRef, useState, useEffect } from "react";
import {
  IconButton,
  Typography,
  Modal,
  Box,
  InputBase,
  Fab,
  Tooltip,
  CircularProgress,
} from "@mui/material";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import AddIcon from "@mui/icons-material/Add";
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
  p: 3,
};

const MyPlaylist = ({
  createPlaylistSearchTerm,
  setCreatePlaylistSearchTerm,
  createPlaylistSearchData,
  myPlaylist,
  myPlaylistTitle,
  selectMyPlaylist,
  setChooseTrack,
  currentSongPlayingId,
  floatingPlayerPlay,
  setFloatingPlayerPlay,
  setCurrentSongPlayingId,
  setPlayButtonPressedCount,
  playButtonPressedCount,
  addTracksToMyPlaylist,
  removeTracksFromMyPlaylist,
  createPlaylist,
  albumTracks,
  isLoading,
}) => {
  const [open, setOpen] = useState(false);
  const [selectTracksOpen, setSelectTracksOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [displayImage, setDisplayImage] = useState(null);
  const [base64Uri, setBase64Uri] = useState(null);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSelectTracksClose = () => setSelectTracksOpen(false);

  const artistLi = useRef();

  const scroll = (scrollOffset) => {
    artistLi.current.scrollLeft += scrollOffset;
  };

  console.log(myPlaylistTitle);

  const onImageSelect = (e) => {
    if (e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        console.log("Reader result", reader.result);
        setBase64Uri(reader.result);
      };
      reader.readAsDataURL(file);
      console.log(reader);
      setDisplayImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const Search = styled("div")(({ theme }) => ({
    position: "relative",
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    width: "auto",
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

  console.log(myPlaylist);
  console.log(albumTracks);

  return albumTracks !== null ? (
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
          MY PLAYLISTS ({myPlaylist.length})
        </p>

        <div style={{ display: "flex", alignItems: "center" }}>
          <IconButton onClick={() => scroll(-360)}>
            <ArrowLeftIcon />
          </IconButton>
          <IconButton onClick={() => scroll(360)}>
            <ArrowRightIcon />
          </IconButton>
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center" }}>
        <ul
          role="list"
          ref={artistLi}
          className="sidebar"
          style={{
            display: "flex",
            justifyContent: "space-between",
            overflowX: "scroll",
            transition: "0.3s",
            alignItems: "center",
          }}
        >
          <Tooltip placement="top" title="Create a Playlist">
            <li
              style={{ marginRight: 10, alignItems: "center" }}
              className="py-1 flex-shrink-0 w-30 rounded-md overflow-hidden "
            >
              <div
                onClick={handleOpen}
                style={{
                  cursor: "pointer",
                  padding: 6,
                  borderRadius: 20,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                className="ml-1 mr-1 flex-shrink-0 w-24 h-24 border border-gray-200 rounded-md overflow-hidden cardHover"
              >
                <AddIcon fontSize="large" color="primary" />
              </div>
            </li>
          </Tooltip>
          {myPlaylist?.map((playlist) => (
            <li
              key={playlist.id}
              onClick={() => selectMyPlaylist(playlist)}
              style={
                myPlaylistTitle.id === playlist.id
                  ? {
                      marginRight: 10,
                      cursor: "pointer",
                      alignItems: "center",
                      backgroundColor: "rgb(240, 240, 240)",
                    }
                  : { marginRight: 10, cursor: "pointer", alignItems: "center" }
              }
              className="py-1 flex-shrink-0 w-30 rounded-md overflow-hidden cardHover "
            >
              <div
                style={{
                  padding: 6,
                  borderRadius: 20,
                  display: "flex",
                  justifyContent: "center",
                }}
                className="ml-1 mr-1 mb-2 flex-shrink-0 w-32 h-32 border border-gray-200 rounded-md overflow-hidden cardHover"
              >
                {playlist.images[0] !== undefined ? (
                  <img
                    src={playlist.images[0].url}
                    className="w-full h-full object-center object-cover"
                    style={{
                      borderRadius: 16,
                    }}
                  />
                ) : (
                  <img
                    src={noImage}
                    // alt={playlist.id ? playlist.images[0].url : noImage}
                    className="w-full h-full object-center object-cover"
                    style={{ borderRadius: 100 }}
                  />
                )}
              </div>

              <div className="ml-2 flex-1 flex flex-col mr-2">
                <div>
                  <div
                    className="flex justify-between text-gray-900"
                    style={{
                      fontSize: 13.6,
                      justifyContent: "center",
                      textTransform: "uppercase",
                      letterSpacing: 1,
                      marginBottom: 10,
                    }}
                  >
                    <p>{truncate(playlist.name)}</p>
                    {/* <p style={{ fontSize: 13 }}>{artist.popularity}</p> */}
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
      {console.log(myPlaylistTitle)}

      {myPlaylist.length > 0 ? (
        !isLoading ? (
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
              className="mb-4 mt-4"
            >
              <div className="text-gray-500 text-sm ">
                <span
                  style={{
                    textTransform: "uppercase",
                    fontSize: 13.6,
                    letterSpacing: 1,
                    color: "black",
                  }}
                >
                  {myPlaylistTitle.name}
                </span>{" "}
                {myPlaylist.tracks && myPlaylistTitle.tracks.total > 0 ? (
                  <span>
                    ({myPlaylistTitle.tracks.total}{" "}
                    {myPlaylistTitle.tracks.total > 1 ? "tracks" : "track"})
                  </span>
                ) : null}
              </div>
              {console.log(myPlaylist)}

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

            <div className="flex flex-col mt-4 mb-2">
              <div>
                <div>
                  <div className=" align-middle ">
                    <div>
                      <ul role="list">
                        {/* {console.log(albumTracks)} */}
                        {albumTracks.items && albumTracks.items.length === 0 ? (
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "center",
                              fontSize: 14,
                              margin: "80px 0",
                            }}
                          >
                            No Tracks in this Playlist
                          </div>
                        ) : (
                          <div>
                            {albumTracks.items?.map((audio) => (
                              <div
                                style={{
                                  display: "block",
                                  margin: "0 auto",
                                  width: "100%",
                                }}
                                key={audio.track.id}
                              >
                                <li
                                  style={{ alignItems: "center" }}
                                  className="py-1 flex border border-gray-200 rounded-md overflow-hidden"
                                >
                                  <div
                                    // onClick={() => selectAlbum(audio.track.track.id)}
                                    style={{ cursor: "pointer" }}
                                    className="ml-1 flex-shrink-0 w-16 h-16 border border-gray-200 rounded-md overflow-hidden"
                                  >
                                    {audio.track.album.images[0] !==
                                    undefined ? (
                                      <img
                                        src={audio.track.album.images[0].url}
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
                                          audio.track.id ===
                                          currentSongPlayingId
                                            ? "blue"
                                            : "gray"
                                        }-600`}
                                      >
                                        <Typography style={{ fontSize: 13 }}>
                                          {audio.track.name
                                            ? truncateMobile(audio.track.name)
                                            : "No name"}
                                        </Typography>
                                      </div>

                                      <div
                                        className={`mt-1 mb-1 flex items-center  text-${
                                          audio.track.id ===
                                          currentSongPlayingId
                                            ? "blue"
                                            : "gray"
                                        }-400`}
                                      >
                                        {audio.track.artists.length < 2 ? (
                                          <span
                                            style={{ fontSize: 12 }}
                                            color={
                                              audio.track.id ===
                                              currentSongPlayingId
                                                ? "blue"
                                                : ""
                                            }
                                          >
                                            {audio.track.artists[0].name
                                              ? audio.track.artists[0].name
                                              : "No artist name"}
                                          </span>
                                        ) : (
                                          <>
                                            <span style={{ fontSize: 12 }}>
                                              {audio.track.artists
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
                                          display: "flex",
                                          position: "relative",
                                          justifyContent: "space-between",
                                        }}
                                        className={`text-${
                                          audio.track.id ===
                                          currentSongPlayingId
                                            ? "blue"
                                            : "gray"
                                        }-700`}
                                      >
                                        {msToTime(audio.track.duration_ms)}
                                        {audio.track.id ===
                                        currentSongPlayingId ? (
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
                                        {audio.track.id ===
                                        currentSongPlayingId ? (
                                          floatingPlayerPlay ? (
                                            <Tooltip
                                              placement="top"
                                              title="Pause"
                                            >
                                              <IconButton
                                                size="small"
                                                style={{
                                                  backgroundColor:
                                                    "rgb(240, 240, 240)",
                                                }}
                                                color={
                                                  audio.track.id ===
                                                  currentSongPlayingId
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
                                            <Tooltip
                                              placement="top"
                                              title="Play"
                                            >
                                              <IconButton
                                                size="small"
                                                style={{
                                                  backgroundColor:
                                                    "rgb(240, 240, 240)",
                                                }}
                                                color={
                                                  audio.track.id ===
                                                  currentSongPlayingId
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
                                                audio.track.id ===
                                                currentSongPlayingId
                                                  ? "primary"
                                                  : "inherit"
                                              }
                                              onClick={() => {
                                                setChooseTrack(audio.track);
                                                setCurrentSongPlayingId(
                                                  audio.track.id
                                                );
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
                                          removeTracksFromMyPlaylist(
                                            myPlaylistTitle.id,
                                            audio.track.uri
                                          )
                                        }
                                      >
                                        <Tooltip placement="top" title="Remove">
                                          <RemoveCircleOutlineIcon
                                            color={
                                              audio.track.id ===
                                              currentSongPlayingId
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
                          </div>
                        )}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: 140,
              marginBottom: 140,
            }}
          >
            <CircularProgress size={28} />
          </div>
        )
      ) : (
        <div>
          <div>
            <ul>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  fontSize: 14,
                  margin: "80px 0",
                }}
              >
                You have no Playlists
              </div>
            </ul>
          </div>
        </div>
      )}

      <Modal
        open={open}
        onClose={handleClose}
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
                fontSize: 16,
                letterSpacing: 2,
                textTransform: "uppercase",
              }}
            >
              Create new Playlist
            </div>
            <IconButton onClick={handleClose} size="small">
              <ClearIcon fontSize="small" />
            </IconButton>
          </div>
          {/* <div
            style={{
              marginTop: 10,
              borderRadius: 4,
              border: "1px solid rgb(180, 180, 180)",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <AddPhotoAlternateOutlinedIcon
              color="disabled"
              style={{ height: 160, width: 160 }}
            />
          </div> */}
          <div
            style={{
              marginBottom: 20,
              marginTop: 20,
              display: "flex",
              justifyContent: "center",
              borderRadius: 6,
              border: "1.2px solid rgb(200, 200, 200)",
            }}
          >
            <label
              htmlFor="myImage"
              className="fileInput"
              style={{ cursor: "pointer" }}
            >
              <img
                className="product-image"
                src={displayImage ? displayImage : noImage}
                alt=""
                style={{ height: 160 }}
              />
            </label>
            <input
              style={{ display: "none" }}
              type="file"
              id="myImage"
              name="myImage"
              onChange={onImageSelect}
            />
          </div>

          <div style={{ marginTop: 20 }}>
            <Typography id="modal-modal-title" variant="body2" component="h2">
              Title
            </Typography>
            <input
              className=" focus:border-light-gray-500 focus:ring-1 focus:ring-light-blue-500 focus:outline-none w-full text-sm text-black placeholder-gray-500 border border-gray-200 rounded-md py-2 pl-3"
              type="text"
              style={{
                borderColor: "rgb(180, 180, 180)",
                borderWidth: 1,
                marginTop: 10,
              }}
              aria-label="Search for songs..."
              placeholder="Title"
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div style={{ marginTop: 20 }}>
            <Typography id="modal-modal-title" variant="body2" component="h2">
              Description
            </Typography>
            <textarea
              className=" focus:border-light-gray-500 focus:ring-1 focus:ring-light-blue-500 focus:outline-none w-full text-sm text-black placeholder-gray-500 border border-gray-200 rounded-md py-2 pl-3"
              type="text"
              style={{
                borderColor: "rgb(180, 180, 180)",
                borderWidth: 1,
                marginTop: 10,
              }}
              aria-label="Search for songs..."
              placeholder="Description"
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div
            style={{ marginTop: 10, display: "flex", justifyContent: "center" }}
          >
            <button
              class="w-1/2 pt-2 pb-2  rounded-md bg-black text-white"
              type="submit"
              disabled={title === "" ? true : false}
              onClick={() => {
                createPlaylist(title, description, base64Uri);
                handleClose();
              }}
            >
              Create
            </button>
          </div>
        </Box>
      </Modal>
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

          <div style={{ position: "relative", marginTop: 20 }}>
            <SearchIconWrapper>
              <SearchIcon color="primary" />
            </SearchIconWrapper>
            <input
              className="focus:border-light-blue-500 focus:ring-1 focus:ring-light-blue-500 focus:outline-none text-black placeholder-gray-500 border border-gray-200 rounded-md py-2 pl-12"
              type="text"
              placeholder="Search for tracks to add.."
              style={{ width: "100%", fontSize: 15 }}
              value={createPlaylistSearchTerm}
              onChange={(e) => {
                setCreatePlaylistSearchTerm(e.target.value);
              }}
            />
            {createPlaylistSearchTerm ? (
              <span style={{ position: "absolute", right: 4, top: 4 }}>
                <IconButton
                  onClick={() => setCreatePlaylistSearchTerm("")}
                  size="small"
                >
                  <ClearIcon fontSize="small" />
                </IconButton>
              </span>
            ) : null}
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
                                    onClick={() =>
                                      addTracksToMyPlaylist(
                                        myPlaylistTitle.id,
                                        myPlaylistTitle,
                                        audio.uri,
                                        audio.id
                                      )
                                    }
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
  ) : null;
};

export default MyPlaylist;
