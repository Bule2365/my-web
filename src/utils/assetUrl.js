const BASE_URL = import.meta.env.BASE_URL || '/';

export function assetUrl(path) {
  const normalizedPath = String(path ?? '').replace(/^\/+/, '');
  return `${BASE_URL}${normalizedPath}`;
}