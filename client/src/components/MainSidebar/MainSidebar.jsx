import React from "react";

import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import CategoryIcon from "@mui/icons-material/Category";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import FeaturedPlayListIcon from "@mui/icons-material/FeaturedPlayList";

const allCategories = [
  {
    name: "Home",
    description:
      "Get a better understanding of where your traffic is coming from.",
    href: "#",
    icon: HomeIcon,
  },
  {
    name: "New Releases",
    description: "Speak directly to your customers in a more meaningful way.",
    href: "#",
    icon: TrendingUpIcon,
  },
  {
    name: "Artists",
    description: "Your customers' data will be safe and secure.",
    href: "#",
    icon: PersonIcon,
  },
  {
    name: "Categories",
    description: "Your customers' data will be safe and secure.",
    href: "#",
    icon: CategoryIcon,
  },
];

const myMusic = [
  {
    name: "Recently Played",
    description:
      "Get a better understanding of where your traffic is coming from.",
    href: "#",
    icon: AccessTimeFilledIcon,
  },
  {
    name: "My Playlists",
    description: "Speak directly to your customers in a more meaningful way.",
    href: "#",
    icon: FeaturedPlayListIcon,
  },
];

const MainSidebar = ({ setCategory }) => {
  return (
    <div style={{ width: "16%", position: "fixed" }} className="mt-4 ml-20">
      <div
        className=" ring-black ring-opacity-5 overflow-hidden"
        style={{
          borderRightWidth: 1.5,
          borderColor: "rgb(220, 220, 220)",
          height: "80vh",
        }}
      >
        <div className="relative grid gap-6  px-5 py-6 sm:gap-6 sm:p-6">
          {allCategories.map((item) => (
            <a
              key={item.name}
              style={{ cursor: "pointer" }}
              onClick={() => setCategory(item.name)}
              className="-m-3 p-3 flex items-start rounded-lg hover:bg-gray-50"
            >
              <item.icon
                className="flex-shrink-0 h-6 w-6 text-gray-600"
                aria-hidden="true"
              />

              <div className="ml-4">
                <p
                  className="text-base  text-gray-900"
                  style={{ fontSize: 14 }}
                >
                  {item.name}
                </p>
                {/* <p className="mt-1 text-sm text-gray-500">{item.description}</p> */}
              </div>
            </a>
          ))}
        </div>
        <div className="relative grid gap-6 px-5 py-1 text-gray-400 ">
          MY MUSIC
        </div>
        <div className="relative grid gap-6  px-5 py-4 sm:gap-6 sm:p-6">
          {myMusic.map((item) => (
            <a
              key={item.name}
              style={{ cursor: "pointer" }}
              onClick={() => console.log(item.name)}
              className="-m-3 p-3 flex items-start rounded-lg hover:bg-gray-50"
            >
              <item.icon
                className="flex-shrink-0 h-6 w-6 text-gray-600"
                aria-hidden="true"
              />
              <div className="ml-4">
                <p
                  className="text-base  text-gray-900"
                  style={{ fontSize: 14 }}
                >
                  {item.name}
                </p>
                {/* <p className="mt-1 text-sm text-gray-500">{item.description}</p> */}
              </div>
            </a>
          ))}
        </div>
        {/* <span>
          <hr style={{ height: "90vh", width: 5, backgroundColor: "black" }} />
        </span> */}
      </div>
    </div>
  );
};

export default MainSidebar;
