import { ModeSelector } from '../mode-selector';
import { useState } from 'react';

export default function ModeSelectorExample() {
  const [mode, setMode] = useState<"career" | "business">();

  return (
    <div className="p-8 max-w-4xl">
      <div className="mb-6">
        <h2 className="font-serif text-2xl font-semibold mb-2">Choose Your Focus</h2>
        <p className="text-muted-foreground">Select how you want to use Future Proofer</p>
      </div>
      <ModeSelector selected={mode} onSelect={setMode} />
    </div>
  );
}
