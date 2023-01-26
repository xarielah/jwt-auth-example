import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectUser } from "../app/authSlice";
import Button from "../components/elements/button";

const HomePage = () => {
  const loggedUser = useSelector(selectUser);

  return (
    <section className="w-full max-w-[700px] flex flex-col space-y-12 px-3 py-6">
      <img
        className="w-full mx-auto h-52 md:h-64 object-cover rounded-xl shadow"
        src="https://images.unsplash.com/photo-1567206563064-6f60f40a2b57?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80"
      />
      <h1 className="text-4xl md:text-4xl font-bold text-center text-slate-800">
        Your Daily Gelato!
      </h1>
      <p className="font-light text-center text-2xl md:text-3xl">
        In our secret factory we've found the magical dairy treat formula that
        you need to have in each day of the week for the rest of your life!
      </p>
      {loggedUser ? (
        <>
          <p className="font-light text-center text-2xl md:text-3xl">
            Dear{" "}
            <span className="text-pink-800 font-bold">
              {loggedUser.slice(0, 1).toUpperCase() + loggedUser.slice(1)}
            </span>
            {"!, "}
            we have been waiting for you for so long! thank you for joining us.
            Below you can click on the button and join us to hold the daily
            dairy secret.
          </p>

          <div className="flex items-center justify-center">
            <Link to="/icecream">
              <Button value={"Get Your Gelato!"} className="w-max px-12" />
            </Link>
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center space-y-3">
          <p className="font-light text-center text-2xl md:text-3xl">
            Only authorized users can access the Getalo's secrets.
          </p>
          <Link to="/auth/login">
            <Button value={"Go Login!"} />
          </Link>
        </div>
      )}
    </section>
  );
};

export default HomePage;
