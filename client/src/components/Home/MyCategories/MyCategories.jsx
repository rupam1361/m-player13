import { useRef } from "react";
import { IconButton } from "@mui/material";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import noImage from "../../../assets/no-image1.jpg";

const MyCategories = ({
  musicCategories,
  selectAlbum,
  selectCategorySublist,
}) => {
  const musicLi = useRef();
  // console.log(musicLi.current.scrollLeft);

  const scroll = (scrollOffset) => {
    musicLi.current.scrollLeft += scrollOffset;
  };

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
          CATEGORIES ({musicCategories.length})
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
        ref={musicLi}
        style={{
          display: "flex",
          justifyContent: "flex-start",

          overflowX: "scroll",
        }}
      >
        {musicCategories?.map((musCat) => (
          <li
            key={musCat.id}
            onClick={() => {
              musCat.href.split("/")[4] === "albums"
                ? selectAlbum(musCat.id)
                : selectCategorySublist(musCat);
            }}
            style={{ marginRight: 20, alignItems: "center" }}
            className="py-1 flex-shrink-0 w-30  rounded-md overflow-hidden cardHover"
          >
            <div
              style={{
                cursor: "pointer",
                border: "1px solid rgb(220, 220, 220)",
                padding: 6,
                borderRadius: 100,
              }}
              className="ml-1 mr-1 mb-2 flex-shrink-0 w-28 h-28 border border-gray-200 rounded-md overflow-hidden"
            >
              <img
                src={musCat.icons ? musCat.icons[0].url : noImage}
                // alt={album.id ? album.images[0].url : noImage}
                className="w-full h-full object-center object-cover"
                style={{ borderRadius: 100 }}
              />
            </div>

            <div className="ml-2 flex-1 flex flex-col mr-2">
              <div>
                <div
                  className="flex justify-between text-gray-900"
                  style={{
                    fontSize: 13,
                    textTransform: "uppercase",
                    display: "flex",
                    justifyContent: "center",
                    letterSpacing: 0.5,
                  }}
                >
                  <p>{musCat.name}</p>
                </div>
              </div>
            </div>
          </li>
        ))}
        <div></div>
      </ul>
    </div>
  );
};

export default MyCategories;
