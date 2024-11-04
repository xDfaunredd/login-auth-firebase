import { Field, Form, Formik, FormikHelpers } from "formik";
import { useAppDispatch } from "../../redux/store";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { setUser } from "../../redux/auth/slice";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

type InitialValues = {
  email: string;
  password: string;
};

const initialValues: InitialValues = {
  email: "",
  password: "",
};

const Login = () => {
  const dispatch = useAppDispatch();
  const auth = getAuth();

  async function handleSubmit(
    values: InitialValues,
    actions: FormikHelpers<InitialValues>
  ) {
    console.log(values);

    try {
      const { user } = await signInWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );

      dispatch(
        setUser({
          email: user.email,
          id: user.uid,
          token: user.refreshToken,
        })
      );
      toast.success("Successfully Logged In!");
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }

    actions.resetForm();
  }
  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Login now!</h1>
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <Formik onSubmit={handleSubmit} initialValues={initialValues}>
            <Form className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <Field
                  name="email"
                  type="email"
                  placeholder="email"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <Field
                  name="password"
                  type="password"
                  placeholder="password"
                  className="input input-bordered"
                  required
                />
                <label className="label">
                  <Link to="/singUp" className="label-text-alt link link-hover">
                    Have no account? SingUp!
                  </Link>
                </label>
              </div>
              <div className="form-control mt-6">
                <button type="submit" className="btn btn-primary">
                  Login
                </button>
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Login;
