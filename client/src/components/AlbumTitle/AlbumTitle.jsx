import React, { useEffect } from "react";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import noImage from "../../assets/no-image1.jpg";

const truncate = (str) => {
  return str.length > 23 ? str.substr(0, 23) + "..." : str;
};

const AlbumTitle = ({ album, playlistTracks }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  console.log(album);

  return album ? (
    <>
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
            src={album.images ? album.images[0].url : noImage}
            alt=""
            className=""
          />

          <div
            className="px-4 pt-4 mt-4 "
            style={{
              background: "white",
              borderColor: "rgb(220, 220, 220)",
              borderWidth: 1,
              bottom: 0,
              right: 0,
              left: 0,
              color: "white",
              paddingBottom: 20,
              borderRadius: 6,
            }}
          >
            {album.label ? (
              <div>
                <div
                  style={{
                    fontSize: 24,
                    fontWeight: "bold",
                    textTransform: "capitalize",
                    letterSpacing: 1,
                    color: "grey",
                  }}
                >
                  {truncate(album.name)}
                </div>
              </div>
            ) : null}
            <div
              style={{
                color: "black",
                margin: "8px 0",
              }}
            >
              <div
                style={{ display: "flex", alignItems: "center" }}
                className="text-gray-400"
              >
                <span style={{ fontSize: 13 }}>{album.label}</span>
                {album.label ? (
                  <div
                    class="text-base font-normal mx-2"
                    style={{ fontSize: 40 }}
                  >
                    ·
                  </div>
                ) : null}
                {album.total_tracks ? (
                  album.total_tracks > 1 ? (
                    <div style={{ fontSize: 13 }}>
                      {album.total_tracks} tracks
                    </div>
                  ) : (
                    <div style={{ fontSize: 13 }}>
                      {" "}
                      {album.total_tracks} track
                    </div>
                  )
                ) : (
                  <div style={{ fontSize: 13 }}>{playlistTracks} tracks</div>
                )}
              </div>
            </div>
            <div
              style={{
                color: "black",
                display: "flex",
                fontSize: 13,
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div style={{ display: "flex", alignItems: "center" }}>
                {album.artists && album.artists.length < 4 ? (
                  <span>{album.artists[0].name}</span>
                ) : (
                  <>
                    {album.artists &&
                      album.artists
                        .filter((artist, index) => index < 3)
                        .map((artist, index) =>
                          index >= 2 ? (
                            <span key={artist.id}>and more...</span>
                          ) : (
                            <span
                              key={artist.id}
                              style={
                                index !== 1
                                  ? { marginLeft: 0 }
                                  : { marginLeft: 3 }
                              }
                            >
                              {artist.name}
                              {index !== 1 ? ", " : " "}
                            </span>
                          )
                        )}
                  </>
                )}
                {album.label ? (
                  <div
                    class="text-base font-normal mx-2"
                    style={{ fontSize: 40 }}
                  >
                    ·
                  </div>
                ) : null}
                {album.release_date ? (
                  <div style={{ fontSize: 13 }}>
                    {`${album.release_date.split("-")[2]}-${
                      album.release_date.split("-")[1]
                    }-${album.release_date.split("-")[0]}`}
                  </div>
                ) : null}
              </div>
              <span>
                {album.followers ? (
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <PeopleAltIcon fontSize="small" />
                    <span style={{ marginLeft: 6 }}>
                      {album.followers.total} followers
                    </span>
                  </div>
                ) : (
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <ThumbUpIcon fontSize="small" />
                    <span style={{ fontSize: 13, marginLeft: 6 }}>
                      {album.popularity}
                    </span>
                  </div>
                )}
              </span>
            </div>
            <span
              style={{
                fontSize: 13,
                fontStyle: "italic",
              }}
            >
              {album.description}
            </span>
          </div>
        </div>
      </div>
    </>
  ) : null;
};

export default AlbumTitle;
