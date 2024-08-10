import { FC } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { Headline } from "./components/headline";

export const PersonalInfoStep = () => {
  const form = useFormContext();

  return (
    <div className={`flex flex-col gap-y-14`}>
      <Headline
        header="Personal Info"
        description="Please provide your name, email address and phone number"
      />
      <div className="flex flex-col gap-y-6">
        <ControlledField
          label="Full name"
          name="fullName"
          placeholder="e.g. John Sina"
        />
        <ControlledField
          label="Email address"
          name="emailAddress"
          placeholder="e.g. JohnSina@example.com"
        />
        <ControlledField
          label="Contact number"
          name="contactNumber"
          placeholder="e.g. +964 799 123 4567"
        />
      </div>
    </div>
  );
};

interface FieldProps {
  name: string;
  label: string;
  placeholder?: string;
  error?: string;
  onChange?: (e: any) => void;
  onBlur?: (e: any) => void;
  defaultValue?: string;
}

const Field: FC<FieldProps> = ({
  label,
  name,
  placeholder,
  error,
  onBlur,
  onChange,
  defaultValue,
}) => {
  return (
    <div className="flex flex-col text-lg gap-y-2">
      <div className="flex flex-row justify-between">
        <label className="capitalize">{label}</label>
        {error && <p className="text-end text-red-500">{error}</p>}
      </div>
      <input
        defaultValue={defaultValue}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        name={name}
        style={{ borderWidth: 1 }}
        className="border-slate-300 hover:border-blue-200 active:outline-blue-300 focus-visible:outline-blue-300 border-spacing-1 py-3 px-5 rounded-md"
      />
    </div>
  );
};

const ControlledField: FC<FieldProps> = ({ label, name, placeholder }) => (
  <Controller
    name={name}
    render={({ field, fieldState }) => (
      <Field
        {...field}
        defaultValue={field.value}
        error={fieldState?.error?.message}
        label={label}
        placeholder={placeholder}
      />
    )}
  />
);
