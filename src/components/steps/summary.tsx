import { addons } from "@/constants/add-ons";
import { plans } from "@/constants/plans";
import { useStepper } from "@/store/stepper";
import { Form } from "@/types/form";
import { periodShortener } from "@/utils/period-shortner";
import Image from "next/image";
import { ReactNode } from "react";
import { useFormContext } from "react-hook-form";
import { Headline } from "./components/headline";

export const Summary = () => {
  const { isSubmitted } = useStepper();

  return !isSubmitted ? (
    <div className={`flex flex-col gap-y-14`}>
      <Headline
        header="Finishing up"
        description="Double-check everything looks OK before confirming."
      />
      <div className="flex flex-col ">
        <div className="flex flex-col justify-start rounded-lg bg-slate-50 w-full px-10 py-5">
          <PlanRow />
          <hr className="border border-stone-200 w-full my-4" />
          <AddOnsList />
        </div>
        <SummaryRow />
      </div>
    </div>
  ) : (
    <div className="h-full w-full flex flex-col justify-center items-center gap-y-6">
      <Image
        src="/assets/icon-thank-you.svg"
        alt="succeed"
        width={100}
        height={100}
      />
      <h1 className="text-5xl font-bold mt-4">Thank you!</h1>
      <p className="text-center text-xl font-light leading-8">
        Thanks for confirming your subscription! We hope you have fun using out
        platform. If you ever need support, please feel free to email us at
        hedymuhamad481@protonmail.com
      </p>
    </div>
  );
};

const SubmissionCongratulation = () => {
  return <div></div>;
};

const PlanRow = () => {
  const { getValues } = useFormContext<Form>();
  const { setStep } = useStepper();

  const { plan: selectedPlan, period: selectedPeriod } = getValues();

  return (
    <Row
      label={
        <div className="flex flex-col justify-center h-fit">
          <div className="capitalize font-bold text-blue-900">
            {selectedPlan} ({selectedPeriod})
          </div>
          <button
            type="button"
            onClick={() => setStep(1)}
            className="text-stone-700/50 underline text text-start"
          >
            Change
          </button>
        </div>
      }
      value={
        <div className="font-bold text-blue-950">
          ${plans?.[selectedPlan]?.[selectedPeriod]}/
          {periodShortener(selectedPeriod)}
        </div>
      }
    />
  );
};

const AddOnsList = () => {
  const { getValues } = useFormContext<Form>();

  const { period: selectedPeriod, addOns: selectedAddons } = getValues();

  const addOnsRows = selectedAddons?.map((addOnName, index) => {
    const name = addons?.[addOnName]?.name;
    const price = addons?.[addOnName]?.[selectedPeriod];

    const priceInText = `$${price}/${periodShortener(selectedPeriod)}`;

    return {
      label: name,
      price,
      priceInText,
    };
  });

  return (
    <>
      {addOnsRows?.map(({ label, priceInText }) => (
        <Row
          key={label}
          label={label}
          value={priceInText}
          labelClassName="text-slate-500"
          valueClassName="font-bold"
        />
      ))}
    </>
  );
};

const SummaryRow = () => {
  const { getValues } = useFormContext<Form>();

  const {
    plan: selectedPlan,
    period: selectedPeriod,
    addOns: selectedAddons,
  } = getValues();

  const planPrice = plans[selectedPlan]?.[selectedPeriod];
  const addonsTotal =
    selectedAddons?.reduce(
      (prev, curr) => prev + addons[curr]?.[selectedPeriod],
      0
    ) ?? 0;

  const total = planPrice + addonsTotal;

  return (
    <div className="px-10 mt-5">
      <Row
        label="Total"
        value={`+$${total}/${periodShortener(selectedPeriod)}`}
        labelClassName="text-slate-500"
        valueClassName="font-bold text-blue-500 text-2xl"
      />
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
  <div className="flex flex-row justify-between items-center py-3 text-xl">
    <div className={labelClassName + "text-slate-500 text-inherit h-fit"}>
      {label}
    </div>
    <div className={valueClassName + "text-slate-900 text-inherit h-fit"}>
      {value}
    </div>
  </div>
);
