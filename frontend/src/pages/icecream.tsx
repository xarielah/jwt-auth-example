import { useEffect, useState } from "react";
import useAxiosPrivate from "../hooks/use-axios-private";
import { useNavigate } from "react-router-dom";

type IceCream = {
  name: string;
  description: string;
  img: string;
};

const IceCreamPage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [todaysIceCream, setTodaysIceCream] = useState<IceCream | null>(null);
  const axiosPrivate = useAxiosPrivate();

  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    let isMounted = true;
    const controller = new AbortController();

    const getDailyCookie = async () => {
      try {
        const response = await axiosPrivate
          .get("/icecream", {
            signal: controller.signal,
          })
          .finally(() => setIsLoading(false));

        isMounted && setTodaysIceCream(response.data);
      } catch (error) {
        console.error(error);
        navigate("/auth/login");
      }
    };

    getDailyCookie();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  if (isLoading && !todaysIceCream)
    return (
      <section className="font-bold text-2xl italic text-slate-800">
        Freezing some cream...
      </section>
    );
  else
    return (
      <section className="flex max-w-5xl items-center justify-center flex-col space-y-8 text-center">
        <img
          src={todaysIceCream?.img}
          className="w-64 h-64 object-cover rounded-full shadow-md"
        />
        <h1 className="text-4xl md:text-5xl font-bold text-slate-800">
          {todaysIceCream?.name}
        </h1>
        <p className="text-2xl md:text-3xl px-3 font-light">
          {todaysIceCream?.description}
        </p>
      </section>
    );
};

export default IceCreamPage;
