import { useRef } from "react";
import { IconButton, CircularProgress } from "@mui/material";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import AlbumTitle from "../../AlbumTitle/AlbumTitle";
import AlbumTracks from "../../AlbumTitle/AlbumTracks/AlbumTracks";
import noImage from "../../../assets/no-image1.jpg";

const truncate = (str) => {
  return str.length > 20 ? str.substr(0, 20) + "..." : str;
};

const NewReleases = ({
  newReleases,
  selectAlbum,
  album,
  setShowAlbumList,
  searchTerm,
  searchTracks,
  playlistTracks,
  setSearchData,
  setAlbumTracks,
  albumTracks,
  chooseTrack,
  setChooseTrack,
  currentSongPlayingId,
  floatingPlayerPlay,
  setFloatingPlayerPlay,
  setCurrentSongPlayingId,
  setPlayButtonPressedCount,
  playButtonPressedCount,
  isLoading,
}) => {
  const newReleasesLi = useRef();

  const scroll = (scrollOffset) => {
    newReleasesLi.current.scrollLeft += scrollOffset;
  };
  console.log(floatingPlayerPlay);
  return (
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
          NEW RELEASES ({newReleases.length})
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
        role="list"
        className="sidebar"
        ref={newReleasesLi}
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginLeft: 12,
          overflowX: "scroll",
        }}
      >
        {newReleases?.map((song) => (
          <li
            key={song.id}
            onClick={() => selectAlbum(song.id)}
            style={
              album.id === song.id
                ? {
                    marginRight: 20,
                    alignItems: "center",
                    backgroundColor: "rgb(240, 240, 240)",
                  }
                : { marginRight: 20, alignItems: "center" }
            }
            className="py-1 flex-shrink-0 w-30 rounded-md overflow-hidden cardHover"
          >
            <div
              style={{
                cursor: "pointer",
                padding: 6,
                borderRadius: 100,
              }}
              className="ml-1 mr-1 mb-2 flex-shrink-0 w-32 h-32 border border-gray-200 rounded-md overflow-hidden"
            >
              <img
                src={song.images ? song.images[0].url : noImage}
                className="w-full h-full object-center object-cover"
                style={{
                  borderRadius: 100,
                }}
              />
            </div>

            <div className="ml-2 flex-1 flex flex-col mr-2">
              <div>
                <div
                  className="flex justify-between text-gray-900"
                  style={{
                    fontSize: 13,
                    justifyContent: "center",
                    textTransform: "capitalize",
                    marginBottom: 10,
                  }}
                >
                  <p>{truncate(song.name)}</p>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
      {!isLoading ? (
        <div
          style={{
            paddingTop: "6%",
            paddingBottom: "2%",
            alignItems: "center",
          }}
          className=""
        >
          <AlbumTitle
            album={album}
            setShowAlbumList={setShowAlbumList}
            searchTerm={searchTerm}
            searchTracks={searchTracks}
            playlistTracks={playlistTracks}
            setSearchData={setSearchData}
            setAlbumTracks={setAlbumTracks}
          />
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
    </div>
  );
};

export default NewReleases;
