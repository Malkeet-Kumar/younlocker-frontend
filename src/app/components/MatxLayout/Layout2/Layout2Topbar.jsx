import React from "react";
import { AppBar, Toolbar, Typography, styled } from "@mui/material";

const TopbarRoot = styled(AppBar)(({ theme }) => ({
  background: theme.palette.background.paper,
  boxShadow: theme.shadows[2],
  display: "flex",
  alignItems: "center",
  padding: "0 20px"
}));

const Layout2Topbar = () => (
  <TopbarRoot position="static">
    <Toolbar>
      <Typography variant="h6">My App</Typography>
      {/* Add more elements here */}
    </Toolbar>
  </TopbarRoot>
);

export default Layout2Topbar;
