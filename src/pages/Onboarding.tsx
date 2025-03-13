
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import OnboardingLayout from "@/components/onboarding/OnboardingLayout";
import GradeSelection from "@/components/onboarding/GradeSelection";
import TopicSelection from "@/components/onboarding/TopicSelection";
import SkillSelection from "@/components/onboarding/SkillSelection";
import { useToast } from "@/hooks/use-toast";

const Onboarding = () => {
  const [step, setStep] = useState(1);
  const [selectedGrade, setSelectedGrade] = useState<string | null>(null);
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleNext = () => {
    if (step === 1 && !selectedGrade) {
      toast({
        variant: "destructive",
        title: "Selection required",
        description: "Please select your education level to continue.",
      });
      return;
    }

    if (step === 2 && selectedTopics.length < 3) {
      toast({
        variant: "destructive",
        title: "More selections needed",
        description: "Please select at least 3 topics to continue.",
      });
      return;
    }

    if (step === 3) {
      // Complete onboarding and navigate to home
      toast({
        title: "Setup complete!",
        description: "Your personalized learning experience is ready.",
      });
      navigate("/home");
      return;
    }

    setStep(step + 1);
  };

  const handlePrevious = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleSelectGrade = (grade: string) => {
    setSelectedGrade(grade);
  };

  const handleSelectTopic = (topic: string) => {
    if (selectedTopics.includes(topic)) {
      setSelectedTopics(selectedTopics.filter((t) => t !== topic));
    } else {
      setSelectedTopics([...selectedTopics, topic]);
    }
  };

  const handleSelectSkill = (skill: string) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(selectedSkills.filter((s) => s !== skill));
    } else {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  return (
    <OnboardingLayout
      currentStep={step}
      totalSteps={3}
      onNext={handleNext}
      onPrevious={handlePrevious}
      isNextDisabled={
        (step === 1 && !selectedGrade) ||
        (step === 2 && selectedTopics.length < 3)
      }
      isPreviousHidden={step === 1}
      nextLabel={step === 3 ? "Complete Setup" : "Next"}
    >
      {step === 1 && (
        <GradeSelection
          selectedGrade={selectedGrade}
          onSelectGrade={handleSelectGrade}
        />
      )}
      {step === 2 && (
        <TopicSelection
          selectedTopics={selectedTopics}
          onSelectTopic={handleSelectTopic}
        />
      )}
      {step === 3 && (
        <SkillSelection
          selectedSkills={selectedSkills}
          onSelectSkill={handleSelectSkill}
        />
      )}
    </OnboardingLayout>
  );
};

export default Onboarding;
