import { Link } from "react-router-dom";
import Button from "../components/elements/button";

const HomePage = () => {
  return (
    <section className="w-full max-w-[700px] flex flex-col space-y-12">
      <img
        className="w-full mx-auto h-64 object-cover rounded-xl shadow"
        src="https://images.unsplash.com/photo-1567206563064-6f60f40a2b57?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80"
      />
      <h1 className="text-7xl font-bold text-center text-slate-800">
        Headline
      </h1>
      <p className="font-light text-center text-3xl">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Officia quae
        maxime qui quia rem sapiente enim voluptatem quaerat eaque? Perferendis
        eum neque blanditiis. Minus officia magnam recusandae. Corrupti,
        pariatur laboriosam.
      </p>

      <div className="flex items-center justify-center">
        <Link to="/icecream">
          <Button
            value={"Get Your Daily Gelato Recommendation!"}
            className="w-max px-12"
          />
        </Link>
      </div>
    </section>
  );
};

export default HomePage;
