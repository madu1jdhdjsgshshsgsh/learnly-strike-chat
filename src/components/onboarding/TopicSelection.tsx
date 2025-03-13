
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface TopicOption {
  id: string;
  label: string;
  description: string;
}

const topicOptions: TopicOption[] = [
  {
    id: "math",
    label: "Mathematics",
    description: "Algebra, Calculus, Geometry, Statistics",
  },
  {
    id: "science",
    label: "Science",
    description: "Physics, Chemistry, Biology, Earth Science",
  },
  {
    id: "programming",
    label: "Programming",
    description: "Web Development, Python, Java, Mobile Apps",
  },
  {
    id: "language",
    label: "Languages",
    description: "English, Spanish, French, Chinese",
  },
  {
    id: "history",
    label: "History",
    description: "World History, U.S. History, Ancient Civilizations",
  },
  {
    id: "art",
    label: "Art & Design",
    description: "Drawing, Painting, Digital Art, Design Principles",
  },
  {
    id: "business",
    label: "Business",
    description: "Entrepreneurship, Marketing, Finance, Economics",
  },
  {
    id: "music",
    label: "Music",
    description: "Music Theory, Instruments, Production",
  },
];

interface TopicSelectionProps {
  selectedTopics: string[];
  onSelectTopic: (topic: string) => void;
}

const TopicSelection = ({ selectedTopics, onSelectTopic }: TopicSelectionProps) => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">What topics interest you?</h2>
        <p className="text-muted-foreground">
          Select at least 3 topics you're interested in learning. You can update these later.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {topicOptions.map((option) => {
          const isSelected = selectedTopics.includes(option.id);
          return (
            <Card
              key={option.id}
              className={cn(
                "cursor-pointer transition-all hover:border-strike-300",
                isSelected ? "border-2 border-strike-500 bg-strike-50" : ""
              )}
              onClick={() => onSelectTopic(option.id)}
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

export default TopicSelection;
