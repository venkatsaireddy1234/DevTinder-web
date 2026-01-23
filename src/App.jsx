import { BrowserRouter,Route,Routes } from "react-router";
import Body from "./Body";
import Login from "./Login";
import Profile from "./Profile";

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
     
      <h1 className="text-3xl font-bold">Namaste Dev Tinder UI</h1>
    </>
  );
}

export default App;
