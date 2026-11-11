const BASE_URL = import.meta.env.BASE_URL || '/';

export function assetUrl(path) {
  const normalizedPath = String(path ?? '').replace(/^\/+/, '');
  // encodeURI meng-encode spasi dan karakter non-ASCII tanpa merusak slash.
  return encodeURI(`${BASE_URL}${normalizedPath}`);
}
