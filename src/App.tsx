import React from "react";
import { BrowserRouter } from "react-router-dom";
import CustomLayout from "./components/Layout/Layout";
import { AuthProvider } from "./context/AuthContext";

import "./App.css";

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
