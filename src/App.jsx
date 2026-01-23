import { BrowserRouter,Route,Routes } from "react-router";
import Body from "./components/Body";
import Login from "./components/Login";
import Profile from "./components/Profile";

function App() {
  return (
    <>
      <BrowserRouter basename="/">
        <Routes>
          <Route path={"/"} element={<div><Body /></div>}>
          <Route path={"/login"} element={<div><Login /></div>} />
          <Route path={"/profile"} element={<div><Profile /></div>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
