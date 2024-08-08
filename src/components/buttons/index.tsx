import { ButtonHTMLAttributes, DetailedHTMLProps, FC } from "react";

type ButtonProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  variant: "contained" | "text";
};

const styles = {
  contained: "bg-blue-950 text-slate-100",
  text: "text-blue-950",
};

export const Button: FC<ButtonProps> = (props) => {
  return (
    <button
      {...props}
      className={`${props?.className} py-4 px-8 capitalize rounded-lg ${
        styles[props.variant]
      }`}
    />
  );
};
