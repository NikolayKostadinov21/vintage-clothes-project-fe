import React from "react";
import Signin from "../authentication/Signin/Signin";
import Signup from "../authentication/Signup/Signup";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from "../context/AuthProvider";

function Main() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <Routes>
                    <Route path='login' element={<Signin />} />
                    <Route path='register' element={<Signup />} />
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    );
}

export default Main;