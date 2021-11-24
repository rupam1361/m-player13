import { Hidden, IconButton, Paper, Tooltip } from "@mui/material";
import { experimentalStyled as styled } from "@mui/material/styles";

import {
  Grid,
  Container,
  Card,
  Box,
  Button,
  CardContent,
  Typography,
  CardMedia,
  CardActions,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import PauseIcon from "@mui/icons-material/Pause";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const truncate = (str) => {
  return str.length > 20 ? str.substr(0, 15) + "..." : str;
};

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

const RecentlyPlayed = ({
  recentlyPlayedSongs,
  filteredRecentlyPlayedSongs,
  noImage,
  floatingPlayerPlay,
  setFloatingPlayerPlay,
  currentSongPlayingId,
  setCurrentSongPlayingId,
  setChooseTrack,
  setPlayButtonPressedCount,
  playButtonPressedCount,
  recentSongsWidth,
}) => {
  const theme = useTheme();
  return (
    <div>
      <div style={{ position: "fixed", right: 20 }}>
        <div style={{ margin: 12, marginTop: 60, marginBottom: 10 }}>
          <p
            className="text-gray-900"
            style={{
              fontSize: 13,
              letterSpacing: 2,
            }}
          >
            RECENTLY PLAYED ({recentlyPlayedSongs.length})
          </p>
        </div>
        <div>
          <div className=" align-middle">
            <ul role="list" style={{ width: recentSongsWidth }}>
              {recentlyPlayedSongs &&
                filteredRecentlyPlayedSongs?.map((audio) => (
                  <div className="w-full " key={audio.track.id}>
                    <li className="py-3 flex  rounded-md overflow-hidden">
                      <div className="ml-3">
                        {audio.track.id === currentSongPlayingId ? (
                          floatingPlayerPlay ? (
                            <Tooltip placement="top" title="Pause">
                              <IconButton
                                size="small"
                                style={{
                                  backgroundColor: "rgb(240, 240, 240)",
                                }}
                                color={
                                  audio.track.id === currentSongPlayingId
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
                                  audio.track.id === currentSongPlayingId
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
                                audio.track.id === currentSongPlayingId
                                  ? "primary"
                                  : "inherit"
                              }
                              onClick={() => {
                                setChooseTrack(audio.track);
                                setCurrentSongPlayingId(audio.track.id);
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
                        className="ml-3 flex-1 flex flex-col mr-2"
                        style={{ position: "relative" }}
                      >
                        <div>
                          <div
                            className={`flex justify-between text-${
                              audio.track.id === currentSongPlayingId
                                ? "blue"
                                : "gray"
                            }-900`}
                            style={{
                              fontSize: 13.6,
                              textTransform: "capitalize",
                            }}
                          >
                            <p>
                              {audio.track.name
                                ? truncateMobile(audio.track.name)
                                : "No name"}
                            </p>
                          </div>

                          <div
                            className={`flex items-center text-sm text-${
                              audio.track.id === currentSongPlayingId
                                ? "blue"
                                : "gray"
                            }-400`}
                          >
                            <span style={{ fontSize: 13 }}>
                              {audio.track.artists.length < 2 ? (
                                <span style={{ fontSize: 12 }}>
                                  {audio.track.artists[0].name
                                    ? audio.track.artists[0].name
                                    : "No artist name"}
                                </span>
                              ) : (
                                <>
                                  {audio.track.artists
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
                                </>
                              )}
                            </span>
                          </div>

                          {/* <div
                            className="text-sm text-gray-900"
                            style={{
                              fontSize: 12,
                              display: "flex",
                              position: "relative",
                              marginTop: 6,
                              justifyContent: "space-between",
                            }}
                          >
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
                          </div> */}
                        </div>

                        <div
                          style={{
                            position: "absolute",
                            right: 6,
                            fontSize: 12.6,
                            top: 18,
                          }}
                          className={`text-${
                            audio.track.id === currentSongPlayingId
                              ? "blue"
                              : "gray"
                          }-900`}
                        >
                          {msToTime(audio.track.duration_ms)}
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
  );
};

export default RecentlyPlayed;
