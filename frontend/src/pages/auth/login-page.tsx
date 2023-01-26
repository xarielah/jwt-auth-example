import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { axiosClient } from "../../service/axios.service";
import { Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import ClientInput from "../../components/auth/inputs/client-input";
import ErrorSubmit from "../../components/auth/form/error-submit";
import Button from "../../components/elements/button";
import FormFieldError from "../../components/auth/form/form-field-error";
import AuthLayout from "../../components/layouts/auth-layout";
import * as yup from "yup";
import { setUser } from "../../app/authSlice";
import Cookies from "js-cookie";

type LoginFields = {
  username: string;
  password: string;
};

const schema = yup
  .object({
    username: yup.string().required(),
    password: yup.string().required(),
  })
  .required();

const LoginPage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [success, setSuccess] = useState<boolean>(false);

  const dispatch = useDispatch();

  const {
    handleSubmit,
    register,
    resetField,
    formState: { errors },
  } = useForm<LoginFields>({ resolver: yupResolver(schema) });

  const { ref: usernameRef, ...usernameRest } = register("username");
  const { ref: passwordRef, ...passwordRest } = register("password");

  const onsubmit = async (data: LoginFields) => {
    setIsLoading(true);
    setErrorMessage("");

    try {
      const response = await axiosClient
        .post("/auth/login", data, { withCredentials: true })
        .finally(() => {
          setIsLoading(false);
          resetField("password");
        });

      Cookies.set("token", response.data.accessToken);

      dispatch(setUser({ username: response.data.username }));
      setSuccess(true);
    } catch (error) {
      setErrorMessage((error as any).response.data.message);
    }
  };

  return (
    <AuthLayout>
      <form
        noValidate
        onSubmit={handleSubmit(onsubmit)}
        className="bg-white/20 p-8 shadow-sm min-h-[400px] min-w-[400px]"
      >
        <h1 className="text-center font-bold text-slate-800 text-3xl mb-4">
          Login
        </h1>
        {success ? (
          <Navigate to="/icecream" />
        ) : (
          <div className="flex flex-col space-y-6">
            {errorMessage ? <ErrorSubmit errorMessage={errorMessage} /> : ""}
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
            <Button isLoading={isLoading} value="Login!" type="submit" />
          </div>
        )}
      </form>
    </AuthLayout>
  );
};

export default LoginPage;
