import { ReactNode } from "react";
import { Headline } from "./components/headline";

export const Summary = () => {
  const selectedPlan = "Pro";

  const rows = {
    plan: {
      label: (
        <div className="flex flex-col justify-center h-fit">
          <div>Arcade (Monthly)</div>
          <button className="text-stone-700/50 underline text text-start">
            Change
          </button>
        </div>
      ),

      value: <div className="font-bold">$9/mo</div>,
    },
    addons: [
      {
        label: "Online Services",
        value: "+$1/mo",
      },
      {
        label: "Larger Storage",
        value: "+$2/mo",
      },
    ],
  };

  return (
    <div className={`flex flex-col gap-y-14`}>
      <Headline
        header="Finishing up"
        description="Double-check everything looks OK before confirming."
      />
      <div className="flex flex-col ">
        <div className="flex flex-col justify-start rounded-lg bg-slate-50 w-full px-10 py-5">
          <Row label={rows?.plan?.label} value={rows?.plan?.value} />
          <hr className="border border-stone-200 w-full my-2" />
          {rows?.addons?.map((addon, index) => (
            <Row
              key={index}
              label={addon.label}
              value={addon.value}
              labelClassName="text-slate-500"
              valueClassName="font-bold"
            />
          ))}
        </div>
        <div className="px-10 mt-5">
          <Row
            label="Total"
            value="$12/mo"
            labelClassName="text-slate-500"
            valueClassName="font-bold text-blue-500"
          />
        </div>
      </div>
    </div>
  );
};

const Row = ({
  label,
  value,
  labelClassName = "",
  valueClassName = "",
}: {
  label: ReactNode;
  value: ReactNode;
  labelClassName?: string;
  valueClassName?: string;
}) => (
  <div className="flex flex-row justify-between items-center py-3">
    <div className={"text-slate-500 text-xl h-fit" + labelClassName}>
      {label}
    </div>
    <div className={"text-slate-900 text-xl h-fit" + valueClassName}>
      {value}
    </div>
  </div>
);
