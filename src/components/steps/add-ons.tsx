import { addons, AddOnType } from "@/constants/add-ons";
import { ADD_ONS, PERIOD } from "@/constants/field-name";
import { PeriodType } from "@/types/period-type";
import { periodShortener } from "@/utils/period-shortner";
import { Check } from "lucide-react";
import { memo, MouseEventHandler } from "react";
import { Controller, useWatch } from "react-hook-form";
import { Headline } from "./components/headline";

export const AddOns = memo(function AddOnComponent() {
  return (
    <div className={`flex flex-col gap-y-14`}>
      <Headline
        header="Pick add-ons"
        description="Add-ons help enhance your gaming experience."
      />
      <div className="flex flex-col justify-between gap-y-6">
        {Object.values(AddOnType).map((addOn) => (
          <ControlledAddOn key={addOn} addon={addOn} />
        ))}
      </div>
    </div>
  );
});

const AddOnCard = ({
  addOn,
  isSelected,
  onClick: handleClick,
}: {
  addOn: AddOnType;
  isSelected?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}) => {
  const period: PeriodType = useWatch({ name: PERIOD });
  const postfix = periodShortener(period);
  const value = addons?.[addOn]?.[period];

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`flex flex-row items-center transition-all w-full gap-x-8 min-h-28 p-8 hover:bg-blue-50 hover:border-blue-100 rounded-lg border border-slate-500/20 ${
        isSelected ? "border-blue-300 bg-blue-50" : ""
      }`}
    >
      <Checkbox isChecked={isSelected} />
      <div className="flex flex-col gap-y-1 flex-1 text-start">
        <div className="text-lg font-semibold">{addons[addOn].name}</div>
        <div className="text-slate-500">{addons[addOn].description}</div>
      </div>
      <div className="text-blue-700">
        +${value}/{postfix}
      </div>
    </button>
  );
};

const ControlledAddOn = ({ addon }: { addon: AddOnType }) => (
  <Controller
    name={ADD_ONS}
    render={({ field, fieldState, formState }) => {
      const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();

        const prev = (field.value ?? []) as AddOnType[];
        let result = [];

        if (prev.includes(addon)) {
          result = prev.filter((t) => t !== addon);
        } else {
          result = [...prev, addon];
        }

        field.onChange(result);
        field.onBlur();
      };

      return (
        <AddOnCard
          addOn={addon}
          isSelected={field.value?.includes(addon)}
          onClick={handleClick}
        />
      );
    }}
  />
);

export const Checkbox = ({ isChecked }: { isChecked?: boolean }) => {
  const bgStyle = isChecked ? "bg-blue-900" : "bg-transparent";

  return (
    <div
      className={` flex justify-center items-center border border-slate-500 rounded-sm w-[20px] aspect-square ${bgStyle}`}
    >
      <Check size={"80%"} className="text-slate-50" />
      <input type="checkbox" className="hidden" checked={isChecked} />
    </div>
  );
};
