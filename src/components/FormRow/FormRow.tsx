import { FaInfoCircle } from "react-icons/fa";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";

type FormRowProps = {
  id: string;
  labelText: string;
  inputType: string;
  placeholder: string;
  value: string;
  changeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  inputError: string;
  isPasswordVisible?: boolean;
  handleShowPassword?: () => void;
};

export const FormRow = ({
  id,
  labelText,
  inputType,
  placeholder,
  value,
  changeHandler,
  inputError,
  isPasswordVisible,
  handleShowPassword,
}: FormRowProps) => {
  return (
    <div className="my-5">
      <label htmlFor={id} className="field-required block my-2 text-lg">
        {labelText}
      </label>

      {inputType !== "password" ? (
        <input
          className="p-2 rounded text-base w-full border border-black"
          type={inputType}
          placeholder={placeholder}
          id={id}
          value={value}
          onChange={changeHandler}
          required
        />
      ) : (
        <div className="relative">
          <input
            type={isPasswordVisible ? "text" : "password"}
            className="p-2 rounded text-base w-full border border-black"
            placeholder="**************"
            id={id}
            value={value}
            onChange={changeHandler}
            required
          />

          <span
            className="absolute top-2.5	right-2.5 cursor-pointer"
            onClick={handleShowPassword}
          >
            {isPasswordVisible ? (
              <AiFillEye fontSize="1.5rem" />
            ) : (
              <AiFillEyeInvisible fontSize="1.5rem" />
            )}
          </span>
        </div>
      )}

      {inputError && (
        <span className="flex items-center my-2 text-red-700">
          <FaInfoCircle className="mr-3" />
          {inputError}
        </span>
      )}
    </div>
  );
};
