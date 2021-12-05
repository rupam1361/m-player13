import { Hidden, IconButton, Grid, Paper, Tooltip } from "@mui/material";
import { experimentalStyled as styled } from "@mui/material/styles";

import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import React from "react";

const truncate = (str) => {
  return str.length > 20 ? str.substr(0, 15) + "..." : str;
};

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const MyTopTracks = ({
  myTopTracks,
  noImage,
  floatingPlayerPlay,
  setFloatingPlayerPlay,
  currentSongPlayingId,
  setCurrentSongPlayingId,
  setChooseTrack,
  setPlayButtonPressedCount,
  playButtonPressedCount,
}) => {
  return (
    <div>
      <div style={{ margin: 12, marginTop: 30 }}>
        <p
          className="text-gray-900"
          style={{
            fontSize: 14,
            letterSpacing: 2,
          }}
        >
          MY TOP TRACKS ({myTopTracks.length})
        </p>
      </div>
      {/* {console.log(myTopTracks)} */}

      <Grid
        container
        spacing={2}
        // columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {myTopTracks?.map((track, index) => (
          <Grid item xs={12} sm={6} md={4} lg={4} xl={3} key={index}>
            <Item
              variant="outlined"
              style={{ cursor: "pointer", position: "relative" }}
              className="cardHover"
            >
              <li
                key={track.id}
                style={{
                  marginRight: 10,
                  alignItems: "center",
                  listStyleType: "none",
                }}
                className="py-1 flex-shrink-0 w-30  rounded-md overflow-hidden"
              >
                <div className="ml-1 mr-1 mb-2 flex-shrink-0   rounded-md overflow-hidden">
                  {track.album.images[0] !== undefined ? (
                    <img
                      src={track.album.images[0].url}
                      // alt={album.id ? album.images[0].url : noImage}
                      className="w-full h-full object-center object-cover"
                    />
                  ) : (
                    <img
                      src={noImage}
                      alt={track.album.id ? track.album.images[0].url : noImage}
                      className="w-full h-full object-center object-cover"
                    />
                  )}
                  {floatingPlayerPlay && track.id === currentSongPlayingId ? (
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

                  <div style={{ position: "absolute", bottom: 10, right: 10 }}>
                    {track.id === currentSongPlayingId ? (
                      floatingPlayerPlay ? (
                        <Tooltip placement="top" title="Pause">
                          <IconButton
                            size="small"
                            style={{
                              backgroundColor: "rgb(220, 220, 220)",
                            }}
                            color={
                              track.id === currentSongPlayingId
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
                              track.id === currentSongPlayingId
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
                            track.id === currentSongPlayingId
                              ? "primary"
                              : "inherit"
                          }
                          onClick={() => {
                            setChooseTrack(track);
                            setCurrentSongPlayingId(track.id);
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
                  <p
                    className={`flex justify-between text-${
                      track.id === currentSongPlayingId ? "blue" : "gray"
                    }-600`}
                    style={{
                      position: "absolute",
                      right: 16,
                      bottom: 52,
                      fontSize: 13,
                    }}
                  >
                    {track.popularity}
                  </p>
                </div>

                <div className="ml-1 mt-2 mb-2 flex-1 flex flex-col mr-2">
                  <div>
                    <div
                      className={`flex justify-between text-${
                        track.id === currentSongPlayingId ? "blue" : "gray"
                      }-600`}
                      style={{
                        fontSize: 13,
                        alignItems: "center",
                        textTransform: "capitalize",
                      }}
                    >
                      <p>{`${truncate(track.name)}`}</p>
                    </div>

                    <div class="mt-1 flex items-center text-sm text-gray-500">
                      <p
                        className={`text-sm text-${
                          track.id === currentSongPlayingId ? "blue" : "gray"
                        }-400`}
                        style={{ fontSize: 12 }}
                      >
                        {track.artists[0].name}
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
    </div>
  );
};

export default MyTopTracks;
