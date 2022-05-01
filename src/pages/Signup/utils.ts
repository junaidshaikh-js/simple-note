type signupFormValueType = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export const validateForm = (signupFormValues: signupFormValueType) => {
  const { firstName, lastName, email, password, confirmPassword } =
    signupFormValues;
  const errors = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  if (!firstName) {
    errors.firstName = "Enter valid first name.";
  }

  if (!lastName) {
    errors.lastName = "Enter valid last name.";
  }

  if (!email) {
    errors.email = "Enter valid email.";
  }

  if (!password) {
    errors.password = "Enter valid password";
  }

  if (password.length < 8) {
    errors.password = "password must be 8 characters long";
  }

  if (password !== confirmPassword) {
    errors.confirmPassword = "Password doesn't match.";
  }

  return errors;
};
