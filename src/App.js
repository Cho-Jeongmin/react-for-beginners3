import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./routes/Home";
import Detail from "./routes/Detail";
import List from "./routes/List";
import { RecoilRoot } from "recoil";

function App() {
  return (
    <RecoilRoot>
      <Router basename={process.env.PUBLIC_URL}>
        <Switch>
          <Route path="/">
            <Home />
          </Route>
          <Route path="/page/:detail/:num">
            <List />
          </Route>
          <Route path="/movie/:id">
            <Detail />
          </Route>
        </Switch>
      </Router>
    </RecoilRoot>
  );
}

export default App;
