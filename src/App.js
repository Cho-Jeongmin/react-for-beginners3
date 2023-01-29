import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Detail from "./routes/Detail";
import Home from "./routes/Home";
import { RecoilRoot } from "recoil";

function App() {
  return (
    <RecoilRoot>
      <Router basename={process.env.PUBLIC_URL}>
        <Switch>
          <Route path="/movie/:id">
            <Detail />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    </RecoilRoot>
  );
}

export default App;
