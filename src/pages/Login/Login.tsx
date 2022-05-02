import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaChevronCircleRight } from "react-icons/fa";

import { PrimaryBtn, Header, FormRow } from "../../components";
import { validateForm } from "./utils/utils";

export const Login = () => {
  const initialState = {
    email: "",
    password: "",
  };

  const [loginFormValues, setLoginFormValues] = useState(initialState);
  const [loginFormErrors, setLoginFormErrors] = useState(initialState);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setLoginFormValues: React.Dispatch<
      React.SetStateAction<{
        email: string;
        password: string;
      }>
    >
  ) => {
    const { id, value } = e.target;

    setLoginFormValues((l) => ({ ...l, [id]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const errors = validateForm(loginFormValues);

    setLoginFormErrors(errors);
  };

  return (
    <>
      <Header />

      <div className="wrapper flex justify-center items-center">
        <main className="bg-white form-wrapper p-5  rounded">
          <form onSubmit={(e) => handleSubmit(e)} className="my-5">
            <FormRow
              id="email"
              labelText="Email"
              inputType="email"
              placeholder="johndoe@gmail.com"
              value={loginFormValues.email}
              changeHandler={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleChange(e, setLoginFormValues)
              }
              inputError={loginFormErrors.email}
            />

            <FormRow
              id="password"
              labelText="Password"
              inputType="password"
              placeholder="**************"
              value={loginFormValues.password}
              changeHandler={(e) => handleChange(e, setLoginFormValues)}
              inputError={loginFormErrors.password}
              isPasswordVisible={isPasswordVisible}
              handleShowPassword={() => setIsPasswordVisible((i) => !i)}
            />

            <PrimaryBtn type="submit" cnames="w-full">
              Login
            </PrimaryBtn>
          </form>

          <div>
            <Link
              to="/signup"
              className="flex justify-center items-center hover:text-primaryDark"
            >
              Create a new account! <FaChevronCircleRight className="ml-4" />
            </Link>
          </div>
        </main>
      </div>
    </>
  );
};
