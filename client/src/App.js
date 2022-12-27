import React from "react";
import { Navigate } from "react-router";
import { Route, Routes } from "react-router-dom";

import "./App.css";
import AboutUs from "./pages/aboutus-page/about-us";
import ChangePassword from "./pages/change-password/change-password";
import CoursePage from "./pages/course-page/course-page";
import Courses from "./pages/courses/courses";
import CreateCourse from "./pages/create-course/create-course";
import CreateQuestion from "./pages/create-question/create-question";
import CreateTestcase from "./pages/create-testcase/create-testcase";
import ErrorPage from "./pages/error-page/error-page";
import Homepage from "./pages/homepage/homepage";
import Landing from "./pages/landing/landing";
import Login from "./pages/login/login";
import ProfilePage from "./pages/profile-page/profile-page";
import QuestionPage from "./pages/question-page/question-page";
import Signup from "./pages/signup/signup";
import EditTestcase from "./pages/testcase-page/testcase-page";
import Testcases from "./pages/testcases-page/testcases-page";
import UpdateCourse from "./pages/update-course/update-course";
import UpdateQuestion from "./pages/update-question/update-question";

import { useStore } from "./store/store";
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
              path="/courses/search/:searchQuery"
              element={<Courses />}
            />
            <Route
              path="/course/:courseId"
              element={<CoursePage />}
            />
            <Route
              path="/home"
              element={<Homepage />}
            />
            <Route
              path="/profile"
              element={<ProfilePage />}
            />
            <Route
              path="/"
              element={<Courses />}
            />
            <Route
              path="/aboutUs"
              element={<AboutUs />}
            />
            <Route
              path="/courses/:courseId/:levelId"
              element={<QuestionPage />}
            />
            <Route
              path="*"
              element={<ErrorPage />}
            />
            {currentUser.userType == 2 &&
          <>
            <Route
              path="/createCourse"
              element={<CreateCourse />}
            />
            <Route
              path="/:courseId/createQuestion"
              element={<CreateQuestion />}
            />
            <Route
              path="/courses/:courseId/:levelId/testcase"
              element={<CreateTestcase />}
            />
            <Route
              path="/courses/:courseId/:levelId/testcases"
              element={<Testcases />}
            />
            <Route
              path="/courses/:courseId/:levelId/:testcaseId"
              element={<EditTestcase />}
            />
            <Route
              path="/courses/update/:courseId"
              element={<UpdateCourse />}
            />
            <Route
              path="/courses/:courseId/:levelId/update"
              element={<UpdateQuestion />}
            />
            <Route
              path="*"
              element={<ErrorPage />}
            />
          </>}
          </>
        }
      </Routes>
    </React.Suspense>
  );
}

export default App;
