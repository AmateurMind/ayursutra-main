import React from "react";
import Routes from "./Routes";
import { AuthProvider } from './contexts/AuthContext';
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <AuthProvider>
      <Routes />
      {/* Toast container (must be rendered once) */}
      <Toaster position="top-right" reverseOrder={false} />
    </AuthProvider>
  );
}

export default App;
