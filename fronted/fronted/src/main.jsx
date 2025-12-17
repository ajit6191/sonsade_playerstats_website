import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import InitAuth from "./redux/InitAuth";
import { store } from "./redux/Store";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <BrowserRouter>
      {/* 🔐 Check admin cookie on app load */}
      <InitAuth />
      <App />
    </BrowserRouter>
  </Provider>
);
