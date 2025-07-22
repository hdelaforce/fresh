import fetch from 'node-fetch';

export interface ApiConfig {
  baseURL: string;
  token: string;
  timeout: number;
}

export async function send(payload: { url: string; description: string; instructions: string }, config: ApiConfig) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), config.timeout);
  try {
    const res = await fetch(config.baseURL + '/webhook', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + config.token
      },
      body: JSON.stringify({
        url: payload.url,
        description: payload.description,
        instructions: payload.instructions
      }),
      signal: controller.signal
    });
    return { status: res.status };
  } finally {
    clearTimeout(id);
  }
}
