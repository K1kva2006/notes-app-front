import { useState, createContext } from "react";
import { Routes, Route } from "react-router-dom";

import Register from "./routes/Register";
import Login from "./routes/Login";
import Profile from "./routes/Profile";
import Error from "./routes/Error";

import "./App.css";

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Register />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/*" element={<Error />} />
            </Routes>
        </>
    );
}

export default App;
