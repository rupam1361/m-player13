import { useRef } from "react";
import { IconButton } from "@mui/material";

import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import noImage from "../../../assets/no-image1.jpg";

const truncate = (str) => {
  return str.length > 36 ? str.substr(0, 40) + "..." : str;
};

const RelatedArtists = ({
  relatedArtists,
  getArtist,
  getArtistRelatedArtists,
}) => {
  const artistLi = useRef();
  // console.log(artistLi.current.scrollLeft);

  const scroll = (scrollOffset) => {
    artistLi.current.scrollLeft += scrollOffset;
  };

  return relatedArtists.length > 0 ? (
    <div className="">
      <div
        style={{
          margin: 12,
          marginTop: 0,
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
          RELATED ARTISTS ({relatedArtists.length})
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
        ref={artistLi}
        className="sidebar"
        style={{
          display: "flex",
          justifyContent: "flex-start",

          overflowX: "scroll",
        }}
      >
        {relatedArtists?.map((artist) => (
          <li
            key={artist.id}
            onClick={() => {
              getArtist(artist.id);
              getArtistRelatedArtists(artist.id);
            }}
            style={{ marginRight: 20, alignItems: "center" }}
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
                  // alt={artist.id ? artist.images[0].url : noImage}
                  className="w-full h-full object-center object-cover"
                  style={{
                    borderRadius: 100,
                  }}
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
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  ) : null;
};

export default RelatedArtists;
