import "../node_modules/@fortawesome/fontawesome-free/css/all.css";
import "./assets/css/bulma/bulma.css";
import "./App.css";
import { Route, Switch } from "react-router";
import Home from "./pages/Home/Home";
import Auth from "./pages/Auth/Auth";
import WorkOuts from "./pages/WorkOuts/WorkOuts";
import Feed from "./pages/Feed/Feed";
import Profile from "./pages/Profile/Profile";
import Navbar from "./components/Navbar/Navbar";
import axios from "axios";
import AuthContext from "./AuthContext";
import { useMemo, useState } from "react";
import InstructorLogin from "./pages/InstructorLogin/InstructorLogin";
import InstructorWorkouts from "./pages/InstructorWorkouts/InstructorWorkouts";
import InstructorStudents from "./pages/InstructorStudents/InstructorStudents";
import InstructorNewWorkout from "./pages/InstructorNewWorkout/InstructorNewWorkout";
import DoWorkOutSummary from "./pages/DoWorkOutSummary/DoWorkOutSummary";
import NewPost from "./pages/NewPost/NewPost";
import NotFound from "./pages/NotFound/NotFound";

export const AxiosInstance = axios.create({
  baseURL: "http://127.0.0.1:8000/",
  timeout: 3000,
});

const token = localStorage.getItem("token");
const username = localStorage.getItem("username");
const email = localStorage.getItem("email");
const instructor = localStorage.getItem("instructor") == "true" ? true : false;

let initialState = {
  isAuthenticated: false,
  token: "",
  username: "",
  email: "",
  isInstructor: false,
};
if (token && username && email) {
  initialState = {
    isAuthenticated: true,
    token: token,
    username: username,
    email: email,
    isInstructor: instructor,
  };
}

function App() {
  const [AuthState, setAuthState] = useState(initialState);
  // login, logout ...
  const handleLogin = (token, username, email, instructor = false) => {
    localStorage.setItem("token", token);
    localStorage.setItem("username", username);
    localStorage.setItem("email", email);
    localStorage.setItem("instructor", instructor.toString());
    setAuthState({
      isAuthenticated: true,
      token: token,
      username: username,
      email: email,
      isInstructor: instructor,
    });
  };
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("email");
    setAuthState({
      isAuthenticated: false,
      token: "",
      username: "",
      email: "",
      isInstructor: false,
    });
  };
  useMemo(() => {
    AxiosInstance.interceptors.request.use((req) => {
      if (AuthState.isAuthenticated) {
        req.headers.Authorization = `Token ${AuthState.token}`;
      }
      return req;
    });
  }, [AuthState.token]);
  return (
    <AuthContext.Provider
      value={{ ...AuthState, login: handleLogin, logout: handleLogout }}
    >
      <Navbar />
      <Switch>
        <Route path="/" exact component={Home} />
        {/* user */}
        <Route path="/auth/:type" exact component={Auth} />
        <Route path="/workouts/:type" exact component={WorkOuts} />
        <Route path="/feed" exact component={Feed} />
        <Route path="/new-post" exact component={NewPost} />
        <Route path="/profile/:username" exact component={Profile} />
        <Route
          path="/profile/:username/workouts/:type"
          exact
          component={Profile}
        />

        {/*
         * home page : workouts page - show pending workouts
         * see what othes are doing - show the workouts of friends and other people
         * my profile ...
         */}
        {/* instructor routes  */}
        <Route
          path="/auth/instructor/login"
          exact
          component={InstructorLogin}
        />
        <Route
          path="/instructor/students"
          exact
          component={InstructorStudents}
        />
        <Route
          path="/instructor/assign-workout/:studentUsername"
          exact
          component={InstructorStudents}
        />
        <Route
          path="/instructor/workouts/new/:type"
          exact
          component={InstructorNewWorkout}
        />
        <Route
          path="/instructor/workouts"
          exact
          component={InstructorWorkouts}
        />
        {/* <Route path="/workout/:id/play" exact component={DoWorkOutSummary} /> */}
        <Route path="/workout/:id" exact component={DoWorkOutSummary} />
        <Route path="/not-found" component={NotFound} />
        <Route component={NotFound} />
      </Switch>
    </AuthContext.Provider>
  );
}

export default App;
// keeping the feed page just like insta
