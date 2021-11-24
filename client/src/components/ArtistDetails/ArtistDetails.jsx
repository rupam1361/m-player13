import React, { useEffect } from "react";
import { Box, CircularProgress } from "@mui/material";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";

import AlbumTracks from "../AlbumTitle/AlbumTracks/AlbumTracks";
import RelatedArtists from "./RelatedArtists/RelatedArtists";

const truncate = (str) => {
  return str.length > 36 ? str.substr(0, 40) + "..." : str;
};

function intlFormat(num) {
  return new Intl.NumberFormat().format(Math.round(num * 10) / 10);
}

function formatFollowersCount(num) {
  if (num >= 1000000) return intlFormat(num / 1000000) + "M";
  if (num >= 1000) return intlFormat(num / 1000) + "k";
  return intlFormat(num);
}

const ArtistDetails = ({
  floatingPlayerPlay,
  artistDetails,
  getArtist,
  albumTracks,
  chooseTrack,
  setChooseTrack,
  currentSongPlayingId,
  setFloatingPlayerPlay,
  setCurrentSongPlayingId,
  isLoading,
  setPlayButtonPressedCount,
  playButtonPressedCount,
  relatedArtists,
  getArtistRelatedArtists,
}) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  console.log(albumTracks);

  return artistDetails.id ? (
    <>
      {!isLoading ? (
        <div>
          <div
            style={{
              paddingTop: "6%",
              paddingBottom: "2%",
              alignItems: "center",
            }}
          >
            <div>
              <div
                style={{
                  width: "100%",
                  justifyContent: "center",
                  position: "relative",
                }}
              >
                <img
                  style={{
                    padding: "0 22%",
                    width: { lg: 320, md: 0, sm: 0, xs: 0 },
                    height: { lg: 320, md: 0, sm: 0, xs: 0 },
                    borderRadius: "50%",
                  }}
                  src={
                    artistDetails.images ? artistDetails.images[0].url : null
                  }
                  alt=""
                />
                <Box
                  className="px-4 pt-4 mt-4 "
                  sx={{
                    background: "white",
                    borderColor: "rgb(220, 220, 220)",
                    borderWidth: 1,
                    bottom: 0,
                    right: 0,
                    left: 0,
                    color: "white",
                    paddingBottom: 2,
                    borderRadius: 2,
                  }}
                >
                  <div
                    style={{
                      fontSize: 24,
                      fontWeight: "bold",
                      textTransform: "",
                      letterSpacing: 2,
                      color: "grey",
                    }}
                  >
                    {artistDetails.name ? truncate(artistDetails.name) : null}
                  </div>
                  <div className="flex" style={{ margin: "8px 0" }}>
                    {artistDetails.genres?.map((genre, index) => (
                      <span
                        key={index}
                        className="flex items-center text-gray-400"
                      >
                        {index <= 2 ? (
                          <>
                            <span
                              style={{
                                textTransform: "capitalize",
                                fontSize: 12,
                              }}
                            >
                              {genre}
                            </span>

                            {index !== artistDetails.genres.length - 1 ? (
                              index === 2 ? null : (
                                <span
                                  class="text-base font-normal mx-1"
                                  style={{ fontSize: 30 }}
                                >
                                  ·
                                </span>
                              )
                            ) : null}
                          </>
                        ) : null}
                      </span>
                    ))}
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      color: "black",
                    }}
                  >
                    <div>
                      <PeopleAltIcon fontSize="small" />{" "}
                      <span style={{ fontSize: 13, marginLeft: 4 }}>
                        {formatFollowersCount(artistDetails.followers.total)}{" "}
                        followers
                      </span>
                    </div>
                    <div>
                      <ThumbUpAltIcon fontSize="small" />
                      <span style={{ fontSize: 13, marginLeft: 6 }}>
                        {artistDetails.popularity}
                      </span>
                    </div>
                  </div>
                </Box>
              </div>
            </div>
            <div className="mt-6">
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
          </div>
          <div style={{ marginTop: 20, flex: 1, width: "100%" }}>
            <RelatedArtists
              relatedArtists={relatedArtists}
              getArtist={getArtist}
              getArtistRelatedArtists={getArtistRelatedArtists}
            />
          </div>
        </div>
      ) : (
        <div
          style={{
            textAlign: "center",
            marginTop: 140,
            marginBottom: 140,
          }}
        >
          <CircularProgress size={30} />
        </div>
      )}
    </>
  ) : null;
};

export default ArtistDetails;
