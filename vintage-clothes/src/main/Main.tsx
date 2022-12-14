import React from "react";
import Signin from "../authentication/Signin/Signin";
import Signup from "../authentication/Signup/Signup";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from "../context/AuthProvider";
import Admin from "./admin/Admin";
import Home from "./home/Home";

function Main() {
    return (
        <BrowserRouter>
            <AuthProvider>  
                <Routes>
                    <Route path='/' element={<Signin />} />
                    <Route path='/login' element={<Signin />} />
                    <Route path='register' element={<Signup />} />

                    {/* Protected routes */}
                    <Route path='/home' element={<Home />}></Route>
                    <Route path='admin' element={<Admin />}></Route>

                    <Route path="*" element=''></Route>
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    );
}

export default Main;