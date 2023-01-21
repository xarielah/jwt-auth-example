interface IErrorSubmitProps {
  errorMessage: string;
}

const ErrorSubmit = ({ errorMessage }: IErrorSubmitProps) => {
  return (
    <div className="text-sm text-center p-3 border-[1px] border-blue-600 rounded-xl bg-white/50 font-bold text-blue-600">
      {errorMessage}
    </div>
  );
};

export default ErrorSubmit;
