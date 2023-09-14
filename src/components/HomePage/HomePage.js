// import MailEditor from "../SideBar/Compose/Editor/Editor";
// import {BrowserRouter as Router, Switch, Route } from "react-router-dom/cjs/react-router-dom";

import Sidebar from "../SideBar/Sidebar";

const HomePage = () => {
  return (
    <div>
        <Sidebar />

      {/* <Router>
      <Switch>
        <Route path='/home/compose'>
          <MailEditor />
        </Route>
      </Switch>
      </Router> */}
    </div>
  );
};

export default HomePage;
