import { useStepper } from "@/store/stepper";
import { Button } from "../buttons";

export const Action = () => {
  const { currentStep, prevStep, isLastStep, isSubmitted } = useStepper();

  if (isSubmitted) return <></>;

  return (
    <div className="flex w-full justify-end items-center">
      {currentStep !== 0 && (
        <Button variant="text" onClick={prevStep}>
          back
        </Button>
      )}
      <Button
        variant="contained"
        className={`ml-auto  ${isLastStep() ? "!bg-blue-800" : ""}`}
        type="submit"
        form="mainForm"
      >
        {isLastStep() ? "Submit" : "Next Step"}
      </Button>
    </div>
  );
};
