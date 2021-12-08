import { useRef } from "react";
import { IconButton } from "@mui/material";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";

const truncate = (str) => {
  return str.length > 20 ? str.substr(0, 15) + "..." : str;
};

const MyTopArtists = ({
  myTopArtists,
  noImage,
  getArtist,
  getArtistRelatedArtists,
  artistDetails,
}) => {
  const artistLi = useRef();

  const scroll = (scrollOffset) => {
    artistLi.current.scrollLeft += scrollOffset;
  };

  console.log(artistDetails);

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
          MY TOP ARTISTS ({myTopArtists.length})
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

      {myTopArtists.length > 0 ? (
        <ul
          role="list"
          ref={artistLi}
          className="sidebar"
          style={{
            display: "flex",
            justifyContent: "flex-start",
            marginLeft: 12,
            overflowX: "scroll",
          }}
        >
          {myTopArtists?.map((artist) => (
            <li
              key={artist.id}
              onClick={() => {
                getArtist(artist.id);
                getArtistRelatedArtists(artist.id);
              }}
              style={
                artistDetails.id === artist.id
                  ? {
                      marginRight: 10,
                      alignItems: "center",
                      backgroundColor: "rgb(240, 240, 240)",
                    }
                  : { marginRight: 10, alignItems: "center" }
              }
              className="py-1 flex-shrink-0 w-30 rounded-md overflow-hidden cardHover"
            >
              <div
                style={{
                  cursor: "pointer",
                  padding: 6,
                  borderRadius: 100,
                  display: "flex",
                  justifyContent: "center",
                }}
                className="ml-1 mr-1 mb-2 flex-shrink-0 w-28 h-28 border border-gray-200 rounded-md overflow-hidden"
              >
                {artist.images[0] !== undefined ? (
                  <img
                    src={artist.images[0].url}
                    className="w-full h-full object-center object-cover"
                    style={{
                      borderRadius: 100,
                    }}
                  />
                ) : (
                  <img
                    src={noImage}
                    alt={artist.id ? artist.images[0].url : noImage}
                    className="w-full h-full object-center object-cover"
                    style={{ borderRadius: 100 }}
                  />
                )}
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
                    <p>{truncate(artist.name)}</p>
                    {/* <p style={{ fontSize: 13 }}>{artist.popularity}</p> */}
                  </div>

                  {/* <div
                    style={{ fontSize: 13, marginTop: 6, marginBottom: 4 }}
                    className="mt-1 flex items-center text-gray-500"
                  >
                    <PeopleAltIcon fontSize="small" />{" "}
                    <span style={{ marginLeft: 4 }}>
                      {formatFollowersCount(artist.followers.total)} followers
                    </span>
                  </div> */}
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div
          style={{
            margin: "200px 0",
            fontSize: 14,
            textAlign: "center",
          }}
        >
          <div style={{ letterSpacing: 1 }}>
            You have no top artists list currently...
          </div>
        </div>
      )}
    </div>
  );
};

export default MyTopArtists;
