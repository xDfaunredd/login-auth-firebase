import { useEffect } from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { useSelector } from "react-redux";

import { useAppDispatch } from "../../redux/store";
import { setTasks } from "../../redux/tasks/slice";
import { selectTaskListId, selectTasks } from "../../redux/tasks/selectors";
import TaskItem from "../TaskItem/TaskItem";

const TaskList = () => {
  const dispatch = useAppDispatch();
  const tasks = useSelector(selectTasks);
  const taskId = useSelector(selectTaskListId);

  useEffect(() => {
    const fetchTasks = async () => {
      console.log("tasklisstID", taskId);

      if (taskId) {
        /////  /////  /////  /////  /////  /////

        const db = getFirestore();
        const tasksCollection = collection(db, "lists", taskId, "listItems");
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
  }, [dispatch, taskId]);

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
