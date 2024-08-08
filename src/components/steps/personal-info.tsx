import { FC } from "react";
import { Headline } from "./components/headline";

export const PersonalInfoStep = () => {
  return (
    <div className={`flex flex-col gap-y-14`}>
      <Headline
        header="Personal Info"
        description="Please provide your name, email address and phone number"
      />
      <div className="flex flex-col gap-y-6">
        <Field label="Full name" name="fullName" placeholder="e.g. John Sina" />
        <Field
          label="Email address"
          name="emailAddress"
          placeholder="e.g. JohnSina@example.com"
        />
        <Field
          label="Contact number"
          name="contactNumber"
          placeholder="e.g. +799 123 4567"
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
}

const Field: FC<FieldProps> = ({ label, name, placeholder, error }) => {
  return (
    <div className="flex flex-col text-lg gap-y-2">
      <div className="flex flex-row justify-between">
        <label className="capitalize">{label}</label>
        {error && <p className="text-end text-red-500">{error}</p>}
      </div>
      <input
        placeholder={placeholder}
        name={name}
        style={{ borderWidth: 1 }}
        className="border-slate-300 hover:border-blue-200 active:outline-blue-300 focus-visible:outline-blue-300 border-spacing-1 py-3 px-5 rounded-md"
      />
    </div>
  );
};
