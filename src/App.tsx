import React from "react";
import { BrowserRouter } from "react-router-dom";
import CustomLayout from "./components/Layout/Layout";
import { AuthProvider } from "./context/AuthContext";
// import Header from "./components/Layout/Header";

import "./App.css";
import "./styles/globals.css";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CustomLayout />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
