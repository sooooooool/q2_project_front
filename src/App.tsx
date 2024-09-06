import React from "react";
import { BrowserRouter } from "react-router-dom";
import CustomLayout from "./components/Layout/Layout";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <CustomLayout />
    </BrowserRouter>
  );
}

export default App;
