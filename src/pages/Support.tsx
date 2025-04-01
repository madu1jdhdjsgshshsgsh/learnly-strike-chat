
import { Layout } from "@/components/layout/Layout";
import SupportChatbot from "@/components/support/SupportChatbot";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Phone, Mail, HelpCircle } from "lucide-react";

const Support = () => {
  return (
    <Layout>
      <div className="container max-w-5xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Help & Support</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Phone className="h-5 w-5" />
                Contact Us
              </CardTitle>
              <CardDescription>
                Get in touch with our support team
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <p className="font-medium">Phone Support:</p>
                  <p className="text-muted-foreground">+1-800-555-0123</p>
                  <p className="text-sm text-muted-foreground">Available Monday-Friday, 9am-5pm EST</p>
                </div>
                <div>
                  <p className="font-medium">Email:</p>
                  <p className="text-muted-foreground">support@strike-edu.com</p>
                  <p className="text-sm text-muted-foreground">We typically respond within 24 hours</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HelpCircle className="h-5 w-5" />
                FAQs
              </CardTitle>
              <CardDescription>
                Frequently asked questions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <p className="font-medium">How do I upload educational content?</p>
                  <p className="text-muted-foreground">
                    Creator accounts can upload videos through their profile dashboard. 
                    You'll need to specify the educational category during upload.
                  </p>
                </div>
                <div>
                  <p className="font-medium">What educational categories are available?</p>
                  <p className="text-muted-foreground">
                    We support Academic subjects, Skill Development, Professional Certifications, 
                    and Hobbies & Interests.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Chat with our Education Assistant</h2>
          <SupportChatbot />
        </div>
      </div>
    </Layout>
  );
};

export default Support;
