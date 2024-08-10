import { AddOnType } from "@/constants/add-ons";
import {
  ADD_ONS,
  CONTACT_NUMBER,
  EMAIL_ADDRESS,
  FULL_NAME,
  PERIOD,
  PLAN,
} from "@/constants/field-name";
import { PeriodType } from "./period-type";
import { PlanType } from "./plan-type";

export interface Form {
  [FULL_NAME]: string;
  [EMAIL_ADDRESS]: string;
  [CONTACT_NUMBER]: string;

  [PLAN]: PlanType;
  [PERIOD]: PeriodType;

  [ADD_ONS]: AddOnType[];
}
