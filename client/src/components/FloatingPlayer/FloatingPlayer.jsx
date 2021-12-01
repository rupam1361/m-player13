import React, { useEffect, useState } from "react";
import SpotifyPlayer from "react-spotify-web-playback";
import { Hidden, IconButton } from "@mui/material";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import SkipNextIcon from "@mui/icons-material/SkipNext";

function msToTime(duration) {
  let seconds = Math.floor((duration / 1000) % 60),
    minutes = Math.floor((duration / (1000 * 60)) % 60);

  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;

  return minutes + ":" + seconds;
}

const FloatingPlayer = ({
  accessToken,
  searchTerm,
  searchData,
  floatingPlayerPlay,
  setFloatingPlayerPlay,
  chooseTrack,
  setChooseTrack,
  currentSongPlayingId,
  setCurrentSongPlayingId,
  setPlayerDetails,
  pauseSong,
  playButtonPressedCount,
  setPlayButtonPressedCount,
  albumTracks,
}) => {
  if (!accessToken) return null;
  console.log(albumTracks);

  let obj =
    albumTracks.items && albumTracks.items.length >= 0
      ? albumTracks.items.findIndex((item) => item.track.id === chooseTrack.id)
      : albumTracks &&
        albumTracks.findIndex((item) => item.id === chooseTrack.id);

  console.log(obj);

  const disableNextButton =
    albumTracks.items && albumTracks.items.length > 0
      ? albumTracks.items.length > 0 &&
        albumTracks.items.some(
          (track) => track.track.id === currentSongPlayingId
        )
      : albumTracks.length > 0 &&
        albumTracks.some((track) => track.id === currentSongPlayingId);

  console.log(disableNextButton);

  const next = () => {
    if (playButtonPressedCount !== 1) {
      obj += 1;
    }
    console.log(albumTracks, obj);
    setPlayButtonPressedCount((playButtonPressedCount += 1));
    if (albumTracks !== null && albumTracks.length > 0) {
      setChooseTrack(albumTracks[obj]);
      setCurrentSongPlayingId(albumTracks[obj].id);
    } else {
      setChooseTrack(albumTracks.items[obj].track);
      setCurrentSongPlayingId(albumTracks.items[obj].track.id);
    }

    console.log(obj);
  };

  const prev = () => {
    obj -= 1;
    if (albumTracks.length > 0) {
      setChooseTrack(albumTracks[obj]);
      setCurrentSongPlayingId(albumTracks[obj].id);
    } else {
      setChooseTrack(albumTracks.items[obj].track);
      setCurrentSongPlayingId(albumTracks.items[obj].track.id);
    }

    console.log(obj);
  };

  return (
    <>
      <div
        className="floatingPlayer bg-white shadow overflow-hidden sm:rounded-lg "
        style={{
          marginTop: 12,
          borderColor: "black",
          borderRadius: 6,
          paddingBottom: 10,
        }}
      >
        <div className="text-gray-500 dark:text-gray-600 flex justify-between text-sm font-medium tabular-nums">
          <div style={{ fontSize: 13 }}>00:00</div>
          <div style={{ fontSize: 13 }}>
            {msToTime(chooseTrack.duration_ms)}
          </div>
        </div>
        <audio id="audio"></audio>
        <div className="flex " style={{ position: "relative" }}>
          <SpotifyPlayer
            className="relative"
            id="spotifyPlayer"
            name="Spotify Web Player"
            token={accessToken}
            // showSaveIcon={true}
            callback={(state) => {
              ontimeupdate = () => console.log("lol");
              console.log(state);

              if (!state.isPlaying) {
                setFloatingPlayerPlay(false);
                setCurrentSongPlayingId(chooseTrack.id);
                setPlayerDetails(state);
                if (searchTerm !== "") {
                  pauseSong();
                } else if (
                  albumTracks.items?.length > 0
                    ? albumTracks.items?.length > 0 &&
                      obj === albumTracks.items.length - 1
                    : albumTracks.length > 0 && obj === albumTracks.length - 1
                ) {
                  pauseSong();
                } else {
                  if (
                    albumTracks.items?.length > 0
                      ? state.progressMs === 0 &&
                        albumTracks.items.length > 0 &&
                        albumTracks.items.find(
                          (track) => track.track.id === currentSongPlayingId
                        )
                      : state.progressMs === 0 &&
                        albumTracks.length > 0 &&
                        albumTracks.find(
                          (track) => track.id === currentSongPlayingId
                        )
                  ) {
                    next();
                    setFloatingPlayerPlay(true);
                  }
                }
              } else {
                setFloatingPlayerPlay(true);
                setCurrentSongPlayingId(chooseTrack.id);
                setPlayerDetails(state);
              }
            }}
            styles={{
              sliderColor: "rgb(160, 160, 160)",
              sliderTrackBorderRadius: 25,
              // sliderHandleColor: "#005168",
              color: "rgb(80, 80, 80)",
              fontSize: 13,
            }}
            autoPlay={true}
            play={floatingPlayerPlay}
            uris={chooseTrack.uri ? [chooseTrack.uri] : []}
          />
          {chooseTrack ? (
            <div
            // style={{
            //   position: "absolute",
            //   bottom: 6,
            //   left: "50%",
            //   marginLeft: -80,
            // }}
            >
              <div
              // style={{
              //   display: "flex",
              //   width: 160,
              //   justifyContent: "space-between",
              // }}
              >
                <IconButton
                  style={{
                    position: "absolute",
                    bottom: 6,
                    left: "50%",
                    marginLeft: -90,
                  }}
                  disabled={obj <= 0 || searchData.length > 0 ? true : false}
                  onClick={prev}
                  color="inherit"
                >
                  <SkipPreviousIcon />
                </IconButton>
                {albumTracks.length > 0 ? (
                  <IconButton
                    style={{
                      position: "absolute",
                      bottom: 6,
                      left: "50%",
                      marginLeft: 50,
                    }}
                    color="inherit"
                    disabled={
                      obj >= albumTracks.length - 1 ||
                      disableNextButton === false
                        ? true
                        : false
                    }
                    onClick={next}
                  >
                    <SkipNextIcon />
                  </IconButton>
                ) : (
                  <IconButton
                    style={{
                      position: "absolute",
                      bottom: 6,
                      left: "50%",
                      marginLeft: 50,
                    }}
                    color="inherit"
                    disabled={
                      (albumTracks.items &&
                        obj >= albumTracks.items.length - 1) ||
                      disableNextButton === false
                        ? true
                        : false
                    }
                    onClick={next}
                  >
                    <SkipNextIcon />
                  </IconButton>
                )}
              </div>
            </div>
          ) : null}
        </div>
      </div>

      {/* <div
          className="floatingPlayer bg-white shadow overflow-hidden sm:rounded-lg mb-3"
          style={{
            borderColor: "black",
            borderRadius: 6,
            color: "rgb(210, 210, 210)",
          }}
        >
          <div className="text-gray-500 dark:text-gray-400 flex justify-between text-sm font-medium tabular-nums">
            <div style={{ fontSize: 13 }}>00:00</div>
            <div style={{ fontSize: 13 }}>
              {msToTime(chooseTrack.duration_ms)}
            </div>
          </div>
          <audio id="audio"></audio>
          <div className="flex justify-between">
            <SpotifyPlayer
              id="spotifyPlayer"
              name="Spotify Web Player"
              token={accessToken}
              callback={(state) => {
                console.log(state);
                setSongProgress(state.progressMs);

                if (!state.isPlaying) {
                  setFloatingPlayerPlay(false);
                  setCurrentSongPlayingId(chooseTrack.id);
                  setPlayerDetails(state);

                  if (searchData.items && obj === searchData.items.length - 1) {
                    pauseSong();
                  } else if (searchData && obj === searchData.length - 1) {
                    pauseSong();
                  } else if (
                    albumTracks.length > 0 &&
                    obj === albumTracks.length - 1
                  ) {
                    pauseSong();
                  } else {
                    if (state.progressMs === 0) {
                      next();
                      setFloatingPlayerPlay(true);
                    }
                  }
                } else {
                  setFloatingPlayerPlay(true);
                  setCurrentSongPlayingId(chooseTrack.id);
                  setPlayerDetails(state);
                }
              }}
              styles={{
                sliderColor: "#80e2fd",
                sliderTrackBorderRadius: 25,
                sliderHandleColor: "#005168",
                color: "rgb(80, 80, 80)",
                fontSize: 13,
              }}
              autoPlay={true}
              play={floatingPlayerPlay}
              uris={chooseTrack.uri ? [chooseTrack.uri] : []}
            />
            {chooseTrack ? (
              <div>
                <IconButton
                  style={{ position: "absolute", bottom: 22, left: 90 }}
                  disabled={obj <= 0 ? true : false}
                  onClick={prev}
                  color="default"
                >
                  <SkipPreviousIcon />
                </IconButton>
                {searchData.items ? (
                  <IconButton
                    color="default"
                    style={{ position: "absolute", bottom: 22, right: 90 }}
                    disabled={obj >= searchData.items.length - 1 ? true : false}
                    onClick={next}
                  >
                    <SkipNextIcon />
                  </IconButton>
                ) : albumTracks.length > 0 ? (
                  <IconButton
                    color="default"
                    style={{ position: "absolute", bottom: 22, right: 90 }}
                    disabled={obj >= albumTracks.length - 1 ? true : false}
                    onClick={next}
                  >
                    <SkipNextIcon />
                  </IconButton>
                ) : (
                  <IconButton
                    color="default"
                    style={{ position: "absolute", bottom: 22, right: 90 }}
                    disabled={obj >= searchData.length - 1 ? true : false}
                    onClick={next}
                  >
                    <SkipNextIcon />
                  </IconButton>
                )}
              </div>
            ) : null}
          </div>
        </div> */}
    </>
  );
};

export default FloatingPlayer;
