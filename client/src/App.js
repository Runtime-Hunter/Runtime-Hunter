import React from "react";
import { Route, Routes } from "react-router-dom";
import { Navigate } from "react-router";

import "./App.css";
import AboutUs from "./pages/aboutus-page/about-us";

import Landing from "./pages/landing/landing";
import Login from "./pages/login/login";
import Signup from "./pages/signup/signup";
import ChangePassword from "./pages/change-password/change-password";
import ErrorPage from "./pages/error-page/error-page";
import Courses from "./pages/courses/courses";

import { useStore } from "./store/store";
import Homepage from "./pages/homepage/homepage";

function App() {
  const [state] = useStore();
  const { user: currentUser } = state;
  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <Routes>
        {!currentUser ?
          <>
            <Route
              path="/login"
              element={<Login />}
            />
            <Route
              path="/landing"
              element={<Landing />}
            />
            <Route
              path="/signup"
              element={<Signup />}
            />
            <Route
              path="/aboutUs"
              element={<AboutUs />}
            />
            <Route
              path="*"
              element={<Landing />}
            />
          </> :
          <>
            <Route
              path="/change-password"
              element={<ChangePassword />}
            />
            <Route
              path="/login"
              element={<Navigate to="/home"/>}
            />
            <Route
              path="/signup"
              element={<Navigate to="/home"/>}
            />
            <Route
              path="/courses"
              element={<Courses />}
            />
            <Route
              path="/home"
              element={<Homepage />}
            />
            <Route
              path="/"
              element={<Homepage />}
            />
            <Route
              path="*"
              element={<ErrorPage />}
            />
          </>
        }
      </Routes>
    </React.Suspense>
  );
}

export default App;
