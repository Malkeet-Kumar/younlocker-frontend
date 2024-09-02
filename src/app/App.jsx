import { useRoutes } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";

import { MatxTheme, MyAlert } from "./components";
// ALL CONTEXTS
import SettingsProvider from "./contexts/SettingsContext";
// ROUTES
import routes from "./routes";
import { observer } from "mobx-react-lite";

function App() {
  const content = useRoutes(routes);

  return (
    <SettingsProvider>
      <MatxTheme>
        <CssBaseline />
        {content}
      </MatxTheme>
    </SettingsProvider>
  );
}

export default observer(App);
