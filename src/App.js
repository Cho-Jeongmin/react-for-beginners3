import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./routes/Home";
import List from "./routes/List";
import Detail from "./routes/Detail";
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from "recoil";

function App() {
  return (
    <RecoilRoot>
      <Router basename={process.env.PUBLIC_URL}>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/page/:detail/:num" element={<List />}></Route>
          <Route path="/movie/:id" element={<Detail />}></Route>
        </Routes>
      </Router>
    </RecoilRoot>
  );
}

export default App;
