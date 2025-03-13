
import { useState, ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface OnboardingLayoutProps {
  children: ReactNode;
  currentStep: number;
  totalSteps: number;
  onNext: () => void;
  onPrevious: () => void;
  isNextDisabled?: boolean;
  isPreviousHidden?: boolean;
  nextLabel?: string;
}

const OnboardingLayout = ({
  children,
  currentStep,
  totalSteps,
  onNext,
  onPrevious,
  isNextDisabled = false,
  isPreviousHidden = false,
  nextLabel = "Next",
}: OnboardingLayoutProps) => {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b px-4 py-4">
        <div className="w-full max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold text-strike-600">Set up your Strike experience</h1>
          <Progress value={progress} className="h-2 mt-4" />
        </div>
      </header>
      <main className="flex-1 overflow-auto px-4 py-8">
        <div className="w-full max-w-4xl mx-auto">
          {children}
        </div>
      </main>
      <footer className="border-t px-4 py-4">
        <div className="w-full max-w-4xl mx-auto flex justify-between">
          {!isPreviousHidden ? (
            <Button
              variant="outline"
              onClick={onPrevious}
              className="flex items-center"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
          ) : (
            <div></div>
          )}
          <Button
            onClick={onNext}
            disabled={isNextDisabled}
            className="flex items-center bg-strike-500 hover:bg-strike-600"
          >
            {nextLabel}
            {nextLabel === "Next" && <ArrowRight className="ml-2 h-4 w-4" />}
          </Button>
        </div>
      </footer>
    </div>
  );
};

export default OnboardingLayout;
