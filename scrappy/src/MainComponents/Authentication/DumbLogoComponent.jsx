import { Box, Stack, Typography } from "@mui/material";
import ScrappyLogoWhite from "../../assets/ScrappyLogoWhite.png";

export default function DumbLogoComponent() {
  return (
    <Stack
      sx={{
        bgcolor: "scrappyBlack.main",
        width: "100%",
        height: "100vh",
        color: "#fff",
      }}
    >
      <Box sx={{ paddingX: 4 }}>
        <img src={ScrappyLogoWhite} alt="logo" style={{ maxWidth: "300px" }} />
        <Typography
          variant="subtitle1"
          sx={{ marginLeft: 1, letterSpacing: "0.5px" }}
        >
          The better way to manage your notes
        </Typography>
      </Box>
    </Stack>
  );
}
