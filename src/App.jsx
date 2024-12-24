import React, { createContext, useContext, useEffect, useState } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
export const ThemeContext = createContext(null);

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [theme, setTheme] = useState("light");
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state?.token) {
      setToken(location.state.token);
    }
  }, [navigate]);
  useEffect(function () {
    if (localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
    } else {
      navigate("/login");
    }
  }, []);
  useEffect(
    function () {
      const body = document.body;
      if (theme === "light") {
        body.classList.remove("dark");
        body.classList.add("light");
      } else {
        body.classList.remove("light");
        body.classList.add("dark");
      }
    },
    [theme]
  );
  function PrivateRoute({ isAuth, children }) {
    if (!isAuth) {
      navigate("/login");
    }
    return children;
  }
  return (
    <div>
      <ThemeContext.Provider value={{ theme, setTheme }}>
        <Routes>
          <Route
            index
            element={
              <PrivateRoute isAuth={!!token}>
                <Home></Home>
              </PrivateRoute>
            }
          ></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
        </Routes>
      </ThemeContext.Provider>
    </div>
  );
}

export default App;
