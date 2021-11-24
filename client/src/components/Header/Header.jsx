import React, { useState, useEffect } from "react";
import { styled, alpha } from "@mui/material/styles";

import {
  AppBar,
  Toolbar,
  IconButton,
  InputBase,
  Box,
  Typography,
  Drawer,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import MusicNoteOutlinedIcon from "@mui/icons-material/MusicNoteOutlined";

import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import PlaylistPlayIcon from "@mui/icons-material/PlaylistPlay";

import noImage from "../../assets/Mac_Miller_Live_from_Space.jpg";

function convertUppercase(word) {
  return word.toUpperCase();
}

const allCategories = [
  {
    name: "Home",
    description:
      "Get a better understanding of where your traffic is coming from.",
    href: "#",
    icon: <HomeIcon fontSize="small" />,
  },
  {
    name: "New Releases",
    description: "Speak directly to your customers in a more meaningful way.",
    href: "#",
    icon: <TrendingUpIcon fontSize="small" />,
  },
  {
    name: "Artists",
    description: "Your customers' data will be safe and secure.",
    href: "#",
    icon: <PersonIcon fontSize="small" />,
  },
  // {
  //   name: "Categories",
  //   description: "Your customers' data will be safe and secure.",
  //   href: "#",
  //   icon: <CategoryIcon />,
  // },
];

const myMusic = [
  {
    name: "Saved Tracks",
    description:
      "Get a better understanding of where your traffic is coming from.",
    href: "#",
    icon: <SaveAltIcon fontSize="small" />,
  },
  {
    name: "My Playlists",
    description: "Speak directly to your customers in a more meaningful way.",
    href: "#",
    icon: <PlaylistPlayIcon fontSize="small" />,
  },
];

const Header = (
  {
    searchTerm,
    setSearchTerm,
    setCategory,
    drawerWidth,
    mobileOpen,
    setMobileOpen,
    width,
    currentUser,
  },
  props
) => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const { window } = props;
  const [showStyledInputBaseMobile, setShowStyledInputBaseMobile] = useState(
    false
  );

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  console.log(currentUser);

  const container =
    window !== undefined ? () => window().document.body : undefined;

  const Search = styled("div")(({ theme }) => ({
    position: "relative",
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
  }));

  const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }));

  const SearchIconWrapperMobile = styled("div")(({ theme }) => ({
    margin: theme.spacing(0, 0),
    height: "100%",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    "& .MuiInputBase-input": {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        width: "40ch",
        // "&:focus": {
        //   width: "32ch",
        // },
      },
    },
  }));

  const StyledInputBaseMobile = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    "& .MuiInputBase-input": {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(1)})`,
      transition: theme.transitions.create("width"),

      [theme.breakpoints.up("sm")]: {
        width: "100%",
        // "&:focus": {
        //   width: "32ch",
        // },
      },
    },
  }));

  useEffect(() => {
    if (searchTerm !== "") {
      setShowStyledInputBaseMobile(true);
    }
  }, [searchTerm]);

  const drawer =
    currentUser !== undefined ? (
      <div>
        <div
          style={{
            padding: "20px 100px 20px 20px",
          }}
        >
          <div
            style={{
              padding: 6,
              border: "1px solid rgb(200, 200, 200)",
              borderRadius: 14,
            }}
          >
            <img
              class=" rounded-full"
              style={{ borderRadius: 10 }}
              src={currentUser.images[0].url}
              alt=""
            />
          </div>
        </div>
        <div style={{ padding: "0 20px 20px 20px" }}>
          <Typography
            style={{
              fontSize: 14,
              textTransform: "uppercase",
              letterSpacing: 2,
            }}
          >
            {currentUser.display_name}
          </Typography>
          <Typography style={{ marginTop: 6, fontSize: 13 }}>
            {currentUser.email}
          </Typography>
        </div>
        <Divider />
        <List>
          {allCategories.map((category, index) => (
            <ListItem
              selected={selectedCategory === convertUppercase(category.name)}
              button
              key={category.name}
              onClick={(e) => {
                setCategory(category.name);
                setMobileOpen(false);
                setSelectedCategory(e.target.innerText);
                console.log(e.target.innerText, category.name);
              }}
            >
              {console.log(category.name)}
              <ListItemIcon style={{ marginLeft: 10 }}>
                {category.icon}
              </ListItemIcon>
              <ListItemText
                primary={
                  <Typography
                    sx={{
                      fontSize: 13,
                      marginLeft: -2,
                      color: "black",
                      letterSpacing: 1.5,
                      textTransform: "uppercase",
                    }}
                  >
                    {category.name}
                  </Typography>
                }
              />
            </ListItem>
          ))}
        </List>
        <Typography
          style={{
            margin: "18px 0",
            marginLeft: 30,
            fontSize: 15,
            letterSpacing: 4,
            color: "black",
          }}
        >
          MY MUSIC
        </Typography>
        <List>
          {myMusic.map((music, index) => (
            <ListItem
              selected={selectedCategory === convertUppercase(music.name)}
              button
              key={music.name}
              onClick={(e) => {
                setCategory(music.name);
                setMobileOpen(false);
                setSelectedCategory(e.target.innerText);
                console.log(e.target.innerText);
              }}
            >
              <ListItemIcon style={{ marginLeft: 10 }}>
                {music.icon}
              </ListItemIcon>
              <ListItemText
                primary={
                  <Typography
                    sx={{
                      fontSize: 13,
                      marginLeft: -2,
                      color: "black",
                      letterSpacing: 1.5,
                      textTransform: "uppercase",
                    }}
                  >
                    {music.name}
                  </Typography>
                }
              />
            </ListItem>
          ))}
        </List>
      </div>
    ) : null;

  return currentUser !== undefined ? (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar
          position="static"
          color="inherit"
          variant="outlined"
          sx={{
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            ml: { sm: `${drawerWidth}px` },
          }}
        >
          <Toolbar>
            <Box
              sx={{
                display: {
                  lg: "flex",
                  md: "flex",
                  sm: "none",
                  xs: "none",
                },
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
              }}
            >
              <div style={{ display: "flex", justifyContent: "center" }}>
                <Typography
                  noWrap
                  component="div"
                  sx={{ flexGrow: 1, display: "block", fontSize: 18 }}
                >
                  Music
                </Typography>
                {/* <MusicNoteOutlinedIcon
                  sx={{
                    fontSize: 24,
                    display: "block",
                    margin: "0 auto",
                    color: "rgb(120, 120, 120)",
                  }}
                />
                <MusicNoteOutlinedIcon
                  sx={{
                    fontSize: 24,
                    display: "block",
                    margin: "0 auto",
                    color: "rgb(120, 120, 120)",
                  }}
                /> */}
              </div>
              <Search style={{ position: "relative" }}>
                <SearchIconWrapper>
                  <SearchIcon color="primary" />
                </SearchIconWrapper>
                <StyledInputBase
                  autoFocus
                  placeholder="Search for songs and artists.."
                  inputProps={{ "aria-label": "search" }}
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                  }}
                  style={{
                    borderWidth: 1,
                    borderColor: "rgb(220, 220, 220)",
                    marginRight: 30,
                    borderRadius: 10,
                    fontSize: 15,
                  }}
                />
                {searchTerm ? (
                  <span style={{ position: "absolute", right: 40, top: 4 }}>
                    <IconButton onClick={() => setSearchTerm("")} size="small">
                      <ClearIcon fontSize="small" />
                    </IconButton>
                  </span>
                ) : null}
              </Search>
              <div className=" md:flex items-center">
                <img
                  class="w-10 h-10 rounded-full"
                  style={{ borderRadius: 10 }}
                  src={currentUser.images[0].url}
                  alt=""
                />
              </div>
            </Box>
            <Box
              sx={{
                display: {
                  lg: "none",
                  md: "none",
                  sm: "block",
                  xs: "block",
                },
                width: "100%",
              }}
            >
              {showStyledInputBaseMobile ? (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    position: "relative",
                    width: "100%",
                  }}
                >
                  <Search
                    onClick={() => {
                      setShowStyledInputBaseMobile(false);
                      setSearchTerm("");
                    }}
                  >
                    <IconButton>
                      <ArrowBackIcon fontSize="small" />
                    </IconButton>
                  </Search>
                  <StyledInputBaseMobile
                    autoFocus
                    placeholder="Search for songs and artists.."
                    inputProps={{ "aria-label": "search" }}
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                    }}
                    style={{
                      width: "100%",
                      borderRadius: 10,
                      fontSize: 15,
                    }}
                  />
                  {searchTerm ? (
                    <span style={{ position: "absolute", right: 10, top: 5 }}>
                      <IconButton
                        onClick={() => setSearchTerm("")}
                        size="small"
                      >
                        <ClearIcon fontSize="small" />
                      </IconButton>
                    </span>
                  ) : null}
                </div>
              ) : (
                <div
                  style={{
                    display: "flex",
                    width: "100%",
                    alignItems: "center",
                  }}
                >
                  {width < 582 ? (
                    <IconButton
                      size="large"
                      edge="start"
                      color="inherit"
                      aria-label="open drawer"
                      sx={{ mr: 2 }}
                      onClick={handleDrawerToggle}
                    >
                      <MenuIcon />
                    </IconButton>
                  ) : null}
                  <Typography
                    noWrap
                    component="div"
                    sx={{ flexGrow: 1, display: "block", fontSize: 18 }}
                  >
                    Music
                  </Typography>

                  <Search
                    style={{ position: "relative", marginRight: 10 }}
                    onClick={() => setShowStyledInputBaseMobile(true)}
                  >
                    <IconButton>
                      <SearchIconWrapperMobile>
                        <SearchIcon color="primary" />
                      </SearchIconWrapperMobile>
                    </IconButton>
                  </Search>
                  <div className=" md:flex items-center">
                    <img
                      class="w-10 h-10 rounded-full"
                      style={{ borderRadius: 10 }}
                      src={currentUser.images[0].url}
                      alt=""
                    />
                  </div>
                </div>
              )}
            </Box>
          </Toolbar>
        </AppBar>
      </Box>

      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        style={{ backgroundColor: "rgb(240, 240, 240)" }}
        aria-label="mailbox folders"
      >
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
    </>
  ) : null;
};

export default Header;
