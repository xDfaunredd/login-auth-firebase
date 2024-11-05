import { useEffect } from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { query, where } from "firebase/firestore";

import { useAppDispatch } from "../../redux/store";
import { useSelector } from "react-redux";
import { selectTasksTitleData } from "../../redux/tasks/selectors";
import { getAuth } from "firebase/auth";
import { addNewItemToData } from "../../redux/tasks/slice";

const TaskItemsList = () => {
  const auth = getAuth();
  const user = auth.currentUser;

  const items = useSelector(selectTasksTitleData);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchTasks = async () => {
      if (!user || !user.uid) {
        console.error("User not logged in or user ID is missing");
        return;
      }

      const db = getFirestore();
      const tasksCollection = collection(db, "lists");
      const q = query(tasksCollection, where("userId", "==", user.uid));
      console.log(user.uid);

      const querySnapshot = await getDocs(q);
      const tasksData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      dispatch(addNewItemToData(tasksData));
    };

    fetchTasks();
  }, [dispatch, user]);

  return (
    <ul>
      {items.length > 0 ? (
        items.map((item) => <li key={item.id}>{item.title}</li>)
      ) : (
        <li>No lists found</li>
      )}
    </ul>
  );
};

export default TaskItemsList;
