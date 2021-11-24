import React, { useState } from "react";
import { Hidden } from "@mui/material";
import noImage from "../../assets/no-image1.jpg";

const truncate = (str) => {
  return str.length > 30 ? str.substr(0, 36) + "..." : str;
};

const Sidebar = ({
  currentSongArtistAlbums,
  selectAlbum,
  chooseTrack,
  setSearchData,
}) => {
  return (
    <>
      <Hidden xsDown mdDown>
        <div
          className="bg-white shadow overflow-hidden sm:rounded-lg mb-3"
          style={{ padding: 20, paddingRight: 0 }}
        >
          <div className="flow-root">
            <div style={{ marginBottom: 16 }}>
              <p style={{ fontSize: 14, color: "grey" }}>
                More albums from{" "}
                {currentSongArtistAlbums.items
                  ? currentSongArtistAlbums.items.length > 0
                    ? currentSongArtistAlbums.items[0].artists[0].name
                    : "Not Found"
                  : "Not found"}
              </p>
            </div>

            <ul
              role="list"
              className={currentSongArtistAlbums.items ? "sidebar" : null}
              style={
                chooseTrack
                  ? { height: 424, overflowY: "scroll" }
                  : { height: 513, overflowY: "scroll" }
              }
            >
              {currentSongArtistAlbums.items?.map((album) => (
                <li key={album.id} className="py-1 flex">
                  <div
                    onClick={() => {
                      selectAlbum(album.id);
                      setSearchData([]);
                    }}
                    style={{ cursor: "pointer" }}
                    className="flex-shrink-0 w-20 h-20 border border-gray-200 rounded-md overflow-hidden"
                  >
                    {album.images[0] !== undefined ? (
                      <img
                        src={album.images[0].url}
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

                  <div className="ml-4 flex-1 flex flex-col">
                    <div>
                      <div className="flex justify-between text-sm text-gray-900">
                        <p>{truncate(album.name)}</p>
                      </div>

                      <div class="mt-1 flex items-center text-sm text-gray-500">
                        <p
                          className="text-sm text-gray-500"
                          style={{ fontSize: 13 }}
                        >
                          {album.artists[0].name}
                        </p>
                      </div>

                      <div
                        style={{ fontSize: 13 }}
                        className="mt-1 flex items-center"
                      >
                        <div
                          style={{ textTransform: "capitalize", fontSize: 13 }}
                        >
                          {album.album_type}
                        </div>
                        <div
                          class="text-base font-normal mx-2"
                          style={{ fontSize: 40 }}
                        >
                          ·
                        </div>

                        <span>
                          {album.total_tracks}{" "}
                          {album.total_tracks > 1 ? "tracks" : "track"}
                        </span>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Hidden>
      <Hidden smUp>
        <div className="bg-white ">
          <div className="flow-root">
            <div style={{ margin: 12 }}>
              <p
                style={{
                  fontSize: 13.5,
                  color: "rgb(50, 50, 50)",
                  fontStyle: "italic",
                }}
              >
                More albums from{" "}
                {currentSongArtistAlbums.items
                  ? currentSongArtistAlbums.items.length > 0
                    ? currentSongArtistAlbums.items[0].artists[0].name
                    : "Not Found"
                  : "Not found"}
              </p>
            </div>

            <ul
              role="list"
              className={currentSongArtistAlbums.items ? "sidebarMobile" : null}
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginLeft: 12,
                overflowX: "scroll",
              }}
            >
              {currentSongArtistAlbums.items?.map((album) => (
                <li
                  key={album.id}
                  onClick={() => {
                    selectAlbum(album.id);
                    setSearchData([]);
                  }}
                  style={{ marginRight: 10, alignItems: "center" }}
                  className="py-1 flex flex-shrink-0 w-30  border border-gray-200 rounded-md overflow-hidden"
                >
                  <div
                    style={{ cursor: "pointer" }}
                    className="ml-1 flex-shrink-0 w-20 h-20 border border-gray-200 rounded-md overflow-hidden"
                  >
                    {album.images[0] !== undefined ? (
                      <img
                        src={album.images[0].url}
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

                  <div className="ml-3 flex-1 flex flex-col mr-2">
                    <div>
                      <div
                        className="flex justify-between text-gray-900"
                        style={{ fontSize: 13.2 }}
                      >
                        <p>{truncate(album.name)}</p>
                      </div>

                      <div class="mt-1 flex items-center text-sm text-gray-500">
                        <p
                          className="text-sm text-gray-500"
                          style={{ fontSize: 13 }}
                        >
                          {album.artists[0].name}
                        </p>
                      </div>

                      <div
                        style={{ fontSize: 13 }}
                        className="mt-1 flex items-center"
                      >
                        <div
                          style={{ textTransform: "capitalize", fontSize: 13 }}
                        >
                          {album.album_type}
                        </div>
                        <div
                          class="text-base font-normal mx-2"
                          style={{ fontSize: 40 }}
                        >
                          ·
                        </div>

                        <span>
                          {album.total_tracks}{" "}
                          {album.total_tracks > 1 ? "tracks" : "track"}
                        </span>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Hidden>
    </>
  );
};

export default Sidebar;
