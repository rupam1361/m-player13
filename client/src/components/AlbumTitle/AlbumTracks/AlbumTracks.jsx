import React, { useEffect } from "react";
import {
  CircularProgress,
  IconButton,
  Typography,
  Tooltip,
} from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";

import noImage from "../../../assets/no-image1.jpg";

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

const AlbumTracks = ({
  albumTracks,
  setChooseTrack,
  currentSongPlayingId,
  floatingPlayerPlay,
  setFloatingPlayerPlay,
  setCurrentSongPlayingId,
  setPlayButtonPressedCount,
  playButtonPressedCount,
}) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  console.log(floatingPlayerPlay);

  return albumTracks ? (
    <div>
      {albumTracks.length !== 0 ? (
        albumTracks.items ? (
          <div className="flex flex-col mt-2 mb-2">
            <div>
              <div className={albumTracks.length > 5 ? "songsBox" : null}>
                <div className=" align-middle ">
                  <div>
                    <ul
                      role="list"
                      className={albumTracks ? "sidebarMobile" : null}
                    >
                      {/* {console.log(albumTracks)} */}
                      {albumTracks.items?.map((audio) =>
                        audio.track !== null ? (
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
                                {audio.track.album.images[0] !== undefined ? (
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
                                      audio.track.id === currentSongPlayingId
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
                                      {audio.track.name
                                        ? truncateMobile(audio.track.name)
                                        : "No name"}
                                    </Typography>
                                  </div>
                                  <div
                                    className={`mt-1 mb-1 flex items-center  text-${
                                      audio.track.id === currentSongPlayingId
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
                                    className={`text-${
                                      audio.track.id === currentSongPlayingId
                                        ? "blue"
                                        : "gray"
                                    }-700`}
                                    style={{
                                      fontSize: 12,
                                      display: "flex",
                                      position: "relative",
                                      justifyContent: "space-between",
                                    }}
                                  >
                                    {msToTime(audio.track.duration_ms)}

                                    {audio.track.id === currentSongPlayingId ? (
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
                                  }}
                                >
                                  {audio.track.id === currentSongPlayingId ? (
                                    floatingPlayerPlay ? (
                                      <Tooltip placement="top" title="Pause">
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
                              </div>
                            </li>
                          </div>
                        ) : null
                      )}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col mt-2 mb-2">
            <div>
              <div className={albumTracks.length > 5 ? "songsBox" : null}>
                <div className=" align-middle ">
                  <div>
                    <ul
                      role="list"
                      className={albumTracks ? "sidebarMobile" : null}
                    >
                      {/* {console.log(albumTracks)} */}
                      {albumTracks?.map((audio) => (
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
                                <div style={{ position: "relative" }}>
                                  <div
                                    style={{
                                      fontSize: 12,
                                    }}
                                    className={`text-${
                                      audio.id === currentSongPlayingId
                                        ? "blue"
                                        : "gray"
                                    }-700`}
                                  >
                                    {msToTime(audio.duration_ms)}
                                  </div>
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
                                }}
                              >
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
        )
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
      )}
    </div>
  ) : null;
};

export default AlbumTracks;
