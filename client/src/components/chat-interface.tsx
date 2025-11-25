import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

interface ChatInterfaceProps {
  title?: string;
  suggestions?: string[];
}

export function ChatInterface({ title = "BusinessMate AI", suggestions = [] }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: "Hello! I'm BusinessMate, your AI career and business advisor. How can I help you plan your future today?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = (text?: string) => {
    const prompt = (text ?? input).trim();
    if (!prompt) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: prompt,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    const getMockResponse = (p: string) => {
      const lower = p.toLowerCase();
      if (lower.includes("skill") || lower.includes("learn")) {
        return (
          "Recommended Skills (West Africa Focus)\n" +
          "• Python + Pandas (45% demand growth)\n" +
          "• Data Visualization (Tableau/Power BI)\n" +
          "• Cloud Fundamentals (AWS/Azure/GCP)\n\n" +
          "Action Plan\n" +
          "1) 6-week Python intensive (5–7 hrs/wk)\n" +
          "2) Build 2 portfolio projects with local datasets\n" +
          "3) Earn a beginner cloud cert (AWS Cloud Practitioner)"
        );
      }
      if (lower.includes("market") || lower.includes("opportunit")) {
        return (
          "Market Snapshot\n" +
          "• Remote data roles +67% YoY\n" +
          "• SME digitization driving analytics demand\n" +
          "• Cloud skills seen in 60% of job posts\n\n" +
          "Top Opportunities\n" +
          "1) Analytics for SMEs in retail/fintech\n" +
          "2) Remote junior data roles (global)\n" +
          "3) Local gov/open data projects"
        );
      }
      if (lower.includes("career") || lower.includes("trajectory")) {
        return (
          "Career Trajectory Forecast (8 months)\n" +
          "• Skill match: 87% → 92%\n" +
          "• Network growth: +156 connections\n" +
          "• Interview rate: +35%\n\n" +
          "Recommendations\n" +
          "• Publish 2 case studies\n" +
          "• Apply to 10 curated roles/month\n" +
          "• Join 2 local tech communities"
        );
      }
      if (lower.includes("trend") || lower.includes("west africa")) {
        return (
          "Regional Trends\n" +
          "• AI/ML demand +45%\n" +
          "• Cloud adoption accelerating\n" +
          "• Remote-first hiring growing\n\n" +
          "Next Steps\n" +
          "• Strengthen portfolio with 3 projects\n" +
          "• Target hybrid roles with growth paths\n" +
          "• Build LinkedIn presence (weekly posts)"
        );
      }
      if (lower.includes("business") || lower.includes("sme")) {
        return (
          "SME Strategy Ideas\n" +
          "• Introduce analytics dashboards (low-cost)\n" +
          "• Upsell via lifecycle email + WhatsApp\n" +
          "• Pilot remote delivery to expand TAM\n\n" +
          "ROI Estimates (3–6 months)\n" +
          "• Revenue +15–25%\n" +
          "• CAC -10% with better targeting\n" +
          "• Churn -8% via usage nudges"
        );
      }
      return (
        "Thanks for the prompt! Here’s a tailored plan:\n\n" +
        "1) Clarify your immediate goal (role, skill, or business KPI)\n" +
        "2) Pick one 4–6 week learning sprint\n" +
        "3) Build a small portfolio artifact for every sprint\n" +
        "4) Share outcomes publicly to attract inbound opportunities\n\n" +
        "Ask me for a personalized 30–60–90 day plan."
      );
    };

    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: getMockResponse(prompt),
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);
      setIsTyping(false);
    }, 900);
  };

  const handleSuggestion = (suggestion: string) => {
    handleSend(suggestion);
  };

  return (
    <Card className="flex flex-col h-[600px]" data-testid="card-chat-interface">
      <div className="p-6 border-b border-card-border">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-br from-primary to-accent rounded-lg">
            <Sparkles className="h-5 w-5 text-white" />
          </div>
          <div>
            <h3 className="font-serif font-semibold text-lg">{title}</h3>
            <p className="text-sm text-muted-foreground">AI-powered career guidance</p>
          </div>
        </div>
      </div>

      <ScrollArea className="flex-1 p-6">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-3 ${message.role === "user" ? "flex-row-reverse" : ""}`}
              data-testid={`message-${message.role}-${message.id}`}
            >
              <Avatar className="h-8 w-8 shrink-0">
                <AvatarFallback className={message.role === "assistant" ? "bg-primary text-primary-foreground" : "bg-secondary"}>
                  {message.role === "assistant" ? "AI" : "U"}
                </AvatarFallback>
              </Avatar>
              <div className={`flex flex-col gap-1 max-w-[80%] ${message.role === "user" ? "items-end" : ""}`}>
                <div
                  className={`px-4 py-3 rounded-lg whitespace-pre-wrap ${
                    message.role === "assistant"
                      ? "bg-muted"
                      : "bg-primary text-primary-foreground"
                  }`}
                >
                  <p className="text-sm leading-relaxed">{message.content}</p>
                </div>
                <span className="text-xs text-muted-foreground px-1">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      {suggestions.length > 0 && (
        <div className="px-6 py-3 border-t border-card-border">
          <ScrollArea className="w-full">
            <div className="flex gap-2">
              {suggestions.map((suggestion, idx) => (
                <Badge
                  key={idx}
                  variant="outline"
                  className="cursor-pointer hover-elevate active-elevate-2 whitespace-nowrap"
                  onClick={() => handleSuggestion(suggestion)}
                  data-testid={`button-suggestion-${idx}`}
                >
                  {suggestion}
                </Badge>
              ))}
            </div>
          </ScrollArea>
        </div>
      )}

      {isTyping && (
        <div className="px-6 py-2 text-xs text-muted-foreground">BusinessMate is typing...</div>
      )}
      <div className="p-6 border-t border-card-border">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex gap-2"
        >
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask me anything about your career or business..."
            className="flex-1"
            data-testid="input-chat-message"
          />
          <Button type="submit" size="icon" data-testid="button-send-message" disabled={isTyping} aria-busy={isTyping}>
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </Card>
  );
}
