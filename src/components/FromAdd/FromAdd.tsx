import { Field, Form, Formik, FormikHelpers } from "formik";
import { useAppDispatch } from "../../redux/store";
import { addTask } from "../../redux/tasks/slice";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import toast from "react-hot-toast";

type InitialValues = {
  taskName: string;
  id: string;
};

const initialValues: InitialValues = {
  taskName: "",
  id: "",
};

const FromAdd = () => {
  const dispatch = useAppDispatch();
  const auth = getAuth();
  const db = getFirestore();

  async function handleSubmit(
    values: InitialValues,
    actions: FormikHelpers<InitialValues>
  ) {
    const user = auth.currentUser;

    if (user) {
      try {
        const docFer = await addDoc(
          collection(db, "users", user.uid, "tasks"),
          {
            taskName: values.taskName,
          }
        );

        const newTask = {
          id: docFer.id,
          taskName: values.taskName,
        };

        dispatch(addTask(newTask));

        toast.success("Task added successfully!");
      } catch (error) {
        console.error("Error adding task to Firestore:", error);
        toast.error("Failed to add task!");
      }
    } else {
      toast.error("You must be logged in to add tasks.");
    }

    actions.resetForm();
  }

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      <Form className="flex gap-2 items-baseline">
        <Field
          type="text"
          name="taskName"
          placeholder="Type here"
          className="input input-bordered w-full max-w-xs mt-2 "
        />
        <button className="btn btn-outline" type="submit">
          Add task
        </button>
      </Form>
    </Formik>
  );
};

export default FromAdd;
