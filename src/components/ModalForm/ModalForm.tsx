import ReactModal from "react-modal";

import s from "./ModalForm.module.css";

import { useAppDispatch } from "../../redux/store";
import { useSelector } from "react-redux";
import { selectCurrentTask, selectIsOpen } from "../../redux/tasks/selectors";
import { closeModal, editTask } from "../../redux/tasks/slice";
import { Field, Form, Formik, FormikHelpers } from "formik";
import { doc, getFirestore, updateDoc } from "firebase/firestore";

import { selectID } from "../../redux/auth/selectors";
import toast from "react-hot-toast";

ReactModal.setAppElement("#root");

type InitialValues = {
  taskName: string;
  id: string;
};

const initialValues: InitialValues = {
  taskName: "",
  id: "",
};

const ModalForm = () => {
  const dispatch = useAppDispatch();
  const isOpen = useSelector(selectIsOpen);
  const currentTask = useSelector(selectCurrentTask);
  const userId = useSelector(selectID);

  const db = getFirestore();

  async function handleSubmit(
    values: InitialValues,
    action: FormikHelpers<InitialValues>
  ) {
    if (values.taskName.trim() === "") {
      toast.error("Enter some value");
      return;
    }
    const taskRef = doc(db, "users", userId, "tasks", currentTask.id);

    // Оновлюємо поле taskName
    await updateDoc(taskRef, {
      taskName: values.taskName,
    });

    dispatch(editTask({ ...currentTask, taskName: values.taskName }));

    dispatch(closeModal());

    console.log(values);
    console.log(currentTask.id);

    action.resetForm();
  }

  return (
    <>
      <div>
        <ReactModal
          isOpen={isOpen}
          closeTimeoutMS={250}
          preventScroll={true}
          onRequestClose={() => dispatch(closeModal())}
          shouldCloseOnOverlayClick={true}
          shouldCloseOnEsc={true}
          className={s.modalContent}
          overlayClassName={s.modalOverlay}
        >
          <Formik initialValues={initialValues} onSubmit={handleSubmit}>
            <Form className="rounded-[10px] flex flex-col items-center justify-center p-[20px] gap-[20px] bg-slate-400 w-[300px] h-[300px]">
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
        </ReactModal>
      </div>
    </>
  );
};

export default ModalForm;
