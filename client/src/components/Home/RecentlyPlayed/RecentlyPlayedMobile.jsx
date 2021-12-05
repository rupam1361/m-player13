import { useRef } from "react";
import { IconButton, Divider, Tooltip } from "@mui/material";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";

import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";

const truncate = (str) => {
  return str.length > 20 ? str.substr(0, 15) + "..." : str;
};

const RecentlyPlayedMobile = ({
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
}) => {
  const recentlyPlayedLi = useRef();

  const scroll = (scrollOffset) => {
    recentlyPlayedLi.current.scrollLeft += scrollOffset;
  };

  return (
    <div style={{ marginTop: "5%" }}>
      <Divider />
      <div style={{ marginTop: "5%" }}>
        <div
          style={{
            margin: 12,
            marginBottom: 20,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <p
            className="text-gray-900"
            style={{
              fontSize: 13,
              letterSpacing: 2,
            }}
          >
            RECENTLY PLAYED ({recentlyPlayedSongs.slice(0, 20).length})
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
        <ul
          style={{
            display: "flex",
            overflowX: "scroll",
            width: "100%",
            scrollBehavior: "smooth",
          }}
          ref={recentlyPlayedLi}
          className="sidebar"
        >
          {recentlyPlayedSongs &&
            filteredRecentlyPlayedSongs.slice(0, 20)?.map((song, index) => (
              <div key={index}>
                <div
                  variant="outlined"
                  style={{
                    cursor: "pointer",
                    position: "relative",
                    marginRight: 10,
                  }}
                >
                  <li
                    key={song.track.id}
                    style={{
                      marginRight: 10,
                      padding: 10,
                      alignItems: "center",
                      listStyleType: "none",
                    }}
                    className="py-1 rounded-md overflow-hidden border border-gray-200 cardHover"
                  >
                    <div
                      // style={{ padding: 6 }}
                      className="ml-1 mr-1 mb-2 w-36 h-36 rounded-md overflow-hidden "
                    >
                      {song.track.album.images[0] !== undefined ? (
                        <img
                          src={song.track.album.images[0].url}
                          // alt={album.id ? album.images[0].url : noImage}
                          className="w-full h-full object-center object-cover"
                        />
                      ) : (
                        <img
                          src={noImage}
                          alt={
                            song.track.album.id
                              ? song.track.album.images[0].url
                              : noImage
                          }
                          className="w-full h-full object-center object-cover"
                        />
                      )}

                      {floatingPlayerPlay &&
                      song.track.id === currentSongPlayingId ? (
                        <div
                          style={{
                            position: "absolute",
                            bottom: 1,
                            left: 9,
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
                              bottom: 2,
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
                          bottom: 6,
                          right: 20,
                        }}
                      >
                        {song.track.id === currentSongPlayingId ? (
                          floatingPlayerPlay ? (
                            <Tooltip placement="top" title="Pause">
                              <IconButton
                                size="small"
                                style={{
                                  backgroundColor: "rgb(240, 240, 240)",
                                }}
                                color={
                                  song.track.id === currentSongPlayingId
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
                                  song.track.id === currentSongPlayingId
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
                                song.track.id === currentSongPlayingId
                                  ? "primary"
                                  : "inherit"
                              }
                              onClick={() => {
                                setChooseTrack(song.track);
                                setCurrentSongPlayingId(song.track.id);
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
                      {/* <p
                        style={{
                          position: "absolute",
                          right: 16,
                          bottom: 70,
                        }}
                      >
                        {song.track.popularity}
                      </p> */}
                    </div>

                    <div className="ml-1 flex-1 flex flex-col mr-2">
                      <div>
                        <div
                          className={`flex justify-between text-${
                            song.track.id === currentSongPlayingId
                              ? "blue"
                              : "gray"
                          }-900`}
                          style={{ fontSize: 13.5, alignItems: "center" }}
                        >
                          <p>{`${truncate(song.track.name)}`}</p>
                        </div>

                        <div class="mt-1 mb-3 flex items-center text-sm text-gray-500">
                          <p
                            className={`flex items-center text-sm text-${
                              song.track.id === currentSongPlayingId
                                ? "blue"
                                : "gray"
                            }-400`}
                            style={{ fontSize: 13.4 }}
                          >
                            {song.track.artists[0].name}
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
                            {song.track.album.album_type}
                          </div>
                          <div
                            class="text-base font-normal mx-1"
                            style={{ fontSize: 40 }}
                          >
                            ·
                          </div>

                          <span>
                            {song.track.album.total_tracks}{" "}
                            {song.track.album.total_tracks > 1
                              ? "tracks"
                              : "track"}
                          </span>
                        </div> */}
                      </div>
                    </div>
                  </li>
                </div>
              </div>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default RecentlyPlayedMobile;
