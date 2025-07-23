import { makeLogtoReactRouter } from '@logto/react-router';
import { createCookieSessionStorage } from 'react-router';

const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: 'logto-session',
    maxAge: 14 * 24 * 60 * 60,
    secrets: [process.env.SESSION_SECRET ?? 'secr3tSession'],
  },
});

export const logto = makeLogtoReactRouter(
  {
    endpoint: process.env.LOGTO_ENDPOINT || "",
    appId: process.env.LOGTO_APP_ID || "",
    appSecret: process.env.LOGTO_APP_SECRET,
    baseUrl: process.env.LOGTO_BASE_URL ?? 'http://localhost:5173',
  },
  { sessionStorage }
);
