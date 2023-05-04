import React from "react";
import AllRoutes from "./routes/routes";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import Appbar from "./components/appBar/appBar";

function App() {
  return (
    <>
      <BrowserRouter>
        <Appbar />
        <AllRoutes />
      </BrowserRouter>
    </>
  );
}

export default App;
