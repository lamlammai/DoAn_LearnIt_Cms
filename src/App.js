import { Suspense } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Skeleton } from "antd";
import { createBrowserHistory } from "history";
import PrivateRoute from "./routes/PrivateRouter";
// routes
import RoutePage from "./routes/Roots";
import { getItem } from "./utils/storage";
// others
export const history = createBrowserHistory();
/**
 * App change smt
 */
export default function App() {
  const user = getItem("user") ? JSON.parse(getItem("user")) : {};
  console.log(user);
  return (
    <>
      <Router>
        <Suspense fallback={<Skeleton />}>
          <Switch>
            {RoutePage.map((route) =>
              route.authen ? (
                <PrivateRoute
                  key={route.path}
                  path={route.path}
                  exact={route.exact}
                  component={route.component}
                />
              ) : (
                <Route
                  key={route.path}
                  path={route.path}
                  exact={route.exact}
                  component={route.component}
                />
              )
            )}
          </Switch>
        </Suspense>
      </Router>
    </>
  );
}
