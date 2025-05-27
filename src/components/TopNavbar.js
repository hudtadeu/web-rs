import React from "react";
import { AppBar, Toolbar, Typography, IconButton, Box } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faUserCircle } from "@fortawesome/free-solid-svg-icons";

const TopNavbar = ({ sidebarWidth, isSidebarOpen, toggleSidebar, selectedMenu }) => {
  return (
    <AppBar
      position="fixed"
      sx={{
        width: `calc(100% - ${isSidebarOpen ? sidebarWidth : 60}px)`,
        marginLeft: `${isSidebarOpen ? sidebarWidth : 60}px`,
        backgroundColor: "transparent",
        boxShadow: "none",
        transition: "margin-left 0.3s ease, width 0.3s ease",
      }}
    >
      <Toolbar>
        <IconButton
          onClick={toggleSidebar}
          sx={{
            color: "#3C8DBC",
            mr: 2,
            fontSize: "1.2rem",
          }}
        >
          <FontAwesomeIcon icon={faBars} />
        </IconButton>
        <Box
          sx={{
            display: "flex",
            alignItems: "center", 
            gap: "8px",
            flexGrow: 1, 
            overflow: "hidden",
          }}
        >
          {selectedMenu.icon && (
            <FontAwesomeIcon
              icon={selectedMenu.icon}
              style={{
                fontSize: "0.8em",
                color: "#3C8DBC",
              }}
            />
          )}
          <Typography
            variant="h6"
            sx={{
              color: "#3C8DBC",
              fontSize: "1rem",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {selectedMenu.text}
          </Typography>
        </Box>
        <IconButton sx={{ color: "#3C8DBC", fontSize: "1.2rem" }}>
          <FontAwesomeIcon icon={faUserCircle} />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default TopNavbar;
