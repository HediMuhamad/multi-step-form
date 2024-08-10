import { PeriodType } from "@/types/period-type";

export const plans = {
  arcade: {
    icon: "/assets/icon-arcade.svg",
    [PeriodType.MONTHLY]: 9,
    [PeriodType.YEARLY]: 90,
    yearlyFreeMonths: 2,
  },
  advanced: {
    icon: "/assets/icon-advanced.svg",
    [PeriodType.MONTHLY]: 12,
    [PeriodType.YEARLY]: 120,
    yearlyFreeMonths: 2,
  },
  pro: {
    icon: "/assets/icon-pro.svg",
    [PeriodType.MONTHLY]: 15,
    [PeriodType.YEARLY]: 150,
    yearlyFreeMonths: 2,
  },
};
