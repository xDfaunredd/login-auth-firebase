import { useSelector } from "react-redux";
import { useAppDispatch } from "../../redux/store";
import { deleteTask, openModal, setCurrentTask } from "../../redux/tasks/slice";
import { getFirestore, doc, deleteDoc } from "firebase/firestore";
import { selectID } from "../../redux/auth/selectors";

type Props = {
  task: {
    taskName: string;
    id: string;
  };
};

const TaskItem = ({ task }: Props) => {
  const userId = useSelector(selectID);
  const dispatch = useAppDispatch();
  const db = getFirestore();

  async function handleClick() {
    console.log("User ID:", userId);
    console.log("Deleting task ID:", task.id);
    try {
      await deleteDoc(doc(db, "users", userId, "tasks", task.id));

      dispatch(deleteTask(task.id));
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  }

  function handleEdit() {
    dispatch(openModal());
    dispatch(setCurrentTask(task));
  }
  return (
    <li className="flex gap-2 border-cyan-900 border-1 justify-between w-[500px]">
      <p>{task.taskName}</p>
      <button className="btn" onClick={handleEdit}>
        edit
      </button>
      <button className="btn" onClick={handleClick}>
        delete
      </button>
    </li>
  );
};

export default TaskItem;
