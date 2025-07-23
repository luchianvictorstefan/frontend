import { redirect } from "react-router";
import { logtoConfig } from "~/lib/logto";

export async function loader({ request }: { request: Request }) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");

  if (!code) {
    throw new Response("Missing authorization code", { status: 400 });
  }

  const { endpoint, appId, appSecret, baseUrl } = logtoConfig;
  const tokenUrl = new URL("/oidc/token", endpoint);

  const response = await fetch(tokenUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      client_id: appId,
      client_secret: appSecret,
      code: code,
      redirect_uri: `${baseUrl}/callback`,
    }),
  });

  if (!response.ok) {
    throw new Response("Token exchange failed", { status: 400 });
  }

  const tokenData = await response.json();

  // Store the access token in a cookie or session
  // For now, just redirect to home
  return redirect("/", {
    headers: {
      "Set-Cookie": `access_token=${tokenData.access_token}; HttpOnly; Path=/; Max-Age=3600`,
    },
  });
}