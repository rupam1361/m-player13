import React from "react";
import MyTopArtists from "../Home/MyTopArtists/MyTopArtists";
import noImage from "../../assets/no-image1.jpg";

const Artists = ({
  myTopArtists,
  getArtist,
  getArtistRelatedArtists,
  width,
  artistDetails,
}) => {
  return (
    <div style={{ marginTop: 30 }}>
      <MyTopArtists
        myTopArtists={myTopArtists}
        width={width}
        noImage={noImage}
        getArtist={getArtist}
        getArtistRelatedArtists={getArtistRelatedArtists}
        artistDetails={artistDetails}
      />
    </div>
  );
};

export default Artists;
