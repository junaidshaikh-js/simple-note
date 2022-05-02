type validateFormArgs = {
  email: string;
  password: string;
};

export const validateForm = (loginFormValues: validateFormArgs) => {
  const { email, password } = loginFormValues;
  const errors = {
    email: "",
    password: "",
  };

  if (!email) {
    errors.email = "Invalid email address";
  }

  if (!password) {
    errors.password = "Invalid password";
  }

  if (password.length < 8) {
    errors.password = "password must be 8 characters long";
  }

  return errors;
};
