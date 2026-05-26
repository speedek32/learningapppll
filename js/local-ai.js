// Runs a quantized AI model locally in the browser via Transformers.js.
// Works in Chrome, Opera, Firefox, Edge, Safari – no API key needed.
// Model is downloaded once (~400 MB) and cached by the browser.

import { pipeline, env } from 'https://cdn.jsdelivr.net/npm/@huggingface/transformers@3.1.0';

env.allowLocalModels = false;
env.useBrowserCache  = true;

const MODEL_ID   = 'onnx-community/Qwen2.5-0.5B-Instruct';
const MODEL_DTYPE = 'q4';

let pipe   = null;
let status = 'idle'; // idle | loading | ready | error

window.LocalAI = {
  getStatus: () => status,

  async load(onProgress) {
    if (status === 'ready')   return;
    if (status === 'loading') return;
    status = 'loading';

    try {
      pipe = await pipeline('text-generation', MODEL_ID, {
        dtype: MODEL_DTYPE,
        progress_callback: info => {
          if (onProgress && info.status === 'progress') onProgress(info);
        }
      });
      status = 'ready';
    } catch (err) {
      status = 'error';
      pipe   = null;
      throw err;
    }
  },

  async generate(systemPrompt, messages) {
    if (!pipe) throw new Error('Model AI nie jest załadowany. Kliknij „Załaduj AI" najpierw.');

    const input = [
      { role: 'system', content: systemPrompt },
      ...messages.slice(-10)
    ];

    const out = await pipe(input, {
      max_new_tokens:     600,
      temperature:        0.7,
      do_sample:          true,
      repetition_penalty: 1.1,
    });

    return out[0]?.generated_text?.at(-1)?.content || '(brak odpowiedzi)';
  }
};
