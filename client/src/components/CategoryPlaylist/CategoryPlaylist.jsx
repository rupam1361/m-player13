import React, { useEffect, useRef } from "react";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { IconButton, CircularProgress } from "@mui/material";

import AlbumTracks from "../AlbumTitle/AlbumTracks/AlbumTracks";

const truncate = (str) => {
  return str.length > 20 ? str.substr(0, 18) + "..." : str;
};

const CategoryPlaylist = ({
  categorySublist,
  album,
  selectCategoryPlaylist,
  categorySublistTitle,
  setChooseTrack,
  albumTracks,
  chooseTrack,
  currentSongPlayingId,
  floatingPlayerPlay,
  setFloatingPlayerPlay,
  setCurrentSongPlayingId,
  setPlayButtonPressedCount,
  isLoading,
  playButtonPressedCount,
}) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const categoryListLi = useRef();
  console.log(album);

  const scroll = (scrollOffset) => {
    categoryListLi.current.scrollLeft += scrollOffset;
  };

  return categorySublist ? (
    <>
      {categorySublist.length > 0 && categorySublistTitle.id ? (
        <div>
          <div
            style={{
              marginTop: 30,
              marginBottom: 16,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <p
              className="text-gray-500"
              style={{
                fontSize: 14,
                textTransform: "uppercase",
                letterSpacing: 2,
              }}
            >
              {categorySublistTitle.name}
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
            className="sidebar"
            style={{
              display: "flex",
              justifyContent: "space-between",
              overflowX: "scroll",
            }}
            ref={categoryListLi}
          >
            {categorySublist?.map((playlist) => (
              <div key={playlist.id}>
                <div
                  variant="outlined"
                  style={
                    album.id === playlist.id
                      ? {
                          cursor: "pointer",
                          position: "relative",
                          marginRight: 20,
                          borderRadius: 6,
                          backgroundColor: "rgb(230, 230, 230)",
                        }
                      : {
                          cursor: "pointer",
                          position: "relative",
                          borderRadius: 6,
                          marginRight: 20,
                        }
                  }
                  className="cardHover"
                  onClick={() => selectCategoryPlaylist(playlist)}
                >
                  <li
                    key={playlist.id}
                    style={{
                      marginRight: 0,
                      alignItems: "center",
                      listStyleType: "none",
                      padding: 10,
                    }}
                    className="py-1 flex-shrink-0 w-30  rounded-md overflow-hidden border border-gray-200"
                  >
                    <div className="ml-1 mr-1 mb-2 flex-shrink-0 w-36 h-36  rounded-md overflow-hidden">
                      <img
                        src={playlist.images[0].url}
                        // alt={album.id ? album.images[0].url : noImage}
                        className="w-full h-full object-center object-cover"
                      />

                      {/* <p
                        style={{ position: "absolute", right: 16, bottom: 70 }}
                      >
                        {song.track.popularity}
                      </p> */}
                    </div>

                    <div className="ml-1 flex-1 flex flex-col mr-2">
                      <div>
                        <div
                          className="flex justify-between text-gray-900"
                          style={{
                            fontSize: 13.5,
                            alignItems: "center",
                            textTransform: "capitalize",
                          }}
                        >
                          <p>{`${truncate(playlist.name)}`}</p>
                        </div>

                        <div
                          style={{ fontSize: 12.6 }}
                          className="mt-1 flex items-center text-gray-400"
                        >
                          <div
                            style={{
                              textTransform: "capitalize",
                              fontSize: 12.6,
                            }}
                          >
                            {playlist.type}
                          </div>
                          <div
                            class="text-base font-normal mx-1"
                            style={{ fontSize: 40 }}
                          >
                            ·
                          </div>

                          <span>
                            {playlist.tracks.total}{" "}
                            {playlist.tracks.total > 1 ? "tracks" : "track"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </li>
                </div>
              </div>
            ))}
          </ul>

          <div className="mt-6">
            {!isLoading ? (
              <div>
                {album.id ? (
                  <div className="text-gray-500 text-sm mb-4">
                    <span
                      style={{
                        textTransform: "uppercase",
                        fontSize: 13.6,
                        letterSpacing: 1,
                        color: "black",
                      }}
                    >
                      {album.name}
                    </span>{" "}
                    ({album.tracks.total} tracks)
                  </div>
                ) : null}
                <AlbumTracks
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
            ) : (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: 70,
                  marginBottom: 100,
                }}
              >
                <CircularProgress size={28} />
              </div>
            )}
          </div>
        </div>
      ) : null}
    </>
  ) : null;
};

export default CategoryPlaylist;
