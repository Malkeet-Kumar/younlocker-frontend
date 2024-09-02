import { memo, useState } from "react";
import { Link } from "react-router-dom";
import {
  Box,
  styled,
  Avatar,
  Hidden,
  useTheme,
  MenuItem,
  IconButton,
  useMediaQuery,
  ThemeProvider,
  Drawer,
} from "@mui/material";
import { observer } from "mobx-react-lite";

import { NotificationProvider } from "../../../contexts/NotificationContext";

import useStore from "../../../hooks/useStore";
import useSettings from "../../../hooks/useSettings";

import { Span } from "../../../components/Typography";
import ShoppingCart from "../../../components/ShoppingCart";
import { MatxMenu, MatxSearchBox } from "../../../components";
import { NotificationBar } from "../../../components/NotificationBar";
import { themeShadows } from "../../../components/MatxTheme/themeColors";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { constants, sideNavWidth, topBarHeight } from "../../../utils/constant";

import {
  Home,
  Menu,
  Person,
  Settings,
  PowerSettingsNew,
  CloseSharp,
  Savings
} from "@mui/icons-material";
import { CInput, CSelect } from "../../Elements";

// STYLED COMPONENTS
const StyledIconButton = styled(IconButton)(({ theme }) => ({
  color: theme.palette.text.primary
}));

const TopbarRoot = styled("div")({
  top: 0,
  zIndex: 96,
  height: topBarHeight,
  boxShadow: themeShadows[8],
  transition: "all 0.3s ease",
});

const TopbarContainer = styled(Box)(({ theme }) => ({
  padding: "8px",
  paddingLeft: 18,
  paddingRight: 20,
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  background: theme.palette.primary.main,
  [theme.breakpoints.down("sm")]: { paddingLeft: 16, paddingRight: 16 },
  [theme.breakpoints.down("xs")]: { paddingLeft: 14, paddingRight: 16 },
}));

const UserMenu = styled(Box)({
  padding: 4,
  display: "flex",
  borderRadius: 24,
  cursor: "pointer",
  alignItems: "center",
  "& span": { margin: "0 8px" }
});

const StyledItem = styled(MenuItem)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  minWidth: 185,
  "& a": {
    width: "100%",
    display: "flex",
    alignItems: "center",
    textDecoration: "none"
  },
  "& span": { marginRight: "10px", color: theme.palette.text.primary }
}));

const IconBox = styled("div")(({ theme }) => ({
  width: "300px",
  height: "100%",
  display: "flex",
  gap: "10px",
  [theme.breakpoints.down("md")]: { display: "none !important" }
}));

const AutoHideIcon = styled(MoreVertIcon)(({ theme }) => ({
  [theme.breakpoints.up("md")]: { display: "none !important" }
}));

const Container = styled("div")(() => ({
  width: "50%",
  display: "grid",
  gridTemplateColumns: "73% 23%",
  gridGap: "10px",
  alignContent: "center",
  border: "1px solid grey",
  padding: "5px 5px",
  backgroundColor: "white",
  borderRadius: "5px",
  "& input": {
    padding: "5px 5px",
    border: "none"
  },
  "& input:focus": {
    outline: "none"
  }
}));

const DrawerHeader = styled("div")(() => ({
  padding: "16px",
  marginBottom: "16px",
  display: "flex",
  alignItems: "center",
  height: topBarHeight,
  boxShadow: themeShadows[6],
  "& h5": {
    marginLeft: "8px",
    marginTop: 0,
    marginBottom: 0,
    fontWeight: "500"
  }
}));

const Layout1Topbar = () => {
  const theme = useTheme();
  const { settings, updateSettings } = useSettings();
  const store = useStore();
  const { user } = store;
  const isMdScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [mobileDrawer, setMobileDrawer] = useState(false);

  const updateSidebarMode = (sidebarSettings) => {
    updateSettings({ layout1Settings: { leftSidebar: { ...sidebarSettings } } });
  };

  const handleSidebarToggle = () => {
    let { layout1Settings } = settings;
    let mode;
    if (isMdScreen) {
      mode = layout1Settings.leftSidebar.mode === "close" ? "mobile" : "close";
    } else {
      mode = layout1Settings.leftSidebar.mode === "full" ? "close" : "full";
    }
    updateSidebarMode({ mode });
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      store.searchDocket();
    }
  };

  return (
    <TopbarRoot>
      <TopbarContainer>
        <Box display="flex">
          <StyledIconButton onClick={handleSidebarToggle}>
            <Menu />
          </StyledIconButton>
        </Box>

        <Box display="flex" alignItems="center">
          <AutoHideIcon onClick={() => setMobileDrawer((p) => !p)} /> {/*more vert icon*/}
          <NotificationProvider>
            <NotificationBar />
          </NotificationProvider>
          <ThemeProvider theme={settings.themes[settings.activeTheme]}>
            <Drawer
              width={"100px"}
              variant="temporary"
              anchor={"right"}
              open={mobileDrawer}
              onClose={() => setMobileDrawer((p) => !p)}
              ModalProps={{ keepMounted: true }}
            >
              <Box sx={{ width: sideNavWidth }}>
                <DrawerHeader>
                  <CloseSharp color="primary" onClick={() => setMobileDrawer((p) => !p)} />
                  <h5>Close</h5>
                </DrawerHeader>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "5px",
                    alignItems: "center"
                  }}
                >
                </Box>
              </Box>
            </Drawer>
          </ThemeProvider>
          <MatxMenu
            menuButton={
              <UserMenu>
                <Hidden xsDown>
                  <Span>
                    <strong>{user?.name}</strong>
                  </Span>
                </Hidden>
                <Avatar src={user?.avatar} sx={{ cursor: "pointer" }} />
              </UserMenu>
            }
          >
            <StyledItem>
              <Link to="/">
                <Home />
                <Span>Home</Span>
              </Link>
            </StyledItem>

            <StyledItem>
              <>
                <Savings />
                <Span>Balance</Span>
                <Span style={{backgroundColor:"lightgreen", padding:"2px", borderRadius:"3px", color:"white"}}>{user.credits}</Span>C
              </>
            </StyledItem>

            {/* <StyledItem>
              <Settings />
              <Span>Settings</Span>
            </StyledItem> */}

            <StyledItem onClick={() => store.logout()}>
              <PowerSettingsNew />
              <Span>Logout</Span>
            </StyledItem>
          </MatxMenu>
        </Box>
      </TopbarContainer>
    </TopbarRoot>
  );
};

export default observer(Layout1Topbar);
