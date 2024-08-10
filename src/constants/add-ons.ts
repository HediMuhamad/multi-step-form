import { PeriodType } from "@/types/period-type";

export enum AddOnType {
  ONLINE_SERVICE = "online_service",
  LARGER_STORAGE = "larger_storage",
  CUSTOMIZABLE_PROFILE = "customizable_profile",
}

export const addons = {
  [AddOnType.ONLINE_SERVICE]: {
    name: "Online Service",
    description: "Access to multiplayer games.",
    [PeriodType.YEARLY]: 10,
    [PeriodType.MONTHLY]: 1,
  },
  [AddOnType.LARGER_STORAGE]: {
    name: "Larger Storage",
    description: "Extra 1TB of cloud save",
    [PeriodType.YEARLY]: 20,
    [PeriodType.MONTHLY]: 2,
  },
  [AddOnType.CUSTOMIZABLE_PROFILE]: {
    name: "Customizable Profile",
    description: "Custom theme on your profile.",
    [PeriodType.YEARLY]: 20,
    [PeriodType.MONTHLY]: 2,
  },
};
