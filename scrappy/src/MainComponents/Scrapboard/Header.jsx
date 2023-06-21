import { AppBar, Avatar, IconButton, Stack, Toolbar } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Close from "@mui/icons-material/Close";
import { useState } from "react";
import ScrappyLogo from "./assets/ScrappyLogo.png";

export default function Homepage() {
  const [sideBarOpen, setSideBarOpen] = useState(false);
  return (
    <AppBar position="fixed" elevation={0}>
      <Toolbar
        sx={{
          backgroundColor: "common.white",
          borderBottom: "4px solid",
          paddingLeft: "28px !important",
          color: "black",
        }}
      >
        <Stack justifyContent="space-between" sx={{ width: "100%" }}>
          <Stack>
            <IconButton
              aria-label="open drawer"
              onClick={() => {}}
              edge="start"
              size="large"
              sx={{
                color: "black",
                mr: 4,
                ":focus": {
                  outline: "none !important",
                },
              }}
            >
              {sideBarOpen ? <Close /> : <MenuIcon />}
            </IconButton>
            <img src={ScrappyLogo} alt="logo" style={{ maxWidth: 160 }} />
          </Stack>

          {/* -------HEADER MENU ICONS------- */}

          <Stack spacing={2}>
            <Avatar>AJ</Avatar>
          </Stack>
        </Stack>
      </Toolbar>
    </AppBar>
  );
}
