import { steps } from "@/constants/steps";
import { create } from "zustand";

type StepperState = {
  currentStep: number;
  nextStep: () => void;
  prevStep: () => void;
  setStep: (step: number) => void;
  isNextDisabled: boolean;
  setIsNextDisabled: (value: boolean) => void;
};

export const useStepper = create<StepperState>((set, get) => ({
  currentStep: 0,
  nextStep: () => set((state) => ({ currentStep: state.currentStep + 1 })),
  prevStep: () => set((state) => ({ currentStep: state.currentStep - 1 })),
  setStep: (step) => set({ currentStep: step }),
  isLastStep: get()?.currentStep === steps.length - 1,
  isNextDisabled: false,
  setIsNextDisabled: (value) => set({ isNextDisabled: value }),
}));
