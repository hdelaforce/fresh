import { app, BrowserWindow, ipcMain } from 'electron';
import path from 'path';
import fs from 'fs';
import os from 'os';
import { z } from 'zod';
import { send } from './apiClient';

const configSchema = z.object({
  api: z.object({
    baseURL: z.string().url(),
    token: z.string(),
    timeout: z.number().int()
  }),
  instructions: z.string().default(''),
  ui: z.object({
    devTools: z.boolean().default(false)
  })
});

type Config = z.infer<typeof configSchema>;

const configPath = path.join(
  os.homedir(),
  'Library',
  'Application Support',
  'n8n-Messenger',
  'config.json'
);

let config: Config;

function loadConfig(): Config {
  try {
    const raw = fs.readFileSync(configPath, 'utf8');
    const parsed = JSON.parse(raw);
    return configSchema.parse(parsed);
  } catch (err) {
    const defaults: Config = {
      api: {
        baseURL: 'https://example.n8n.cloud/api',
        token: '',
        timeout: 8000
      },
      instructions: 'Preset text that persists between sessions',
      ui: { devTools: false }
    };
    saveConfig(defaults);
    return defaults;
  }
}

function saveConfig(cfg: Config) {
  fs.mkdirSync(path.dirname(configPath), { recursive: true });
  fs.writeFileSync(configPath, JSON.stringify(cfg, null, 2));
}

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    vibrancy: "dark" as any,
    roundedCorners: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true
    }
  });

  win.loadFile(path.join(__dirname, '../renderer/index.html'));
  if (config.ui.devTools) {
    win.webContents.openDevTools();
  }
}

app.whenReady().then(() => {
  config = loadConfig();
  createWindow();
});

ipcMain.handle('getConfig', () => config);
ipcMain.handle('saveConfig', (_e, cfg: Config) => {
  config = configSchema.parse(cfg);
  saveConfig(config);
});
ipcMain.handle('sendToN8N', async (_e, payload: { url: string; description: string }) => {
  return send({ ...payload, instructions: config.instructions }, config.api);
});

