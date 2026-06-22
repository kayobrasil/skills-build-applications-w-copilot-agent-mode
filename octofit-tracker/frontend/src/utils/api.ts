const CODESPACE_NAME = import.meta.env.VITE_CODESPACE_NAME;
const DEFAULT_HOST = 'localhost';
const DEFAULT_PORT = 8000;

export function safeApiUrl(path: string) {
  const baseHost = CODESPACE_NAME
    ? `${CODESPACE_NAME}-8000.app.github.dev`
    : `${DEFAULT_HOST}:${DEFAULT_PORT}`;

  const protocol = CODESPACE_NAME ? 'https' : 'http';
  return `${protocol}://${baseHost}${path}`;
}

export function getApiHelpText() {
  return 'Define VITE_CODESPACE_NAME in .env.local to use Codespaces preview URLs.';
}
