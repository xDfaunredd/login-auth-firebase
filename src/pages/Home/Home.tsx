import { useSelector } from "react-redux";

import { selectEmail, selectName } from "../../redux/auth/selectors";
import FromAdd from "../../components/FromAdd/FromAdd";
import TaskList from "../../components/TaskList/TaskList";
import CreateTodoList from "../../components/CreateTodoList/CreateTodoList";
import TaskItemsList from "../../components/TaskItemList/TaskItemList";

const Home = () => {
  const userEmail = useSelector(selectEmail);
  const username = useSelector(selectName);

  return (
    <>
      <h1 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-transform text-4xl">
        Hello {username}, <span className="text-fuchsia-700 ">{userEmail}</span>
      </h1>

      <CreateTodoList />

      <TaskItemsList />
      <FromAdd />
      <TaskList />
    </>
  );
};

export default Home;
