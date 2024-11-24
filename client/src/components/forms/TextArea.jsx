import { useField } from "formik";

const TextArea = (props) => {
  const [field, meta] = useField(props);
  const { name, label, required, ...inputProps } = props;

  return (
    <div>
      <label
        className={`${
          required ? "required" : ""
        } mb-2.5 block font-medium text-primary `}
      >
        {label}
      </label>

      <textarea
        className={`w-full ${
          meta?.touched && meta.error ? "border-error" : "border-stroke"
        } rounded-lg border bg-transparent py-2 pl-4 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none`}
        {...inputProps}
        {...field}
      />
      {meta?.touched && meta.error && <p className="input-err">{meta.error}</p>}
    </div>
  );
};

export default TextArea;
