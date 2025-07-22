import React, { useEffect, useState } from 'react';
import SendForm from './components/SendForm';
import InstructionsPane from './components/InstructionsPane';
import SettingsPane from './components/SettingsPane';

export default function App() {
  const [tab, setTab] = useState<'send' | 'instructions' | 'settings'>('send');
  const [config, setConfig] = useState<any>(null);

  useEffect(() => {
    window.electronAPI.getConfig().then((cfg: any) => setConfig(cfg));
  }, []);

  if (!config) return null;

  return (
    <div className="p-4 space-y-4 text-slate-100">
      <div className="flex space-x-4">
        <button className="px-3 py-1" onClick={() => setTab('send')}>Send</button>
        <button className="px-3 py-1" onClick={() => setTab('instructions')}>Instructions</button>
        <button className="px-3 py-1" onClick={() => setTab('settings')}>Settings</button>
      </div>
      {tab === 'send' && <SendForm config={config} />}
      {tab === 'instructions' && <InstructionsPane config={config} onChange={setConfig} />}
      {tab === 'settings' && <SettingsPane config={config} onChange={setConfig} />}
    </div>
  );
}
