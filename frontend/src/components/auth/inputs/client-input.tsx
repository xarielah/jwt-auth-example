import { InputHTMLAttributes } from "react";
import { RefCallBack } from "react-hook-form/dist/types";

interface IClientInputProps {
  reference: RefCallBack;
}

const ClientInput = (
  props: IClientInputProps & InputHTMLAttributes<HTMLInputElement>
) => {
  const { className, reference, ...restProps } = props;
  return (
    <input
      {...restProps}
      ref={reference}
      className={`shadow-sm text-slate-800 font-bold p-3 text-xl border-[1px] border-gray-200/20 ${
        className ?? ""
      }`}
    />
  );
};

export default ClientInput;
