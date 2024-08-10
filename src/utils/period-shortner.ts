import { PeriodType } from "@/types/period-type";

export const periodShortener = (type: PeriodType) =>
  type === PeriodType?.YEARLY ? "yr" : "mo";
