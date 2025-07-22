import React, { useState } from 'react';

export default function SendForm({ config }: { config: any }) {
  const [url, setUrl] = useState('');
  const [desc, setDesc] = useState('');

  async function handleSend() {
    await window.electronAPI.sendToN8N({ url, description: desc });
    setUrl('');
    setDesc('');
  }

  return (
    <div className="space-y-2">
      <input
        className="w-full p-2"
        placeholder="Website URL"
        value={url}
        onChange={e => setUrl(e.target.value)}
      />
      <input
        className="w-full p-2"
        placeholder="Short Description"
        value={desc}
        onChange={e => setDesc(e.target.value)}
      />
      <button onClick={handleSend}>Send</button>
    </div>
  );
}
