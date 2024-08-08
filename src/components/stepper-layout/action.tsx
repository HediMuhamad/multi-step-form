import { steps } from "@/constants/steps";
import { useStepper } from "@/store/stepper";
import { Button } from "../buttons";

const maxSteps = steps.length - 1;
export const Action = () => {
  const { currentStep } = useStepper();

  return (
    <div className="flex  w-full justify-end items-center">
      {currentStep !== 0 && <Button variant="text">back</Button>}
      <Button
        variant="contained"
        className="ml-auto"
        type="submit"
        form="mainForm"
      >
        next step
      </Button>
    </div>
  );
};
