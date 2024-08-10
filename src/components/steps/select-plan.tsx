import { PERIOD, PLAN } from "@/constants/field-name";
import { plans } from "@/constants/plans";
import { PeriodType } from "@/types/period-type";
import { PlanType } from "@/types/plan-type";
import { periodShortener } from "@/utils/period-shortner";
import Image from "next/image";
import { FC } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { Switch } from "../ui/switch";
import { Headline } from "./components/headline";

export const SelectPlan = () => {
  const { watch } = useFormContext();
  console.log(watch());

  return (
    <div className={`flex flex-col gap-y-14`}>
      <Headline
        header="Select your plan"
        description="You have the option of monthly or yearly billing."
      />
      <div className="flex flex-col gap-y-8">
        <ControlledPlanCard types={Object.values(PlanType)} />
        <div className="flex flex-row justify-center items-center gap-x-2 w-full h-16 bg-slate-50 rounded-lg">
          Monthly
          <ControlledSwitch
            name={PERIOD}
            values={{
              false: PeriodType.MONTHLY,
              true: PeriodType.YEARLY,
            }}
          />
          Yearly
        </div>
      </div>
    </div>
  );
};

interface PlanCardProps {
  type: PlanType;
  period: PeriodType;
  isSelected?: boolean;
  onClick?: () => void;
}

const PlanCard: FC<PlanCardProps> = ({
  type,
  period,
  isSelected,
  onClick: handleClick,
}) => {
  const periodText = periodShortener(period);
  const price = plans?.[type]?.[period];

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`flex flex-col flex-1 gap-y-24 p-6 justify-between  border border-slate-300 rounded-lg hover:bg-slate-50 hover:border-blue-300 cursor-pointer transition-all ${
        isSelected ? "bg-blue-50 border-blue-200" : ""
      }`}
    >
      <Image
        src={plans[type]?.icon}
        alt={type + "-icon"}
        width={64}
        height={64}
      />
      <div>
        <h2 className="text-2xl font-medium capitalize text-start">{type}</h2>
        <p className="font-light text-slate-900/50 mt-1 text-start">
          ${price + " / " + periodText}
        </p>
        {period === PeriodType.YEARLY && (
          <p className="font-light text-slate-900/700 text-start">
            {plans[type]?.yearlyFreeMonths} months free
          </p>
        )}
      </div>
    </button>
  );
};

const ControlledPlanCard: FC<{ types: Array<PlanType> }> = ({ types }) => {
  const period = useFormContext()?.watch(PERIOD);

  return (
    <Controller
      name={PLAN}
      render={({ field, fieldState }) => (
        <div className="flex flex-col gap-y-4">
          <div className="flex flex-row flex-wrap justify-between gap-6">
            {types?.map((type) => (
              <PlanCard
                key={type}
                period={period}
                type={type}
                isSelected={field?.value === type}
                onClick={() => {
                  field.onChange(type);
                  field.onBlur();
                }}
              />
            ))}
          </div>
          <div
            className={`${
              fieldState.error ? "block" : "hidden"
            } flex items-center px-4 py-3 bg-red-50 text-red-500 rounded-lg capitalize`}
          >
            {fieldState.error?.message}
          </div>
        </div>
      )}
    />
  );
};

const ControlledSwitch = ({
  name,
  values,
}: {
  name: string;
  values?: { true?: string; false?: string };
}) => {
  const { true: trueValue, false: falseValue } = {
    true: true,
    false: false,
    ...values,
  };

  return (
    <Controller
      name={name}
      render={({ field }) => (
        <Switch
          value={field.value}
          onClick={() =>
            field.onChange(field.value === trueValue ? falseValue : trueValue)
          }
        />
      )}
    />
  );
};
