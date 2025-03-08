import SignUp from "./components/SignUp";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import { Route, Switch, Redirect } from "react-router-dom";

function App() {
  return (
    <>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/signup" component={SignUp} />
        <Route path="/dashboard" component={Dashboard} />
        <Redirect from="/" to="/login" />
      </Switch>
    </>
  );
}

export default App;
