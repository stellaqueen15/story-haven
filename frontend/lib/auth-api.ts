const apiUrl = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "");

function getApiUrl() {
  if (!apiUrl) {
    throw new Error("L’URL de l’API n’est pas configurée.");
  }

  return apiUrl;
}

function getApiRoot() {
  const url = new URL(getApiUrl());
  url.pathname = url.pathname.replace(/\/api\/?$/, "");
  return url.toString().replace(/\/$/, "");
}

export async function getXsrfToken() {
  const csrfResponse = await fetch(`${getApiRoot()}/sanctum/csrf-cookie`, {
    method: "GET",
    credentials: "include",
    headers: { Accept: "application/json" },
  });

  if (!csrfResponse.ok) {
    throw new Error("Impossible d’obtenir le jeton de sécurité. Réessayez.");
  }

  const xsrfCookie = document.cookie
    .split("; ")
    .find((cookie) => cookie.startsWith("XSRF-TOKEN="));

  if (!xsrfCookie) {
    throw new Error("Le serveur n’a pas envoyé le cookie de sécurité CSRF.");
  }

  return decodeURIComponent(xsrfCookie.slice("XSRF-TOKEN=".length));
}

export function getAuthApiUrl(path: "login" | "register") {
  return `${getApiUrl()}/${path}`;
}
