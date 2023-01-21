import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { axiosClient } from "../../service/axios.service";
import AuthLayout from "../../components/layouts/auth-layout";
import ClientInput from "../../components/auth/inputs/client-input";
import FormFieldError from "../../components/auth/form/form-field-error";
import Button from "../../components/elements/button";
import { Link } from "react-router-dom";

type LoginFields = {
  username: string;
  password: string;
  confirmPassword: string;
};

const schema = yup
  .object({
    username: yup.string().required(),
    password: yup.string().required(),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords must match"),
  })
  .required();

const SignupPage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  const {
    handleSubmit,
    register,
    resetField,
    formState: { errors },
  } = useForm<LoginFields>({ resolver: yupResolver(schema) });

  const { ref: usernameRef, ...usernameRest } = register("username");
  const { ref: passwordRef, ...passwordRest } = register("password");
  const { ref: confirmPasswordRef, ...confirmPasswordRest } =
    register("confirmPassword");

  const onsubmit = async (data: LoginFields) => {
    setIsLoading(true);

    try {
      await axiosClient.post("/auth/signup", data).finally(() => {
        setIsLoading(false);
        resetField("password");
        resetField("confirmPassword");
      });

      setSuccess(true);
    } catch (error) {}
  };

  return (
    <AuthLayout>
      <form
        noValidate
        onSubmit={handleSubmit(onsubmit)}
        className="bg-white/20 p-8 shadow-sm min-h-[400px] min-w-[400px]"
      >
        <h1 className="text-center font-bold text-slate-800 text-3xl mb-4">
          Registration
        </h1>
        {success ? (
          <div className="flex flex-col justify-center text-slate-800 items-center space-y-6 max-w-sm">
            <h1 className="text-3xl font-light">
              You've successfully signed up!
            </h1>
            <p className="text-xl font-light text-center">
              You can now go and login to your new account and get our
              hot-special-delivery cookies suggestions!
            </p>
            <Link to="/auth/login">
              <Button
                value="Go Login!"
                className="bg-green-500 hover:bg-green-600"
              />
            </Link>
          </div>
        ) : (
          <div className="flex flex-col space-y-6">
            <div className="flex flex-col space-y-3">
              <ClientInput
                placeholder="Username"
                reference={usernameRef}
                {...usernameRest}
              />
              {errors.username?.message ? (
                <FormFieldError errorMessage={errors.username.message} />
              ) : (
                ""
              )}
            </div>
            <div className="flex flex-col space-y-1">
              <ClientInput
                type={"password"}
                placeholder="Password"
                reference={passwordRef}
                {...passwordRest}
              />
              {errors.password?.message ? (
                <FormFieldError errorMessage={errors.password.message} />
              ) : (
                ""
              )}
            </div>
            <div className="flex flex-col space-y-1">
              <ClientInput
                type={"password"}
                placeholder="Confirm Password"
                reference={confirmPasswordRef}
                {...confirmPasswordRest}
              />
              {errors.confirmPassword?.message ? (
                <FormFieldError errorMessage={errors.confirmPassword.message} />
              ) : (
                ""
              )}
            </div>
            <Button isLoading={isLoading} value="Signup!" type="submit" />
          </div>
        )}
      </form>
    </AuthLayout>
  );
};

export default SignupPage;
