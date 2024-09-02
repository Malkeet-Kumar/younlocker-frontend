import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import * as serviceWorker from "../public/serviceWorker";
import App from "./app/App";

// third party style
import "perfect-scrollbar/css/perfect-scrollbar.css";
import { AuthProvider } from "./app/contexts/JWTAuthContext";

const root = createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <AuthProvider>
      <App />
    </AuthProvider>
  </BrowserRouter>
);

serviceWorker.unregister();
