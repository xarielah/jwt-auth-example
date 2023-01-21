interface IFormFieldErrorProps {
  errorMessage: string;
}

const FormFieldError = (props: IFormFieldErrorProps) => {
  return (
    <div className="text-red-500">
      {props.errorMessage.slice(0, 1).toUpperCase() +
        props.errorMessage.slice(1)}
    </div>
  );
};

export default FormFieldError;
