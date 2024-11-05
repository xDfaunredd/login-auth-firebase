import { collection, addDoc, getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { Field, Form, Formik, FormikHelpers } from "formik";
import { useAppDispatch } from "../../redux/store";
import { addNewItemToData, setTaskListId } from "../../redux/tasks/slice";
import { useSelector } from "react-redux";
import { selectTaskListId } from "../../redux/tasks/selectors";

type InitialValues = {
  listName: string;
};

const initialValues: InitialValues = {
  listName: "",
};

const CreateTodoList = () => {
  const taskId = useSelector(selectTaskListId);
  const dispatch = useAppDispatch();
  async function addNewListForUser(
    values: InitialValues,
    actions: FormikHelpers<InitialValues>
  ) {
    const db = getFirestore();
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      const userId = user.uid;

      try {
        const newList = await addDoc(collection(db, "lists"), {
          userId: userId,
          title: values.listName,
          createdAt: new Date(),
        });

        const newItem = {
          userId: userId,
          title: values.listName,
          createdAt: new Date(),
        };

        dispatch(addNewItemToData(newItem));
        dispatch(setTaskListId(newList.id));
      } catch (error) {
        console.error("Помилка при створенні списку задач:", error);
      }
    } else {
      console.log("Користувач не залогінений");
    }

    actions.resetForm();
  }

  return (
    <Formik initialValues={initialValues} onSubmit={addNewListForUser}>
      <Form>
        <label>
          <Field name="listName" className="input input-bordered" />
        </label>
        <button type="submit" className="btn">
          Add List
        </button>
      </Form>
    </Formik>
  );
};

export default CreateTodoList;
