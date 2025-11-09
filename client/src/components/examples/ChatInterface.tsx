import { ChatInterface } from '../chat-interface';

export default function ChatInterfaceExample() {
  const suggestions = [
    "What skills are in demand?",
    "Career path advice",
    "Market opportunities",
  ];

  return (
    <div className="p-8 max-w-3xl">
      <ChatInterface 
        title="BusinessMate AI"
        suggestions={suggestions}
      />
    </div>
  );
}
