import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "../Layout/Layout";
import Login from "../../pages/Login/Login";
import SingUp from "../../pages/SingUp/SingUp";
import ErrorPage from "../../pages/ErrorPage/ErrorPage";
import Home from "../../pages/Home/Home";
import { selectIsLogged } from "../../redux/auth/selectors";
import { useSelector } from "react-redux";

function App() {
  const isLoggedIn = useSelector(selectIsLogged);
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route
            path="/"
            element={isLoggedIn ? <Home /> : <Navigate to="/login" />}
          />
          <Route
            path="login"
            element={isLoggedIn ? <Navigate to="/" /> : <Login />}
          />
          <Route
            path="singUp"
            element={isLoggedIn ? <Navigate to="/" /> : <SingUp />}
          />
        </Route>
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </>
  );
}

export default App;
