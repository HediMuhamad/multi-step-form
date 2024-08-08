import Image from "next/image";
import { FC, useState } from "react";
import { Headline } from "./components/headline";

export const SelectPlan = () => {
  const [selectedPlan, setSelectedPlan] = useState<PlanType>();
  const [selectedPeriod, setSelectedPeriod] = useState<"month" | "year">(
    "year"
  );

  return (
    <div className={`flex flex-col gap-y-14`}>
      <Headline
        header="Select your plan"
        description="You have the option of monthly or yearly billing."
      />
      <div className="flex flex-col gap-y-8">
        <div className="flex flex-row justify-between gap-x-6">
          {Object.values(PlanType).map((type) => (
            <PlanCard
              key={type}
              type={type}
              period={selectedPeriod}
              isSelected={type == selectedPlan}
              onClick={() => setSelectedPlan(type)}
            />
          ))}
        </div>
        <div className="flex flex-row justify-center items-center w-full h-16 bg-slate-50 rounded-lg">
          Monthly Yearly
        </div>
      </div>
    </div>
  );
};

enum PlanType {
  ARCADE = "arcade",
  ADVANCED = "advanced",
  PRO = "pro",
}

interface PlanCardProps {
  type: PlanType;
  period: "month" | "year";
  isSelected?: boolean;
  onClick?: () => void;
}

const PlanCard: FC<PlanCardProps> = ({
  type,
  period,
  isSelected,
  onClick: handleClick,
}) => {
  const periodText = period === "month" ? "mo" : "yr";
  const price =
    plansProps[type]?.[period === "year" ? "yearlyPlan" : "monthlyPlan"];

  return (
    <button
      onClick={handleClick}
      className={`flex flex-col flex-1 gap-y-24 p-6 justify-between  border border-slate-300 rounded-lg hover:bg-slate-50 hover:border-blue-300 cursor-pointer transition-all ${
        isSelected ? "bg-blue-50 border-blue-200" : ""
      }`}
    >
      <Image
        src={plansProps[type]?.icon}
        alt={type + "-icon"}
        width={64}
        height={64}
      />
      <div>
        <h2 className="text-2xl font-medium capitalize text-start">{type}</h2>
        <p className="font-light text-slate-900/50 mt-1 text-start">
          ${price + " / " + periodText}
        </p>
        {period === "year" && (
          <p className="font-light text-slate-900/700 text-start">
            {plansProps[type]?.yearlyFreeMonths} months free
          </p>
        )}
      </div>
    </button>
  );
};

const plansProps = {
  arcade: {
    icon: "/assets/icon-arcade.svg",
    monthlyPlan: 9,
    yearlyPlan: 90,
    yearlyFreeMonths: 2,
  },
  advanced: {
    icon: "/assets/icon-advanced.svg",
    monthlyPlan: 12,
    yearlyPlan: 120,
    yearlyFreeMonths: 2,
  },
  pro: {
    icon: "/assets/icon-pro.svg",
    monthlyPlan: 15,
    yearlyPlan: 150,
    yearlyFreeMonths: 2,
  },
};
