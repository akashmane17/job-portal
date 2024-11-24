import { useField } from "formik";

const Input = (props) => {
  const [field, meta] = useField(props);
  const { name, required, label, ...inputProps } = props;

  return (
    <>
      <label
        className={`${
          required ? "required" : ""
        } mb-2.5 block font-medium text-primary `}
      >
        {label}
      </label>
      <div className="relative mb-1">
        <input
          className={`w-full ${
            meta?.touched && meta.error ? "border-error" : "border-stroke"
          } rounded-lg border bg-transparent py-2 pl-4 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none`}
          {...field}
          {...inputProps}
          autoComplete="off"
          name={name}
        />
      </div>
      {meta?.touched && meta.error && <p className="input-err">{meta.error}</p>}
    </>
  );
};

export default Input;
