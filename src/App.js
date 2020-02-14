import React, { useState } from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Login } from "./components/auth/Login";
import { SignUp } from "./components/auth/Signup";
import { Admin } from "./components/Admin";
import { BookList } from "./components/BookList";
import { EditBook } from "./components/EditBook";

function App() {
  const [userLogin, setUserLogin] = useState(false);

  return (
    <Router>
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-light fixed-top">
          <div className="container">
            <Link className="navbar-brand" to={"/sign-in"}>
              S&S Book Store
            </Link>

            <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link className="nav-link" to={"/booklist"}>
                    BookList
                  </Link>
                </li>
                <div
                  className="collapse navbar-collapse"
                  id="navbarTogglerDemo02"
                >
                  <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                      <Link className="nav-link" to={"/admin"}>
                        Admin
                      </Link>
                    </li>
                    <div
                      className="collapse navbar-collapse"
                      id="navbarTogglerDemo02"
                    >
                      <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                          <Link className="nav-link" to={"/sign-in"}>
                            Login
                          </Link>
                        </li>
                        <li className="nav-item">
                          <Link className="nav-link" to={"/sign-up"}>
                            Sign up
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </ul>
                </div>
              </ul>
            </div>
          </div>
        </nav>

        <div className="auth-wrapper">
          <Switch>
            <Route exact path="/" component={Login} />
            <Route
              path="/sign-in"
              render={props => (
                <Login {...props} changeLoginStatus={setUserLogin} />
              )}
            ></Route>
            <Route path="/sign-up" component={SignUp} />

            {userLogin && <Route path="/admin" component={Admin} />}
          </Switch>
        </div>

        <Switch>
          {userLogin && <Route path="/booklist" component={BookList} />}
          <Route path="/editbook/:bookid" component={EditBook} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
