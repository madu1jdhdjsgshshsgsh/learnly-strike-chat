
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface SkillOption {
  id: string;
  label: string;
  description: string;
}

const skillOptions: SkillOption[] = [
  {
    id: "web-dev",
    label: "Web Development",
    description: "HTML, CSS, JavaScript, Frameworks",
  },
  {
    id: "data-science",
    label: "Data Science",
    description: "Statistics, Python, Machine Learning",
  },
  {
    id: "design",
    label: "Digital Design",
    description: "UI/UX, Graphic Design, Illustration",
  },
  {
    id: "mobile-dev",
    label: "Mobile Development",
    description: "iOS, Android, React Native, Flutter",
  },
  {
    id: "game-dev",
    label: "Game Development",
    description: "Unity, Unreal Engine, 3D Modeling",
  },
  {
    id: "digital-marketing",
    label: "Digital Marketing",
    description: "SEO, Social Media, Analytics",
  },
  {
    id: "cloud-computing",
    label: "Cloud Computing",
    description: "AWS, Azure, Google Cloud",
  },
  {
    id: "video-editing",
    label: "Video Production",
    description: "Filming, Editing, Animation",
  },
  {
    id: "writing",
    label: "Creative Writing",
    description: "Storytelling, Blogging, Scriptwriting",
  },
];

interface SkillSelectionProps {
  selectedSkills: string[];
  onSelectSkill: (skill: string) => void;
}

const SkillSelection = ({ selectedSkills, onSelectSkill }: SkillSelectionProps) => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">What skills do you want to develop?</h2>
        <p className="text-muted-foreground">
          Select skills you're interested in learning or improving. You can update these anytime.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {skillOptions.map((option) => {
          const isSelected = selectedSkills.includes(option.id);
          return (
            <Card
              key={option.id}
              className={cn(
                "cursor-pointer transition-all hover:border-strike-300",
                isSelected ? "border-2 border-strike-500 bg-strike-50" : ""
              )}
              onClick={() => onSelectSkill(option.id)}
            >
              <CardContent className="flex items-start p-4">
                <div className="flex-1">
                  <h3 className="font-medium">{option.label}</h3>
                  <p className="text-sm text-muted-foreground">{option.description}</p>
                </div>
                {isSelected && (
                  <div className="bg-strike-500 rounded-full p-1">
                    <Check className="h-4 w-4 text-white" />
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default SkillSelection;
