import styles from "./App.module.css";
import NavBar from "./components/NavBar";
import { Route, Switch } from "react-router-dom";
import "./api/axiosDefaults";
import "./styles/variables.css";

import SignUpForm from "./pages/auth/SignUpForm";
import SignInForm from "./pages/auth/SignInForm";
import SignOutForm from "./pages/auth/SignOutForm";
import Home from "./pages/home/Home";
import UserProfilePage from "./pages/userProfiles/UserProfilePage";
import UserProfileEditForm from "./pages/userProfiles/UserProfileEditForm";

function App() {
  return (
    <div className={styles.App}>
      <NavBar />
      <div className={styles.Main}>
        <Switch>
          <Route exact path="/" render={() => <Home />} />
          <Route exact path="/signin" render={() => <SignInForm />} />
          <Route exact path="/signup" render={() => <SignUpForm />} />
          <Route exact path="/signout" render={() => <SignOutForm />} />
          <Route
            exact
            path="/user-profiles/:id"
            render={() => <UserProfilePage />}
          />
          <Route
            exact
            path="/user-profiles/:id/edit"
            render={() => <UserProfileEditForm />}
          /> 
          <Route render={() => <p>Not found</p>} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
