import React from "react";
import MyDrawer from "./MyDrawer";
import Editor from "./Editor";
import { Stack } from "@mui/material";

const Dashboard = () => {
  return (
    <Stack>
      <MyDrawer />
      <Editor />
    </Stack>
  );
};

export default Dashboard;
