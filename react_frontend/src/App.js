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
import UserPasswordForm from "./pages/userProfiles/UserPassword";
import PartnersPage from "./pages/partners/PartnersPage";
import AddPartnerPage from "./pages/partners/AddPartnerPage";
import ViewPartnerPage from "./pages/partners/ViewPartnerPage";
import EditPartnerPage from "./pages/partners/EditPartnerPage";
import DeletePartnerPage from "./pages/partners/DeletePartnerPage";
import PaymentRequestsPage from "./pages/paymentRequest/PaymentRequestsPage";
import AddPaymentRequestPage from "./pages/paymentRequest/AddPaymentRequestPage";
import ViewPaymentRequestPage from "./pages/paymentRequest/ViewPaymentRequestPage";
import EditPaymentRequestPage from "./pages/paymentRequest/EditPaymentRequestPage";
import DeletePaymentRequestPage from "./pages/paymentRequest/DeletePaymentRequestPage";
import NotFound from "./components/NotFound";

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
          <Route
            exact
            path="/user-profiles/:id/edit/password"
            render={() => <UserPasswordForm />}
          />
          <Route exact path="/partners" render={() => <PartnersPage />} />
          <Route exact path="/partners/add" render={() => <AddPartnerPage />} />
          <Route
            exact
            path="/partners/:id/edit"
            render={() => <EditPartnerPage />}
          />
          <Route
            exact
            path="/partners/:id/delete"
            render={() => <DeletePartnerPage />}
          />
          <Route
            exact
            path="/partners/:id"
            render={() => <ViewPartnerPage />}
          />
          <Route
            exact
            path="/payment-request"
            render={() => <PaymentRequestsPage />}
          />
          <Route
            exact
            path="/payment-request/add"
            render={() => <AddPaymentRequestPage />}
          />
          <Route
            exact
            path="/payment-request/:id/edit"
            render={() => <EditPaymentRequestPage/>}
          />
          <Route
            exact
            path="/payment-request/:id/delete"
            render={() => <DeletePaymentRequestPage />}
          />
          <Route
            exact
            path="/payment-request/:id"
            render={() => <ViewPaymentRequestPage />}
          />
          <Route render={() => <NotFound />} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
