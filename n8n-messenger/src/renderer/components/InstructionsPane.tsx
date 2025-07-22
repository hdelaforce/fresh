import React, { useState } from 'react';

interface Props {
  config: any;
  onChange: (cfg: any) => void;
}

export default function InstructionsPane({ config, onChange }: Props) {
  const [text, setText] = useState(config.instructions);

  function handleBlur() {
    const updated = { ...config, instructions: text };
    window.electronAPI.saveConfig(updated);
    onChange(updated);
  }

  return (
    <textarea
      className="w-full h-60 p-2 bg-slate-700 rounded-xl"
      value={text}
      onChange={e => setText(e.target.value)}
      onBlur={handleBlur}
    />
  );
}
