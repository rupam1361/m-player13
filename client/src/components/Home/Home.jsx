import { Hidden, Box } from "@mui/material";

import RecentlyPlayedMobile from "./RecentlyPlayed/RecentlyPlayedMobile";
import NewReleases from "./NewReleases/NewReleases";
import MyTopTracks from "./MyTopTracks/MyTopTracks";
import MyTopArtists from "./MyTopArtists/MyTopArtists";
import MyCategories from "./MyCategories/MyCategories";

import noImage from "../../assets/no-image1.jpg";

const Home = ({
  album,
  setShowAlbumList,
  searchTerm,
  searchTracks,
  playlistTracks,
  setSearchData,
  setAlbumTracks,
  setChooseTrack,
  floatingPlayerPlay,
  setFloatingPlayerPlay,
  currentSongPlayingId,
  setCurrentSongPlayingId,
  recentlyPlayedSongs,
  newReleases,
  myTopArtists,
  myTopTracks,
  selectAlbum,
  musicCategories,
  selectCategorySublist,
  getArtist,
  setPlayButtonPressedCount,
  playButtonPressedCount,
  albumTracks,
  chooseTrack,
}) => {
  // console.log(albumTracks);
  //Removing duplicate entries from recently played songs array
  let filteredRecentlyPlayedSongs = recentlyPlayedSongs
    .map((e) => e.track["id"])
    .map((e, i, final) => final.indexOf(e) === i && i)
    .filter((obj) => recentlyPlayedSongs[obj])
    .map((e) => recentlyPlayedSongs[e]);

  return (
    <>
      {/* <Hidden lgDown> */}
      <div className="flex flex-col ">
        <div className="">
          <MyCategories
            musicCategories={musicCategories}
            selectAlbum={selectAlbum}
            selectCategorySublist={selectCategorySublist}
            noImage={noImage}
          />
          <MyTopTracks
            myTopTracks={myTopTracks}
            noImage={noImage}
            floatingPlayerPlay={floatingPlayerPlay}
            setFloatingPlayerPlay={setFloatingPlayerPlay}
            currentSongPlayingId={currentSongPlayingId}
            setCurrentSongPlayingId={setCurrentSongPlayingId}
            setChooseTrack={setChooseTrack}
            setPlayButtonPressedCount={setPlayButtonPressedCount}
            playButtonPressedCount={playButtonPressedCount}
          />
          {/* <Box
            sx={{
              display: { xs: "block", sm: "block", md: "block", lg: "none" },
            }}
          >
            <RecentlyPlayedMobile
              recentlyPlayedSongs={recentlyPlayedSongs}
              filteredRecentlyPlayedSongs={filteredRecentlyPlayedSongs}
              noImage={noImage}
              floatingPlayerPlay={floatingPlayerPlay}
              setFloatingPlayerPlay={setFloatingPlayerPlay}
              currentSongPlayingId={currentSongPlayingId}
              setCurrentSongPlayingId={setCurrentSongPlayingId}
              setChooseTrack={setChooseTrack}
              setPlayButtonPressedCount={setPlayButtonPressedCount}
              playButtonPressedCount={playButtonPressedCount}
            />
          </Box> */}
        </div>
      </div>
      {/* </Hidden> */}
      {/* <Hidden lgUp>
        <div className="flex flex-col ">
          <div className="lg:flex md:block sm:block">
            <MyTopTracks
              myTopTracks={myTopTracks}
              noImage={noImage}
              floatingPlayerPlay={floatingPlayerPlay}
              setFloatingPlayerPlay={setFloatingPlayerPlay}
              currentSongPlayingId={currentSongPlayingId}
              setCurrentSongPlayingId={setCurrentSongPlayingId}
              setChooseTrack={setChooseTrack}
              setPlayButtonPressedCount={setPlayButtonPressedCount}
              playButtonPressedCount={playButtonPressedCount}
            />
            <RecentlyPlayed
              recentlyPlayedSongs={recentlyPlayedSongs}
              filteredRecentlyPlayedSongs={filteredRecentlyPlayedSongs}
              noImage={noImage}
              floatingPlayerPlay={floatingPlayerPlay}
              setFloatingPlayerPlay={setFloatingPlayerPlay}
              currentSongPlayingId={currentSongPlayingId}
              setCurrentSongPlayingId={setCurrentSongPlayingId}
              setChooseTrack={setChooseTrack}
              setPlayButtonPressedCount={setPlayButtonPressedCount}
              playButtonPressedCount={playButtonPressedCount}
            />

            
          </div>
        </div>
      </Hidden> */}

      {/* <div className="bg-white ">
          <div className="flow-root">
            <RecentlyPlayed
              recentlyPlayedSongs={recentlyPlayedSongs}
              filteredRecentlyPlayedSongs={filteredRecentlyPlayedSongs}
              noImage={noImage}
              floatingPlayerPlay={floatingPlayerPlay}
              setFloatingPlayerPlay={setFloatingPlayerPlay}
              currentSongPlayingId={currentSongPlayingId}
              setCurrentSongPlayingId={setCurrentSongPlayingId}
              setChooseTrack={setChooseTrack}
              setPlayButtonPressedCount={setPlayButtonPressedCount}
              playButtonPressedCount={playButtonPressedCount}
            />
            <NewReleases
              newReleases={newReleases}
              selectAlbum={selectAlbum}
              noImage={noImage}
              album={album}
              setShowAlbumList={setShowAlbumList}
              searchTerm={searchTerm}
              searchTracks={searchTracks}
              playlistTracks={playlistTracks}
              setSearchData={setSearchData}
              setAlbumTracks={setAlbumTracks}
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
            <MyTopTracks
              myTopTracks={myTopTracks}
              noImage={noImage}
              floatingPlayerPlay={floatingPlayerPlay}
              setFloatingPlayerPlay={setFloatingPlayerPlay}
              currentSongPlayingId={currentSongPlayingId}
              setCurrentSongPlayingId={setCurrentSongPlayingId}
              setChooseTrack={setChooseTrack}
              setPlayButtonPressedCount={setPlayButtonPressedCount}
              playButtonPressedCount={playButtonPressedCount}
            />
            <MyTopArtists
              myTopArtists={myTopArtists}
              noImage={noImage}
              getArtist={getArtist}
            />
            <MyCategories
              musicCategories={musicCategories}
              selectAlbum={selectAlbum}
              selectCategorySublist={selectCategorySublist}
              noImage={noImage}
            />
          </div>
        </div> */}
    </>
  );
};

export default Home;
