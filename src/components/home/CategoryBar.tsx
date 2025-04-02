
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CategoryBarProps {
  categories: string[];
  activeCategory: string;
  onSelectCategory: (category: string) => void;
}

const CategoryBar = ({ 
  categories, 
  activeCategory, 
  onSelectCategory 
}: CategoryBarProps) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  
  const handleScroll = () => {
    if (!scrollContainerRef.current) return;
    
    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
    setShowLeftArrow(scrollLeft > 0);
    setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
  };
  
  const scroll = (direction: 'left' | 'right') => {
    if (!scrollContainerRef.current) return;
    
    const scrollAmount = 200;
    scrollContainerRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth'
    });
  };
  
  return (
    <div className="relative w-full">
      {showLeftArrow && (
        <Button 
          onClick={() => scroll('left')}
          size="icon" 
          variant="outline"
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 h-8 w-8 rounded-full bg-background/90 shadow-md"
        >
          <ChevronLeft className="h-4 w-4" />
          <span className="sr-only">Scroll left</span>
        </Button>
      )}
      
      <div
        ref={scrollContainerRef}
        onScroll={handleScroll}
        className="flex overflow-x-auto scrollbar-hide gap-2 py-2"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {categories.map((category) => (
          <Button
            key={category}
            variant={activeCategory === category ? "secondary" : "outline"}
            className="rounded-full whitespace-nowrap px-4 text-sm flex-shrink-0"
            onClick={() => onSelectCategory(category)}
          >
            {category}
          </Button>
        ))}
      </div>
      
      {showRightArrow && (
        <Button 
          onClick={() => scroll('right')}
          size="icon" 
          variant="outline"
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 h-8 w-8 rounded-full bg-background/90 shadow-md"
        >
          <ChevronRight className="h-4 w-4" />
          <span className="sr-only">Scroll right</span>
        </Button>
      )}
    </div>
  );
};

export default CategoryBar;
