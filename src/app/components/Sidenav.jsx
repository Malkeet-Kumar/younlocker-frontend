import { Fragment } from "react";
import { styled } from "@mui/material/styles";
import Scrollbar from "react-perfect-scrollbar";

import { MatxVerticalNav } from "../components";
import useSettings from "../hooks/useSettings";
import { navigations } from "../navigations";

import useStore from "../hooks/useStore";

// STYLED COMPONENTS
const StyledScrollBar = styled(Scrollbar)(() => ({
  paddingLeft: "1rem",
  paddingRight: "1rem",
  position: "relative"
}));

const SideNavMobile = styled("div")(({ theme }) => ({
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  zIndex: -1,
  width: "100vw",
  background: "rgba(0, 0, 0, 0.54)",
  [theme.breakpoints.up("lg")]: { display: "none" }
}));

export default function Sidenav({ children }) {
  const { settings, updateSettings } = useSettings();
  const {pageAccess} = useStore()

  const updateSidebarMode = (sidebarSettings) => {
    let activeLayoutSettingsName = settings.activeLayout + "Settings";
    let activeLayoutSettings = settings[activeLayoutSettingsName];

    updateSettings({
      ...settings,
      [activeLayoutSettingsName]: {
        ...activeLayoutSettings,
        leftSidebar: {
          ...activeLayoutSettings.leftSidebar,
          ...sidebarSettings
        }
      }
    });
  };

  const filterNavigations = (navigations, accessArray) => {
    const accessMap = accessArray.reduce((acc, { path, access }) => {
      acc[path] = access;
      return acc;
    }, {});

    const filterItems = (items) => {
      return items.reduce((result, item) => {
        if (item.type === "label") {
          const associatedSection = navigations.find((nav) => nav.id === item.for);
          const isSectionAccessible =
            associatedSection && filterItems(associatedSection.children).length > 0;

          if (isSectionAccessible) {
            result.push({
              ...item,
              children: filterItems(associatedSection.children) // Filter children as well
            });
          }
        } else if (item.children) {
          const filteredChildren = filterItems(item.children);
          if (
            filteredChildren.length > 0 ||
            (accessMap[item.path] !== false && accessMap[item.path] !== undefined)
          ) {
            result.push({
              ...item,
              children: filteredChildren
            });
          }
        } else if (accessMap[item.path] !== false && accessMap[item.path] !== undefined) {
          result.push(item);
        }
        return result;
      }, []);
    };

    return filterItems(navigations);
  };

  const filteredNavigations = filterNavigations(navigations, pageAccess);

  return (
    <Fragment>
      <StyledScrollBar options={{ suppressScrollX: true }}>
        {children}
        <MatxVerticalNav items={filteredNavigations} />
      </StyledScrollBar>

      <SideNavMobile onClick={() => updateSidebarMode({ mode: "close" })} />
    </Fragment>
  );
}
