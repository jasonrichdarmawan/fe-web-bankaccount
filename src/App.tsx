import React, { lazy, Suspense, useEffect } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  login,
  logout,
  selectIsLoggedIn,
} from "./features/authorization/authorizationSlice";
import jwt_decode from "jwt-decode";

function App() {
  const isAdmin = sessionStorage.getItem("admin");

  const [isLoading, setIsLoading] = React.useState(true);

  const isLoggedIn = useSelector(selectIsLoggedIn);
  const dispatch = useDispatch();

  useEffect(() => {
    // decode and check if token has expired.
    let token = sessionStorage.getItem("token");
    if (token != null) {
      const decoded: { exp: number } = jwt_decode(token);
      if (decoded.exp - Date.now() / 1000 > 0) {
        dispatch(login());
      } else {
        sessionStorage.clear();
      }

      // auto logout
      setTimeout(() => {
        dispatch(logout());
      }, decoded.exp * 1000 - Date.now());
    }

    setIsLoading(false);
  }, [dispatch]);

  function withSuspense(
    WrappedComponent: React.LazyExoticComponent<() => JSX.Element>
  ) {
    return (
      <Suspense fallback={<div>Loading...</div>}>
        <WrappedComponent />
      </Suspense>
    );
  }

  const Register = lazy(() => import("./components/register/register"));
  const Login = lazy(() => import("./components/login/login"));

  const AdminLogin = lazy(() => import("./components/admin/login/login"));

  const TwoColumnsLayout = lazy(() => import("./layout/twocolumns/twocolumns"));

  const Home = lazy(() => import("./components/home/home"));
  const History = lazy(() => import("./components/history/history"));
  const Transfer = lazy(() => import("./components/transfer/transfer"));
  const Balance = lazy(() => import("./components/balance/balance"));

  const AdminTransfer = lazy(
    () => import("./components/admin/transfer/transfer")
  );

  if (isLoading) return <div>Loading...</div>;

  return (
    <>
      {!isLoggedIn ? (
        <>
          <Switch>
            <Route
              exact
              path="/register"
              render={() => withSuspense(Register)}
            />
            <Route exact path="/login" render={() => withSuspense(Login)} />
            <Route
              exact
              path="/admin/login"
              render={() => withSuspense(AdminLogin)}
            />
            <Route>
              <Redirect to="/login" />
            </Route>
          </Switch>
        </>
      ) : (
        <>
          <Switch>
            <Route path="/">
              <Suspense fallback="<div>Loading...</div>">
                <TwoColumnsLayout>
                  <Switch>
                    <Route exact path="/" render={() => withSuspense(Home)} />
                    <Route
                      exact
                      path="/history/:Start?/:End?"
                      render={() => withSuspense(History)}
                    />
                    <Route
                      exact
                      path="/transfer"
                      render={() => withSuspense(Transfer)}
                    />
                    <Route
                      exact
                      path="/balance"
                      render={() => withSuspense(Balance)}
                    />
                    {isAdmin === "true" && (
                      <Route
                        exact
                        path="/admin/transfer"
                        render={() => withSuspense(AdminTransfer)}
                      />
                    )}
                    <Route>
                      <Redirect to="/" />
                    </Route>
                  </Switch>
                </TwoColumnsLayout>
              </Suspense>
            </Route>
          </Switch>
        </>
      )}
    </>
  );
}

export default App;
