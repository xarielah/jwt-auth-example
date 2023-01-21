import Cookies from "js-cookie";
import { ReactNode, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

interface IAuthLayoutProps {
  children: ReactNode;
}

const AuthLayout = ({ children }: IAuthLayoutProps) => {
  const navigate = useNavigate();

  useEffect(() => {
    /**
     * Gets token from cookie.
     */
    const token = Cookies.get("token");

    /**
     * If there is a token (any token, valid or invalid)
     * Navigate to index. when accessing a protected route,
     * The authorization process will do the rest of the work.
     */
    if (token) {
      navigate("/");
    }
  }, []);
  const pathname = window.location.pathname;

  const signup = <Link to="/auth/signup">signup</Link>;
  const login = <Link to="/auth/login">login</Link>;

  return (
    <main>
      {children}
      <div className="text-center my-4 font-bold text-slate-600">
        <span>
          You can{" "}
          <span className="text-blue-900 hover:text-blue-500 duration-300 ease-in-out">
            {pathname.endsWith("login") ? signup : login}
          </span>{" "}
          and join us!
        </span>
      </div>
    </main>
  );
};

export default AuthLayout;
