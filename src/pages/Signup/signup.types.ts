export type ChangeEvent = React.ChangeEvent<HTMLInputElement>;

export type FormEvent = React.FormEvent<HTMLFormElement>;

export type SetFormValues = React.Dispatch<
  React.SetStateAction<{
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
  }>
>;

export type SignupFormErrorsType = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};
