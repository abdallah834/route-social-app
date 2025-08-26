import { Datepicker, Label, TextInput } from "flowbite-react";
import { Controller, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import AppBtn from "../../../components/Shared/AppBtn";
import axios from "axios";
import { useState } from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import ErrorMsg from "../../../components/Shared/ErrorMsg";
///////////////////////////////////////////////////
// Creating an object of user info using useForm hook
///////////////////////////////////////////////////
// to enable zod validation
// 1-install zod & @hookform/resolvers/zod
// 2-create a schema that matches the object going to the backend
// 3-import zodresolver and z

export default function Register() {
  // schema represents the data object getting posted to the backend
  // after declaring a schema we call the zodResolver as a value inside the useForm hook using resolver destructured object
  const schema = z.object({
    name: z
      .string("name must be a letter")
      .min(3, "name must be at least 3 letters"),
    password: z
      .string()
      .min(8, "password must be at least 8 characters")
      .regex(/^[A-Z][\w]/, "password must start with a capital letter"),
    rePassword: z
      .string()
      .min(8, "password must be at least 8 characters")
      .regex(/^[A-Z][\w]/, "password must start with a capital letter")
      .refine((value) => value === getValues("password"), {
        error: "make sure passwords match",
      }),
    email: z.email(),
    dateOfBirth: z
      .string("make sure to select a date")
      .regex(/^\d{2}-\d{2}-\d{4}/, "make sure to select a valid format"),
    gender: z.literal(["male", "female"]),
  });

  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    getValues,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });
  /////////////////////////////////////////////////////////////////
  // register is an object that has to be destructered in order to contain the input values ex: {email:exapmle@example.com, password:example1213}
  // handleSubmit handles the prevent default behaviour of a form (used on form tags)
  // watch returns the value of the current characters inside of an input and can be used to set conditions to change styles ex: watch("(input's id)")
  /////////////////////////////////////////////////////////////////

  const navigate = useNavigate();
  // the handleSubmit function takes a callback function to store the registered values from the input
  async function createUser(data) {
    // console.log(watch(data));

    try {
      await axios(`${import.meta.env.VITE_BASE_URL}/users/signup`, {
        method: "POST",
        data,
      });
      setIsLoading(true);

      navigate("/login");
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <div className="form-container py-12 flex justify-center items-center min-h-[80vh] mx-4">
        <form
          onSubmit={handleSubmit(createUser)}
          className="flex flex-col gap-4 w-xl"
        >
          {/*****************Name*****************/}

          <div>
            <div className="mb-2 block">
              <Label htmlFor="name">Your name</Label>
            </div>
            <TextInput
              id="name"
              type="text"
              placeholder="Name"
              {...register("name")}
            />
            <ErrorMsg error={errors?.name?.message} />
          </div>
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
              id="password"
              type="password"
              {...register("password")}
            />
            <ErrorMsg error={errors?.password?.message} />
          </div>
          {/*****************Re-password*****************/}
          {watch("password") === "" ? (
            <div>
              <div className="mb-2 block">
                <Label htmlFor="rePassword">Confirm password</Label>
              </div>
              <TextInput
                id="rePassword"
                type="password"
                {...register("rePassword")}
                disabled
              />
              <ErrorMsg error={errors?.rePassword?.message} />
            </div>
          ) : (
            <div>
              <div className="mb-2 block">
                <Label htmlFor="rePassword">Confirm password</Label>
              </div>
              <TextInput
                id="rePassword"
                type="password"
                {...register("rePassword")}
              />
              <ErrorMsg error={errors?.rePassword?.message} />
            </div>
          )}

          {/*****************dateOfBirth*****************/}

          {/* <div>
            <div className="mb-2 block">
              <Label htmlFor="dateOfBirth">Select your date of birth</Label>
            </div>
            <TextInput
              id="dateOfBirth"
              type="date"
              {...register("dateOfBirth")}
            />
          </div> */}
          <Label htmlFor="dateOfBirth">Select your date of birth</Label>
          <Controller
            render={({ field }) => (
              <Datepicker
                // order matters field then any other attr
                {...field}
                onChange={(value) => {
                  const formattedDate = value
                    .toLocaleDateString("en-us", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    })
                    .replaceAll("/", "-");
                  field.onChange(formattedDate);
                }}
                id="dateOfBirth"
              />
            )}
            control={control}
            name="dateOfBirth"
          />
          <ErrorMsg error={errors?.dateOfBirth?.message} />

          {/*****************Gender*****************/}
          <label
            htmlFor="gender"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Gender
          </label>
          <select
            id="gender"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 
            dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            {...register("gender")}
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          <span className="text-black dark:text-white">
            got an account?
            <Link
              to={"/login"}
              className="text-cyan-800 underline underline-offset-5 ms-2 dark:text-cyan-400"
            >
              Sign in
            </Link>
          </span>
          <ErrorMsg error={errors?.gender?.message} />

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
