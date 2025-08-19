import { Button, Checkbox, Label, TextInput } from "flowbite-react";
// import { Link, NavLink } from "react-router";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import axios from "axios";
import AppBtn from "../../../components/Shared/AppBtn";
import { useContext, useState } from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import ErrorMsg from "../../../components/Shared/ErrorMsg";
import { userContext } from "../../../context/Context";

const schema = z.object({
  email: z.email(),
  password: z
    .string()
    .min(8, "password must be atleast 8 characters")
    .regex(/^[A-Z][\w]/, "passowrd must start with a capital letter"),
});
export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const { getUserData } = useContext(userContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });
  const navigate = useNavigate();
  // storing the data from handlesubmit function from useForm hook in a parameter and sending it to the backend.
  // receiving the token after submitting the data to the backend
  const [errorInfo, setErrorInfo] = useState(null);
  async function createUser(value) {
    try {
      const { data } = await axios(
        `${import.meta.env.VITE_BASE_URL}/users/signin`,
        {
          method: "POST",
          data: value,
        }
      );
      setErrorInfo(null);
      setIsLoading(true);
      localStorage.setItem("token", data?.token);
      getUserData(data?.token);
      navigate("/");
    } catch (error) {
      setIsLoading(false);
      error.response.data.error && setErrorInfo("Incorrect email or password");
      console.error(error);
    }
  }

  return (
    <>
      <div className="form-container min-w-md flex justify-center items-center min-h-[80vh]">
        <form
          onSubmit={handleSubmit(createUser)}
          className="flex flex-col gap-4 min-w-lg"
        >
          {/*****************Email*****************/}
          <div>
            <div className="mb-2 block">
              <Label htmlFor="email1">Your email</Label>
            </div>
            <TextInput
              id="email1"
              type="email"
              placeholder="name123@example.com"
              {...register("email")}
            />
            <ErrorMsg error={errors?.email?.message} />
          </div>
          {/*****************Password*****************/}

          <div>
            <div className="mb-2 block">
              <Label htmlFor="password1">Your password</Label>
            </div>
            <TextInput
              id="password1"
              type="password"
              {...register("password")}
            />
            <ErrorMsg error={errors?.password?.message} />
          </div>

          <span className="text-black dark:text-white">
            Don't have an account?
            <Link
              to={"/register"}
              className="text-cyan-800 underline underline-offset-5 ms-2 dark:text-cyan-400"
            >
              Sign up
            </Link>
          </span>

          <span className="text-red-600 text-center font-bold">
            {errorInfo}
          </span>
          <AppBtn
            type="submit"
            className="transition cursor-pointer duration-300"
            isLoading={isLoading}
          >
            Submit
          </AppBtn>
        </form>
      </div>
    </>
  );
}
