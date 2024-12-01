import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import GlobalState from "./context/GlobalState.jsx";
import { Provider } from "react-redux";
import { SnackbarProvider } from "notistack";

import store from "./reduxStore/configureStore.jsx";
createRoot(document.getElementById("root")).render(
  <SnackbarProvider>
    <Provider store={store}>
      <GlobalState>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </GlobalState>
    </Provider>
  </SnackbarProvider>
);
