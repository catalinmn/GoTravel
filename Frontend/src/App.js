import React, { Component } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Countries from "./components/countries";
import Cities from "./components/cities";
import Locations from "./components/locations";
import Wishlist from "./components/wishlist";
import Homepage from "./components/homepage";
import MovieForm from "./components/movieForm";
import NotFound from "./components/notFound";
import NavBar from "./components/navBar";
import LoginForm from "./components/loginForm";
import RegisterForm from "./components/registerForm";
import Logout from "./components/logout";
import ProtectedRoute from "./components/common/protectedRoute";
import auth from "./services/authService";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

class App extends Component {
  state = {};

  componentDidMount() {
    const user = auth.getCurrentUser();
    this.setState({ user });
  }

  render() {
    const { user } = this.state;

    return (
      <React.Fragment>
        <ToastContainer />
        <div className="wrapper">
          <NavBar user={user} />
          <main className="container">
            <Switch>
              <Route path="/register" component={RegisterForm} />
              <Route path="/login" component={LoginForm} />
              <Route path="/logout" component={Logout} />
              <Route
                path="/countries"
                render={(props) => <Countries {...props} user={this.state.user} />}
              />
              <Route
                path="/cities"
                render={(props) => <Cities {...props} user={this.state.user} />}
              />
              <Route
                path="/country/cities"
                render={(props) => <Cities {...props} user={this.state.user} />}
              />
              <Route
                path="/city/locations"
                render={(props) => <Locations {...props} user={this.state.user} />}
              />
              <Route
                path="/wishlist"
                render={(props) => <Wishlist {...props} user={this.state.user} />}
              />
              <Route
                path="/homepage"
                render={(props) => <Homepage {...props} user={this.state.user} />}
              />

              <ProtectedRoute path="/movies/:id" component={MovieForm} />

              <Route path="/not-found" component={NotFound} />
              <Redirect from="/" exact to="/homepage" />
              <Redirect to="/not-found" />
            </Switch>
          </main>
        </div>
      </React.Fragment>
    );
  }
}

export default App;
