import { useState } from "react";
import { Link } from "react-router-dom";
import { FaChevronCircleRight } from "react-icons/fa";

import { Header, FormRow, PrimaryBtn, Loader } from "../../components";
import { validateForm } from "./utils";
import {
  ChangeEvent,
  FormEvent,
  SetFormValues,
  SignupFormErrorsType,
} from "./signup.types";
import { useAuth } from "../../context";

export const Signup = () => {
  const initialState = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const [signupFormValues, setSignupFormValues] = useState(initialState);
  const [signupFormErrors, setSignupFormErrors] =
    useState<SignupFormErrorsType>({} as SignupFormErrorsType);
  const [passwordVisibility, setPasswordVisibility] = useState({
    password: false,
    confirmPassword: false,
  });

  const { createUser, loading } = useAuth();

  const handleChange = (e: ChangeEvent, setSignupFormValues: SetFormValues) => {
    const { id, value } = e.target;
    setSignupFormValues((values) => ({
      ...values,
      [id]: value,
    }));
  };

  const handlevisibility = (value: string) => {
    value === "password"
      ? setPasswordVisibility((v) => ({ ...v, password: !v.password }))
      : setPasswordVisibility((v) => ({
          ...v,
          confirmPassword: !v.confirmPassword,
        }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const errors = validateForm(signupFormValues);

    setSignupFormErrors(errors);

    for (let value of Object.values(errors)) {
      if (value !== "") return;
    }

    createUser(signupFormValues.email, signupFormValues.password);
  };

  return (
    <>
      <Header />

      <div className="wrapper flex justify-center items-center">
        <main className="bg-white form-wrapper p-5  rounded">
          <form className="my-5" onSubmit={(e) => handleSubmit(e)}>
            <FormRow
              id="firstName"
              labelText="First Name"
              inputType="text"
              placeholder="John"
              value={signupFormValues.firstName}
              changeHandler={(e: ChangeEvent) =>
                handleChange(e, setSignupFormValues)
              }
              inputError={signupFormErrors.firstName}
            />

            <FormRow
              id="lastName"
              labelText="Last Name"
              inputType="text"
              placeholder="Doe"
              value={signupFormValues.lastName}
              changeHandler={(e: ChangeEvent) =>
                handleChange(e, setSignupFormValues)
              }
              inputError={signupFormErrors.lastName}
            />

            <FormRow
              id="email"
              labelText="Email Address"
              inputType="email"
              placeholder="johndoe@gmail.com"
              value={signupFormValues.email}
              changeHandler={(e: ChangeEvent) =>
                handleChange(e, setSignupFormValues)
              }
              inputError={signupFormErrors.email}
            />

            <FormRow
              id="password"
              labelText="Password"
              inputType="password"
              placeholder="***********"
              value={signupFormValues.password}
              changeHandler={(e: ChangeEvent) =>
                handleChange(e, setSignupFormValues)
              }
              inputError={signupFormErrors.password}
              isPasswordVisible={passwordVisibility.password}
              handleShowPassword={() => handlevisibility("password")}
            />

            <FormRow
              id="confirmPassword"
              labelText="Confirm Password"
              inputType="password"
              placeholder="***********"
              value={signupFormValues.confirmPassword}
              changeHandler={(e: ChangeEvent) =>
                handleChange(e, setSignupFormValues)
              }
              inputError={signupFormErrors.confirmPassword}
              isPasswordVisible={passwordVisibility.confirmPassword}
              handleShowPassword={() => handlevisibility("confirmPassword")}
            />

            <PrimaryBtn type="submit" cnames="w-full" disable={loading}>
              Create a new account
            </PrimaryBtn>
          </form>

          <div>
            <Link
              to="/login"
              className="flex justify-center items-center hover:text-primaryDark"
            >
              Already registered? <FaChevronCircleRight className="ml-4" />
            </Link>
          </div>
        </main>

        {loading && <Loader />}
      </div>
    </>
  );
};
