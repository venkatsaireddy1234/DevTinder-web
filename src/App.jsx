import { BrowserRouter, Route, Routes } from "react-router";
import Body from "./components/Body";
import Login from "./components/Login";
import Profile from "./components/Profile";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import Feed from "./components/Feed";
import Connections from "./components/Connections";
import Requests from "./components/Requests";

function App() {
  return (
    <>
      <Provider store={appStore}>
        <BrowserRouter basename="/">
          <Routes>
            <Route
              path={"/"}
              element={
                <div>
                  <Body />
                </div>
              }
            >
              <Route
                path={"/"}
                element={
                  <div>
                    <Feed />
                  </div>
                }
              />
              <Route
                path={"/login"}
                element={
                  <div>
                    <Login />
                  </div>
                }
              />
              <Route
                path={"/profile"}
                element={
                  <div>
                    <Profile />
                  </div>
                }
              />
              <Route
                path={"/connections"}
                element={
                  <div>
                    <Connections />
                  </div>
                }
              />
              <Route
                path={"/requests"}
                element={
                  <div>
                    <Requests/>
                  </div>
                }
              />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
