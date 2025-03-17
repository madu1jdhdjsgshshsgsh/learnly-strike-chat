import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Upload, X, Image, Loader2, Video } from "lucide-react";

export const UploadVideoForm = () => {
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  
  const videoInputRef = useRef<HTMLInputElement>(null);
  const thumbnailInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  
  const handleVideoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    if (!file.type.startsWith("video/")) {
      toast({
        title: "Invalid file type",
        description: "Please upload a video file.",
        variant: "destructive",
      });
      return;
    }
    
    setVideoFile(file);
  };
  
  const handleThumbnailSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    if (!file.type.startsWith("image/")) {
      toast({
        title: "Invalid file type",
        description: "Please upload an image file for the thumbnail.",
        variant: "destructive",
      });
      return;
    }
    
    setThumbnailFile(file);
    
    const reader = new FileReader();
    reader.onload = () => {
      setThumbnailPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };
  
  const addTag = () => {
    if (tagInput.trim() === "") return;
    if (tags.includes(tagInput.trim())) {
      toast({
        title: "Duplicate tag",
        description: "This tag has already been added.",
        variant: "destructive",
      });
      return;
    }
    
    setTags([...tags, tagInput.trim()]);
    setTagInput("");
  };
  
  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };
  
  const handleTagKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTag();
    }
  };
  
  const handleUpload = () => {
    if (!videoFile) {
      toast({
        title: "Video required",
        description: "Please select a video to upload.",
        variant: "destructive",
      });
      return;
    }
    
    if (!title.trim()) {
      toast({
        title: "Title required",
        description: "Please enter a title for your video.",
        variant: "destructive",
      });
      return;
    }
    
    setIsUploading(true);
    setUploadProgress(0);
    
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        const newProgress = prev + 10;
        if (newProgress >= 100) {
          clearInterval(interval);
          
          setTimeout(() => {
            setIsUploading(false);
            toast({
              title: "Video uploaded",
              description: "Your educational video has been uploaded successfully and is pending review.",
            });
            
            setVideoFile(null);
            setThumbnailFile(null);
            setThumbnailPreview(null);
            setTitle("");
            setDescription("");
            setTags([]);
          }, 500);
          
          return 100;
        }
        return newProgress;
      });
    }, 300);
  };
  
  return (
    <div className="space-y-6 py-4">
      {!videoFile ? (
        <div 
          className="border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:bg-muted/50 transition-colors"
          onClick={() => videoInputRef.current?.click()}
        >
          <input
            type="file"
            ref={videoInputRef}
            className="hidden"
            onChange={handleVideoSelect}
            accept="video/*"
          />
          <Upload className="mx-auto h-10 w-10 text-muted-foreground mb-2" />
          <h3 className="text-lg font-medium mb-1">Click to upload a video</h3>
          <p className="text-sm text-muted-foreground max-w-xs mx-auto">
            Upload a video to share your knowledge. MP4, MOV, AVI formats supported.
          </p>
        </div>
      ) : (
        <div className="border rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="bg-muted w-12 h-12 rounded flex items-center justify-center">
                <Video className="h-6 w-6 text-muted-foreground" />
              </div>
              <div className="ml-3">
                <p className="font-medium truncate">{videoFile.name}</p>
                <p className="text-sm text-muted-foreground">
                  {(videoFile.size / (1024 * 1024)).toFixed(2)} MB
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setVideoFile(null)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
      
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            placeholder="Enter a title for your video"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            placeholder="Describe what your video is about"
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        
        <div className="space-y-2">
          <Label>Thumbnail</Label>
          {!thumbnailPreview ? (
            <div 
              className="border rounded-lg p-4 flex flex-col items-center justify-center cursor-pointer hover:bg-muted/50 transition-colors h-32"
              onClick={() => thumbnailInputRef.current?.click()}
            >
              <input
                type="file"
                ref={thumbnailInputRef}
                className="hidden"
                onChange={handleThumbnailSelect}
                accept="image/*"
              />
              <Image className="h-8 w-8 text-muted-foreground mb-2" />
              <p className="text-sm text-center text-muted-foreground">
                Click to upload thumbnail
              </p>
            </div>
          ) : (
            <div className="relative">
              <img 
                src={thumbnailPreview} 
                alt="Thumbnail preview" 
                className="h-32 w-full object-cover rounded-lg border"
              />
              <Button
                variant="destructive"
                size="icon"
                className="absolute top-2 right-2 h-6 w-6 rounded-full"
                onClick={() => {
                  setThumbnailFile(null);
                  setThumbnailPreview(null);
                }}
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          )}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="tags">Tags</Label>
          <div className="flex items-center">
            <Input
              id="tags"
              placeholder="Add tags to help students find your video"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={handleTagKeyDown}
              className="flex-1"
            />
            <Button 
              onClick={addTag}
              type="button"
              className="ml-2"
            >
              Add
            </Button>
          </div>
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {tags.map(tag => (
                <div key={tag} className="bg-secondary text-secondary-foreground px-2 py-1 rounded-full text-sm flex items-center">
                  {tag}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-4 w-4 ml-1"
                    onClick={() => removeTag(tag)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      
      {isUploading && (
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Uploading...</span>
            <span>{uploadProgress}%</span>
          </div>
          <div className="w-full bg-secondary rounded-full h-2">
            <div 
              className="bg-primary h-2 rounded-full transition-all duration-300" 
              style={{ width: `${uploadProgress}%` }}
            ></div>
          </div>
        </div>
      )}
      
      <div className="flex justify-end">
        <Button
          variant="outline"
          className="mr-2"
          onClick={() => {
            setVideoFile(null);
            setThumbnailFile(null);
            setThumbnailPreview(null);
            setTitle("");
            setDescription("");
            setTags([]);
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={handleUpload}
          disabled={isUploading}
        >
          {isUploading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Uploading
            </>
          ) : (
            <>Upload Video</>
          )}
        </Button>
      </div>
    </div>
  );
};
