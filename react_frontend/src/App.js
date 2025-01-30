import styles from "./App.module.css";
import NavBar from "./components/NavBar";
import Container from "react-bootstrap/Container";
import { Route, Switch } from "react-router-dom";

function App() {
  return (
    <div className={styles.App}>
      <NavBar />
      <Container className={styles.Main}>
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
              <p>Sign up page</p>
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
      </Container>
    </div>
  );
}

export default App;
