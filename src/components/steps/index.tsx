import {
  ADD_ONS,
  CONTACT_NUMBER,
  EMAIL_ADDRESS,
  FULL_NAME,
  PERIOD,
  PLAN,
} from "@/constants/field-name";
import { useStepper } from "@/store/stepper";
import { Form } from "@/types/form";
import { PeriodType } from "@/types/period-type";
import { PlanType } from "@/types/plan-type";
import { yupResolver } from "@hookform/resolvers/yup";
import phone from "phone";
import { FormProvider, useForm } from "react-hook-form";
import * as yup from "yup";
import { AddOns } from "./add-ons";
import { PersonalInfoStep } from "./personal-info";
import { SelectPlan } from "./select-plan";
import { Summary } from "./summary";

export const Steps = () => {
  const { currentStep, maxStep, nextStep, setIsSubmitted } = useStepper();

  const form = useForm<Form>({
    resolver: yupResolver(schema(currentStep) as any),
    mode: "onBlur",
    defaultValues: {
      period: PeriodType.MONTHLY,
    },
  });

  const handleSubmit = () => {
    currentStep === maxStep ? setIsSubmitted() : nextStep();
  };

  return (
    <form
      id="mainForm"
      onSubmit={form.handleSubmit(handleSubmit)}
      className="h-full w-full"
    >
      <FormProvider {...form}>
        {currentStep === 0 && <PersonalInfoStep />}
        {currentStep === 1 && <SelectPlan />}
        {currentStep === 2 && <AddOns />}
        {currentStep === 3 && <Summary />}
      </FormProvider>
    </form>
  );
};

const schema = (step: number) =>
  yup.object().shape({
    ...(step === 0
      ? {
          [FULL_NAME]: yup.string().required(),
          [EMAIL_ADDRESS]: yup.string().email().required(),
          [CONTACT_NUMBER]: yup
            .string()
            .required()
            ?.test((v) => phone(v?.trim()?.replace(" ", ""))?.isValid),
        }
      : {}),

    ...(step === 1
      ? {
          [PLAN]: yup.string().oneOf(Object.values(PlanType)).required(),
          [PERIOD]: yup.string().oneOf(Object.values(PeriodType)).required(),
        }
      : {}),

    ...(step === 2
      ? {
          [ADD_ONS]: yup.array().of(yup.string()).nullable(),
        }
      : {}),
  });
