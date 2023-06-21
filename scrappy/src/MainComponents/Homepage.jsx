import { AppBar, Box, Stack, Toolbar } from "@mui/material";

import ScrappyLogo from "../assets/ScrappyLogo.png";
import ScrappyHeroImage from "../assets/Scrappy.png";
import Button from "../UIBaseComponents/Button";
import { useNavigate } from "react-router-dom";

export default function Homepage() {
  const navigate = useNavigate();
  return (
    <div>
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
            <img src={ScrappyLogo} alt="logo" style={{ maxWidth: 160 }} />

            {/* -------LOGIN BUTTONS------- */}
            <Stack spacing={2}>
              <Button
                onClick={() => {
                  navigate("/login");
                }}
              >
                Login
              </Button>
              <Button color="scrappyBlack">Signup</Button>
            </Stack>
          </Stack>
        </Toolbar>
      </AppBar>
      <Box width="100 vh">
        <img src={ScrappyHeroImage} alt="logo" style={{ width: "100%" }} />
      </Box>
    </div>
  );
}
