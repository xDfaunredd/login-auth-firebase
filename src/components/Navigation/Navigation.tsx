import clsx from "clsx";
import { NavLink } from "react-router-dom";
import { selectIsLogged } from "../../redux/auth/selectors";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../redux/store";
import { removeUser } from "../../redux/auth/slice";
import toast from "react-hot-toast";
import { deleteAllTasks } from "../../redux/tasks/slice";

type IsActive = {
  isActive: boolean;
};

const Navigation = () => {
  const isLoggedIn = useSelector(selectIsLogged);
  const dispatch = useAppDispatch();

  const buildLinkClass = ({ isActive }: IsActive) => {
    return clsx(
      "inline-block pt-5 pb-5  pr-5 pl-5",
      isActive && " text-slate-300"
    );
  };
  return (
    <div className="flex justify-between items-center pl-2 pr-2">
      <nav className="flex justify-between">
        <NavLink to="/" className={buildLinkClass}>
          Home
        </NavLink>
        {isLoggedIn ? (
          ""
        ) : (
          <>
            {" "}
            <NavLink to="/login" className={buildLinkClass}>
              Login
            </NavLink>
            <NavLink to="/singUp" className={buildLinkClass}>
              Sing Up
            </NavLink>
          </>
        )}
      </nav>

      {isLoggedIn ? (
        <button
          className="border rounded w-20 h-10 text-slate-300 bg-slate-500"
          onClick={() => {
            dispatch(removeUser());
            dispatch(deleteAllTasks());
            toast.success("Successfully Logged Out!");
          }}
        >
          Log Out
        </button>
      ) : (
        ""
      )}
    </div>
  );
};

export default Navigation;
