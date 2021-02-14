import React, { useContext } from "react";
import { Link, NavLink, useHistory, withRouter } from "react-router-dom";
import AuthContext from "../../AuthContext";
import Logo from "../Logo/Logo";

const Navbar = () => {
  const authState = useContext(AuthContext);
  const history = useHistory();
  return (
    <nav className="navbar is-light" style={{ zIndex: 0 }}>
      <div className="navbar-brand">
        <div className="navbar-item title">
          <Logo />
        </div>
      </div>
      <div className="navbar-menu">
        <div className="navbar-end">
          {authState.isAuthenticated ? (
            <>
              <NavLink
                activeClassName="is-active"
                to={
                  authState.isInstructor
                    ? "/instructor/workouts"
                    : "/workouts/pending"
                }
                className="navbar-item"
              >
                <span className="icon is-size-5 is-medium">
                  <i className="fas fa-dumbbell"></i>
                </span>
              </NavLink>
              <NavLink
                activeClassName="is-active"
                to={authState.isInstructor ? "/instructor/students" : "/feed"}
                className="navbar-item"
              >
                <span className="icon is-size-5 is-medium">
                  <i className="fas fa-users"></i>
                </span>
              </NavLink>
              {!authState.isInstructor ? (
                <NavLink
                  activeClassName="is-active"
                  to={`/profile/${authState.username}`}
                  className="navbar-item"
                >
                  <span className="icon is-size-5 is-medium">
                    <i className="fas fa-user"></i>
                  </span>
                </NavLink>
              ) : null}
              <NavLink
                activeClassName="is-active"
                to={
                  authState.isInstructor
                    ? "/instructor/notifications"
                    : "/notifications"
                }
                className="navbar-item"
              >
                <span className="icon is-size-5 is-medium">
                  <i className="fas fa-bell"></i>
                </span>
              </NavLink>
            </>
          ) : null}
          {!authState.isAuthenticated ? (
            <>
              <div className="navbar-item">
                <Link
                  to="/auth/signin"
                  className="button is-primary is-light is-outlined"
                >
                  <span className="icon">
                    <i className="fas fa-sign-in-alt"></i>
                  </span>
                  <span>SignIn</span>
                </Link>
              </div>
              <div className="navbar-item">
                <Link to="/auth/signup" className="button  is-primary">
                  <span className="icon">
                    <i className="fas fa-user-plus"></i>
                  </span>
                  <span>SignUp</span>
                </Link>
              </div>
            </>
          ) : null}
          {authState.isAuthenticated ? (
            <div className="navbar-item">
              <button
                className="button is-primary is-light is-outlined"
                onClick={() => {
                  authState.logout();
                  history.push("/auth/signin");
                }}
              >
                <span className="icon">
                  <i className="fas fa-sign-in-alt"></i>
                </span>
                <span>Logout</span>
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </nav>
  );
};

export default React.memo(withRouter(Navbar));
