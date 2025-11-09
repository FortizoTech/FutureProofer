import { ChatInterface } from "@/components/chat-interface";

export default function Chat() {
  const suggestions = [
    "What skills should I learn?",
    "Career path advice",
    "Market opportunities",
    "Industry trends",
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-3xl font-bold mb-2" data-testid="text-page-title">BusinessMate AI</h1>
        <p className="text-muted-foreground">Your intelligent career and business advisor</p>
      </div>

      <div className="max-w-4xl">
        <ChatInterface 
          title="BusinessMate AI"
          suggestions={suggestions}
        />
      </div>
    </div>
  );
}
