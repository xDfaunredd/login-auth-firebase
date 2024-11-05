// TaskList.js
import { useEffect } from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { useSelector } from "react-redux";
import { selectID } from "../../redux/auth/selectors";
import { useAppDispatch } from "../../redux/store";
import { setTasks } from "../../redux/tasks/slice";
import { selectTasks } from "../../redux/tasks/selectors";
import TaskItem from "../TaskItem/TaskItem";

const TaskList = () => {
  const dispatch = useAppDispatch();
  const tasks = useSelector(selectTasks);
  const userId = useSelector(selectID);

  useEffect(() => {
    const fetchTasks = async () => {
      if (userId) {
        /////  /////  /////  /////  /////  /////

        const db = getFirestore();
        const tasksCollection = collection(db, "users", userId, "tasks");
        const tasksSnapshot = await getDocs(tasksCollection);

        const tasksList = tasksSnapshot.docs.map((doc) => {
          console.log(doc);
          console.log(doc.id);
          console.log(doc.data());

          return {
            ...doc.data(),
            id: doc.id,
          };
        });

        /////  /////  /////  /////  /////  /////

        dispatch(setTasks(tasksList));
      }
    };

    fetchTasks();
  }, [dispatch, userId]);

  return (
    <div>
      <ul>
        {tasks.map((task) => (
          <TaskItem key={task.id} task={task} />
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
