import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
import ModalForm from "../ModalForm/ModalForm";

const AppBar = () => {
  return (
    <>
      <Header />
      <ModalForm />

      <Outlet />
    </>
  );
};

export default AppBar;
