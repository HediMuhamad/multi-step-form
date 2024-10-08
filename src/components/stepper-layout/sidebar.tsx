import { steps } from "@/constants/steps";
import { useStepper } from "@/store/stepper";

export const Sidebar = () => {
  const { currentStep, setStep, isSubmitted } = useStepper();

  return (
    <nav className="flex flex-col h-full w-1/3 p-10 gap-y-8 rounded-3xl bg-[url('/assets/bg-sidebar-desktop.svg')] bg-no-repeat bg-cover">
      {steps.map((title, index) => (
        <Step
          key={title}
          title={title}
          step={index}
          active={currentStep === index}
          onClick={setStep}
          isDisabled={isSubmitted}
        />
      ))}
    </nav>
  );
};

const Step = ({
  title,
  step,
  active,
  onClick,
  isDisabled,
}: {
  title: string;
  step: number;
  active: boolean;
  onClick?: (index: number) => void;
  isDisabled?: boolean;
}) => {
  return (
    <button
      disabled={isDisabled}
      type="button"
      className={`flex gap-x-5 w-full text-slate-100 uppercase p-2 rounded-lg transition-all ${
        !isDisabled ? "hover:bg-slate-950/5" : ""
      }`}
      onClick={() => onClick?.(step)}
    >
      <div
        className={`text-md font-bold rounded-full w-12 aspect-square "border-slate-100" border-2 flex items-center justify-center transition-all ${
          active ? "bg-slate-100 text-slate-900" : ""
        }`}
      >
        <span>{step + 1}</span>
      </div>
      <div className="flex flex-col gap-y-0.5">
        <span className="text-sm text-start opacity-70">Step {step + 1}</span>
        <span className="text-md font-bold">{title}</span>
      </div>
    </button>
  );
};
