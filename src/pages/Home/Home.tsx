import { useSelector } from "react-redux";

import { selectEmail } from "../../redux/auth/selectors";

const Home = () => {
  const userEmail = useSelector(selectEmail);

  return (
    <>
      <h1 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-transform text-4xl">
        Hello user, <span className="text-fuchsia-700 ">{userEmail}</span>
      </h1>
    </>
  );
};

export default Home;
