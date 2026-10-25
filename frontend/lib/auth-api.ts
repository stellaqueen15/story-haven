const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL ?? "/api";

export function getApiUrl(path: string) {
  return `${apiBaseUrl.replace(/\/$/, "")}/${path.replace(/^\//, "")}`;
}
