import MailEditor from "../Editor/Editor";
import {BrowserRouter as Router, Switch, Route } from "react-router-dom/cjs/react-router-dom";

const HomePage = () => {
  return (
    <div>
      <p>Welcome to homepage</p>
      <Router>
      <Switch>
        <Route path='/home/compose'>
          <MailEditor />
        </Route>
      </Switch>
      </Router>
    </div>
  );
};

export default HomePage;
