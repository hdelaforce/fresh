import React, { useState } from 'react';

interface Props {
  config: any;
  onChange: (cfg: any) => void;
}

export default function SettingsPane({ config, onChange }: Props) {
  const [local, setLocal] = useState(config);

  function handleChange(key: string, value: any) {
    const updated = { ...local, api: { ...local.api, [key]: value } };
    setLocal(updated);
    window.electronAPI.saveConfig(updated);
    onChange(updated);
  }

  function handleDevTools(value: boolean) {
    const updated = { ...local, ui: { ...local.ui, devTools: value } };
    setLocal(updated);
    window.electronAPI.saveConfig(updated);
    onChange(updated);
  }

  return (
    <div className="space-y-2">
      <input
        className="w-full p-2"
        placeholder="API Base URL"
        value={local.api.baseURL}
        onChange={e => handleChange('baseURL', e.target.value)}
      />
      <input
        className="w-full p-2"
        placeholder="Auth Token"
        value={local.api.token}
        onChange={e => handleChange('token', e.target.value)}
      />
      <input
        className="w-full p-2"
        placeholder="Timeout"
        value={local.api.timeout}
        onChange={e => handleChange('timeout', Number(e.target.value))}
      />
      <label className="flex items-center space-x-2">
        <input
          type="checkbox"
          checked={local.ui.devTools}
          onChange={e => handleDevTools(e.target.checked)}
        />
        <span>Auto-Open DevTools</span>
      </label>
    </div>
  );
}
