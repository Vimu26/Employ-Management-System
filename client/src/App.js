import "./App.css";
import Login from "./Components/Auth/Login/Login";
import Register from "./Components/Auth/Register/Register";
import Dashboard from "./Components/Dashboard/dashboard"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { CssBaseline } from "@mui/material";

function App() {
  return (
    <div>
      <BrowserRouter>
        <CssBaseline />
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/dashboard" element={<Dashboard />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
