import { useField } from "formik";

const RadioGroup = ({ label, name, required, options }) => {
  const [field, meta] = useField(name);

  return (
    <div>
      <label
        className={`flex items-center ${
          required ? "required" : ""
        } mb-2.5 block font-medium text-xl text-primary`}
      >
        {label}
      </label>
      <div className="flex items-center gap-4 mt-2 text-gray-800">
        {options.map((option) => (
          <label
            key={option.value}
            className={`flex items-center ${
              required ? "required" : ""
            } mb-2.5 block font-medium`}
          >
            <input
              type="radio"
              {...field}
              value={option.value}
              checked={field.value === option.value}
              className="mr-2 "
            />
            {option.label}
          </label>
        ))}
      </div>
      {meta.touched && meta.error && <p className="input-err">{meta.error}</p>}
    </div>
  );
};

export default RadioGroup;
