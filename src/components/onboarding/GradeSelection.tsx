
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface GradeOption {
  id: string;
  label: string;
  description: string;
}

const gradeOptions: GradeOption[] = [
  {
    id: "elementary",
    label: "Elementary School",
    description: "Grades 1-5 (Ages 6-11)",
  },
  {
    id: "middle",
    label: "Middle School",
    description: "Grades 6-8 (Ages 11-14)",
  },
  {
    id: "high",
    label: "High School",
    description: "Grades 9-12 (Ages 14-18)",
  },
  {
    id: "undergraduate",
    label: "Undergraduate",
    description: "College/University students",
  },
  {
    id: "graduate",
    label: "Graduate",
    description: "Master's, PhD, or professional studies",
  },
  {
    id: "professional",
    label: "Working Professional",
    description: "Continuing education and skill development",
  },
];

interface GradeSelectionProps {
  selectedGrade: string | null;
  onSelectGrade: (grade: string) => void;
}

const GradeSelection = ({ selectedGrade, onSelectGrade }: GradeSelectionProps) => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">What's your education level?</h2>
        <p className="text-muted-foreground">
          We'll personalize your learning experience based on your education level.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {gradeOptions.map((option) => (
          <Card
            key={option.id}
            className={cn(
              "cursor-pointer transition-all hover:border-strike-300", 
              selectedGrade === option.id ? "border-2 border-strike-500 bg-strike-50" : ""
            )}
            onClick={() => onSelectGrade(option.id)}
          >
            <CardContent className="flex items-start p-6">
              <div className="flex-1">
                <h3 className="font-medium text-lg">{option.label}</h3>
                <p className="text-sm text-muted-foreground">{option.description}</p>
              </div>
              {selectedGrade === option.id && (
                <div className="bg-strike-500 rounded-full p-1">
                  <Check className="h-4 w-4 text-white" />
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default GradeSelection;
