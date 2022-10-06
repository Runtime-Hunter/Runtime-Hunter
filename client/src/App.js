import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import AboutUs from "./pages/aboutus-page/about-us";

import Landing from "./pages/landing/landing.jsx";
//import Login from './pages/login/login.jsx';

//import Signup from './pages/signup/signup.jsx';

//import { useStore } from './store/store';

function App() {
  //const [state] = useStore();
  //const { user: currentUser } = state;

  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <>
          {/* <Route
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
          /> */}
          <Route
            path="/aboutUs"
            element={<AboutUs />}
          />
          <Route
            path="*"
            element={<Landing />}
          />
        </>
      </Routes>
    </React.Suspense>
  );
}

export default App;
