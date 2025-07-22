import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electronAPI', {
  getConfig: () => ipcRenderer.invoke('getConfig'),
  saveConfig: (cfg: any) => ipcRenderer.invoke('saveConfig', cfg),
  sendToN8N: (payload: any) => ipcRenderer.invoke('sendToN8N', payload)
});
