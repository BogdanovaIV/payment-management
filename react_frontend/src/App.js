import styles from "./App.module.css";
import NavBar from "./components/NavBar";
import { Route, Switch } from "react-router-dom";
import "./api/axiosDefaults";
import SignUpForm from "./pages/auth/SignUpForm";

import "./styles/variables.css";

function App() {
  return (
    <div className={styles.App}>
      <NavBar />
      <div className={styles.Main}>
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <p>Home page</p>
            )}
          />
          <Route
            exact
            path="/signin"
            render={() => (
              <p>Sign in page</p>
            )}
          />
          <Route
            exact
            path="/signup"
            render={() => (
              <SignUpForm />
            )}
          />
          <Route
            exact
            path="/signout"
            render={() => (
              <p>Sign out page</p>
            )}
          />                    
          <Route render={() => (<p>Not found</p>)} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
