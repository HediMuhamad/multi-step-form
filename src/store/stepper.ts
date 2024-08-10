import { steps } from "@/constants/steps";
import { create } from "zustand";

const maxStep = steps?.length - 1;

type StepperState = {
  maxStep: number;
  currentStep: number;
  nextStep: () => void;
  prevStep: () => void;
  setStep: (step: number) => void;
  isLastStep: () => boolean;
  isSubmitted: boolean;
  setIsSubmitted: () => void;
};

export const useStepper = create<StepperState>((set, get) => ({
  maxStep: steps?.length - 1,
  currentStep: 0,
  nextStep: () =>
    set((state) => ({ currentStep: limitGuardian(state.currentStep + 1) })),
  prevStep: () =>
    set((state) => ({ currentStep: limitGuardian(state.currentStep - 1) })),
  setStep: (step) => set({ currentStep: limitGuardian(step) }),
  isLastStep: () => get()?.currentStep === maxStep,
  isSubmitted: false,
  setIsSubmitted: () => set((state) => ({ isSubmitted: true })),
}));

const limitGuardian = (nextStep: number) => {
  if (nextStep > maxStep) return maxStep;
  if (0 > nextStep) return 0;
  return nextStep;
};
