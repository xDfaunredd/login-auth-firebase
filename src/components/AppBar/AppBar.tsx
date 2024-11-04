import { Outlet } from "react-router-dom";
import Header from "../Header/Header";

const AppBar = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default AppBar;
