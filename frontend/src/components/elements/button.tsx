import { ButtonHTMLAttributes } from "react";
import Spinner from "./spinner";

interface IButtonProps {
  isLoading?: boolean;
}

const Button = (
  props: ButtonHTMLAttributes<HTMLButtonElement> & IButtonProps
) => {
  const { value, className, isLoading, ...restButtonProps } = props;
  return (
    <button
      disabled={isLoading}
      className={`w-full bg-blue-400 font-bold text-2xl p-3 text-white shadow-xl rounded-full hover:bg-blue-500 duration-300 ease-in-out ${
        className ?? ""
      }`}
      {...restButtonProps}
    >
      {isLoading ? <Spinner /> : value}
    </button>
  );
};

export default Button;
