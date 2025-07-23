export const logtoConfig = {
  endpoint: process.env.LOGTO_ENDPOINT || '',
  appId: process.env.LOGTO_APPID || '',
  appSecret: process.env.LOGTO_APP_SECRET || '',
  baseUrl: process.env.LOGTO_BASE_URL || 'http://localhost:3000',
  cookieSecret: process.env.LOGTO_COOKIE_SECRET,
  cookieSecure: process.env.NODE_ENV === 'production',
};

export const getLogtoSignInUrl = () => {
  const { endpoint, appId, baseUrl } = logtoConfig;
  const redirectUri = `${baseUrl}/callback`;
  const signInUrl = new URL(`/oidc/auth`, endpoint);
  signInUrl.searchParams.set('client_id', appId);
  signInUrl.searchParams.set('redirect_uri', redirectUri);
  signInUrl.searchParams.set('response_type', 'code');
  signInUrl.searchParams.set('scope', 'openid profile email');
  signInUrl.searchParams.set('state', Math.random().toString(36).substring(7));
  return signInUrl.toString();
};

export const getLogtoSignOutUrl = () => {
  const { endpoint, baseUrl } = logtoConfig;
  const signOutUrl = new URL(`/oidc/session/end`, endpoint);
  signOutUrl.searchParams.set('post_logout_redirect_uri', baseUrl);
  return signOutUrl.toString();
};