
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Upload, MessageSquare, FileText, FileUp, Lightbulb, BookText } from "lucide-react";

const AICompanion = () => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [processingFile, setProcessingFile] = useState(false);
  const [notesContent, setNotesContent] = useState("");
  const [pptTitle, setPptTitle] = useState("");
  const [quizTitle, setQuizTitle] = useState("");
  const { toast } = useToast();

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFile(file);
      toast({
        title: "File uploaded",
        description: `${file.name} has been uploaded successfully.`,
      });
    }
  };

  const handleProcessFile = () => {
    if (!uploadedFile) {
      toast({
        variant: "destructive",
        title: "No file selected",
        description: "Please upload a file first.",
      });
      return;
    }

    setProcessingFile(true);
    // Simulate processing
    setTimeout(() => {
      setProcessingFile(false);
      setNotesContent("These are your generated notes from the uploaded content...\n\n• Key point 1: Lorem ipsum dolor sit amet\n• Key point 2: Consectetur adipiscing elit\n• Key point 3: Sed do eiusmod tempor incididunt\n• Key point 4: Ut labore et dolore magna aliqua\n\nImportant definitions:\n1. Term A - definition here\n2. Term B - definition here\n3. Term C - definition here");
      toast({
        title: "File processed",
        description: "Your notes have been generated successfully.",
      });
    }, 2000);
  };

  const handleCreatePPT = () => {
    if (!pptTitle) {
      toast({
        variant: "destructive",
        title: "Title required",
        description: "Please enter a title for your presentation.",
      });
      return;
    }

    // Simulate PPT generation
    toast({
      title: "Creating presentation",
      description: "Your presentation is being generated...",
    });

    setTimeout(() => {
      toast({
        title: "Presentation ready",
        description: "Your presentation has been created successfully.",
      });
    }, 3000);
  };

  const handleCreateQuiz = () => {
    if (!quizTitle) {
      toast({
        variant: "destructive",
        title: "Title required",
        description: "Please enter a title for your quiz.",
      });
      return;
    }

    // Simulate quiz generation
    toast({
      title: "Creating quiz",
      description: "Your quiz is being generated...",
    });

    setTimeout(() => {
      toast({
        title: "Quiz ready",
        description: "Your quiz has been created successfully.",
      });
    }, 3000);
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex flex-col space-y-6">
        <div>
          <h1 className="text-3xl font-bold">AI Study Companion</h1>
          <p className="text-muted-foreground mt-2">
            Upload your notes, generate study materials, and enhance your learning experience
          </p>
        </div>

        <Tabs defaultValue="upload" className="w-full">
          <TabsList className="grid grid-cols-3 w-full max-w-md mb-4">
            <TabsTrigger value="upload">Upload Notes</TabsTrigger>
            <TabsTrigger value="create-ppt">Create PPT</TabsTrigger>
            <TabsTrigger value="create-quiz">Create Quiz</TabsTrigger>
          </TabsList>

          <TabsContent value="upload">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Upload Your Notes</CardTitle>
                  <CardDescription>
                    Upload your notes or study materials in PDF, DOCX, or TXT format.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="border-2 border-dashed rounded-lg p-6 text-center hover:bg-muted/50 transition-colors cursor-pointer">
                    <Input
                      id="file-upload"
                      type="file"
                      className="hidden"
                      onChange={handleFileUpload}
                      accept=".pdf,.docx,.txt"
                    />
                    <Label
                      htmlFor="file-upload"
                      className="cursor-pointer flex flex-col items-center gap-2"
                    >
                      <Upload className="h-8 w-8 text-muted-foreground" />
                      <span className="font-medium">
                        {uploadedFile ? uploadedFile.name : "Click to upload or drag and drop"}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        PDF, DOCX, or TXT (max 10MB)
                      </span>
                    </Label>
                  </div>

                  <Button
                    className="w-full"
                    onClick={handleProcessFile}
                    disabled={!uploadedFile || processingFile}
                  >
                    {processingFile ? "Processing..." : "Process Notes"}
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Generated Notes</CardTitle>
                  <CardDescription>
                    AI-generated summary and key points from your notes
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Textarea
                    placeholder="Your processed notes will appear here..."
                    className="h-[300px]"
                    value={notesContent}
                    readOnly
                  />
                </CardContent>
                <CardFooter className="justify-between">
                  <Button variant="outline" disabled={!notesContent}>
                    <FileText className="mr-2 h-4 w-4" />
                    Download
                  </Button>
                  <Button disabled={!notesContent}>
                    <Lightbulb className="mr-2 h-4 w-4" />
                    Generate Flashcards
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="create-ppt">
            <Card>
              <CardHeader>
                <CardTitle>Create Presentation</CardTitle>
                <CardDescription>
                  Generate a professional presentation from your notes or a topic
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="ppt-title">Presentation Title</Label>
                  <Input
                    id="ppt-title"
                    placeholder="Enter a title for your presentation"
                    value={pptTitle}
                    onChange={(e) => setPptTitle(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ppt-content">Content or Topic</Label>
                  <Textarea
                    id="ppt-content"
                    placeholder="Describe the content or paste your notes here..."
                    className="h-[200px]"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <FileUp className="h-4 w-4" />
                  <span className="text-sm">Or upload a file to use as source</span>
                  <Input
                    id="ppt-file-upload"
                    type="file"
                    className="max-w-60"
                    accept=".pdf,.docx,.txt"
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full" onClick={handleCreatePPT}>
                  Generate Presentation
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="create-quiz">
            <Card>
              <CardHeader>
                <CardTitle>Create Quiz</CardTitle>
                <CardDescription>
                  Generate a quiz to test your knowledge on any topic
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="quiz-title">Quiz Title</Label>
                  <Input
                    id="quiz-title"
                    placeholder="Enter a title for your quiz"
                    value={quizTitle}
                    onChange={(e) => setQuizTitle(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="quiz-content">Content or Topic</Label>
                  <Textarea
                    id="quiz-content"
                    placeholder="Describe the topic or paste your study material here..."
                    className="h-[200px]"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Quiz Type</Label>
                  <div className="flex flex-wrap gap-2">
                    <Button variant="outline" className="rounded-full">Multiple Choice</Button>
                    <Button variant="outline" className="rounded-full">True/False</Button>
                    <Button variant="outline" className="rounded-full">Fill in the Blanks</Button>
                    <Button variant="outline" className="rounded-full">Short Answer</Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Difficulty Level</Label>
                  <div className="flex gap-2">
                    <Button variant="outline" className="rounded-full">Easy</Button>
                    <Button variant="outline" className="rounded-full">Medium</Button>
                    <Button variant="outline" className="rounded-full">Hard</Button>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full" onClick={handleCreateQuiz}>
                  Generate Quiz
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AICompanion;
