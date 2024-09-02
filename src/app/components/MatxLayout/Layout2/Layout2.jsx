import React, { useState } from "react";
import { ThemeProvider, Box, styled, useTheme } from "@mui/material";
import Scrollbar from "react-perfect-scrollbar";
import { Outlet } from "react-router-dom";

import useSettings from "../../../hooks/useSettings";
import Layout2Topbar from "./Layout2Topbar";
import Footer from "../../Footer";
import { MatxSuspense } from "../..";

import { sidenavCompactWidth, sideNavWidth } from "../../../utils/constant";
import { observer } from "mobx-react-lite";

// STYLED COMPONENTS
const Layout2Root = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  background: theme.palette.background.default,
  height: "100vh"
}));

const TopbarContainer = styled(Box)(({ theme, open }) => ({
  display: "flex",
  alignItems: "center",
  background: theme.palette.background.paper,
  height: "64px",
  width: "100%",
  boxShadow: theme.shadows[2],
  transition: "all 0.3s ease",
  position: "relative",
  "&:hover .optionsList": {
    opacity: 1,
    visibility: "visible"
  },
  "& .optionsList": {
    position: "absolute",
    top: "64px",
    right: 0,
    background: theme.palette.background.paper,
    boxShadow: theme.shadows[2],
    padding: "10px",
    borderRadius: "4px",
    opacity: 0,
    visibility: "hidden",
    transition: "opacity 0.3s ease, visibility 0.3s ease"
  }
}));

const ContentBox = styled(Box)(() => ({
  height: "100%",
  display: "flex",
  overflowY: "auto",
  overflowX: "hidden",
  flexDirection: "column",
  justifyContent: "space-between"
}));

const StyledScrollBar = styled(Scrollbar)(() => ({
  height: "100%",
  position: "relative",
  display: "flex",
  flexGrow: "1",
  flexDirection: "column"
}));

const Layout2 = () => {
  const { settings } = useSettings();
  const { layout2Settings } = settings;
  const theme = useTheme();

  return (
    <Layout2Root>
      <TopbarContainer theme={theme}>
        <Layout2Topbar />
        <Box className="optionsList">
          {/* Add your options here */}
          <Box>Option 1</Box>
          <Box>Option 2</Box>
          <Box>Option 3</Box>
        </Box>
      </TopbarContainer>

      <ContentBox>
        {settings.perfectScrollbar ? (
          <StyledScrollBar>
            <Box flexGrow={1} position="relative">
              <MatxSuspense>
                <Outlet />
              </MatxSuspense>
            </Box>
            {settings.footer.show && !settings.footer.fixed && <Footer />}
          </StyledScrollBar>
        ) : (
          <Box flexGrow={1} position="relative">
            <MatxSuspense>
              <Outlet />
            </MatxSuspense>
            {settings.footer.show && !settings.footer.fixed && <Footer />}
          </Box>
        )}

        {settings.footer.show && settings.footer.fixed && <Footer />}
      </ContentBox>
    </Layout2Root>
  );
};

export default observer(Layout2);
