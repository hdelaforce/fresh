interface ElectronAPI {
  getConfig(): Promise<any>;
  saveConfig(cfg: any): Promise<void>;
  sendToN8N(payload: any): Promise<any>;
}

interface Window {
  electronAPI: ElectronAPI;
}
