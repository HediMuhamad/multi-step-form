import { useState } from "react";
import { Checkbox } from "../ui/checkbox";
import { Headline } from "./components/headline";

export const AddOns = () => {
  const [selectedAddOns, setSelectedAddOns] = useState<AddOnType[]>();

  return (
    <div className={`flex flex-col gap-y-14`}>
      <Headline
        header="Pick add-ons"
        description="Add-ons help enhance your gaming experience."
      />
      <div className="flex flex-col justify-between gap-y-6">
        {Object.values(AddOnType).map((type) => (
          <AddOnCard
            key={type}
            type={type}
            isSelected={selectedAddOns?.includes(type)}
            onClick={() =>
              setSelectedAddOns((prev) =>
                prev?.includes(type)
                  ? prev.filter((t) => t !== type)
                  : [...(prev || []), type]
              )
            }
          />
        ))}
      </div>
    </div>
  );
};

const AddOnCard = ({
  type,
  isSelected,
  onClick: handleClick,
}: {
  type: AddOnType;
  isSelected?: boolean;
  onClick?: () => void;
}) => {
  const period = "year";
  const postfix = period === "year" ? "yr" : "mo";
  const value = addons?.[type]?.[period];

  return (
    <button
      onClick={handleClick}
      className={`flex flex-row items-center transition-all w-full gap-x-8 min-h-28 p-8 hover:bg-blue-50 hover:border-blue-100 rounded-lg border border-slate-500/20 ${
        isSelected ? "border-blue-300 bg-blue-50" : ""
      }`}
    >
      <Checkbox className="w-6 h-6 rounded-md" checked={isSelected} />
      <div className="flex flex-col gap-y-1 flex-1 text-start">
        <div className="text-lg font-semibold">{addons[type].name}</div>
        <div className="text-slate-500">{addons[type].description}</div>
      </div>
      <div className="text-blue-700">
        +${value}/{postfix}
      </div>
    </button>
  );
};

enum AddOnType {
  ONLINE_SERVICE = "online_service",
  LARGER_STORAGE = "larger_storage",
  CUSTOMIZABLE_PROFILE = "customizable_profile",
}

const addons = {
  [AddOnType.ONLINE_SERVICE]: {
    name: "Online Service",
    description: "Access to multiplayer games.",
    year: 10,
    month: 1,
  },
  [AddOnType.LARGER_STORAGE]: {
    name: "Larger Storage",
    description: "Extra 1TB of cloud save",
    year: 20,
    month: 2,
  },
  [AddOnType.CUSTOMIZABLE_PROFILE]: {
    name: "Customizable Profile",
    description: "Custom theme on your profile.",
    year: 20,
    month: 2,
  },
};
