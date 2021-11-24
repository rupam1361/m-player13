import React from "react";
import { Hidden } from "@mui/material";

const navigation = [
  { name: "Home", href: "#", current: true },
  // { name: "Recommended", href: "#", current: false },
  { name: "Categories", href: "#", current: false },
  // { name: "Trending", href: "#", current: false },
  { name: "My Playlist", href: "#", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Categories = ({
  category,
  setCategory,
  setShowSearchSongs,
  setSearchTerm,
}) => {
  return (
    <>
      <Hidden xsDown mdDown>
        <div className="mt-5 max-w-2xl mx-auto">
          <div className="hidden sm:block sm:ml-14">
            <div className="flex space-x-4">
              {navigation.map((item) => (
                <div>
                  {navigation
                    .filter((nav) => nav.name === category)
                    .map((currentItem) => (currentItem.current = true))}
                  {navigation
                    .filter((nav) => nav.name !== category)
                    .map((currentItem) => (currentItem.current = false))}
                  <a
                    onClick={() => {
                      setCategory(item.name);
                      setSearchTerm("");
                    }}
                    key={item.name}
                    href={item.href}
                    style={{ transition: "0.4s ease-in-out" }}
                    className={classNames(
                      item.current
                        ? "bg-gray-900 text-white"
                        : "text-gray-300 hover:bg-gray-700 hover:text-white",
                      "px-3 py-2 rounded-md text-sm font-medium"
                    )}
                    aria-current={item.current ? "page" : undefined}
                  >
                    {item.name}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Hidden>
      <Hidden smUp>
        <div className="mt-4 max-w-2xl mx-auto mb-4">
          <div className="ml-2">
            <div className="flex space-x-4">
              {navigation.map((item) => (
                <div>
                  {navigation
                    .filter((nav) => nav.name === category)
                    .map((currentItem) => (currentItem.current = true))}
                  {navigation
                    .filter((nav) => nav.name !== category)
                    .map((currentItem) => (currentItem.current = false))}
                  <a
                    onClick={() => {
                      setCategory(item.name);
                      setSearchTerm("");
                    }}
                    key={item.name}
                    href={item.href}
                    // style={{ transition: "0.4s ease-in-out" }}
                    className={classNames(
                      item.current
                        ? "bg-gray-900 text-white"
                        : "text-gray-300 hover:bg-gray-700 hover:text-white",
                      "px-3 py-2 rounded-md text-sm font-medium"
                    )}
                    aria-current={item.current ? "page" : undefined}
                  >
                    {item.name}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Hidden>
    </>
  );
};

export default Categories;
