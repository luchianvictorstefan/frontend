import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";
import { Provider } from "react-redux";
import { store } from "~/store";
import type { Route } from "./+types/root";
import "./app.css";

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <Outlet />
      </Provider>);
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let title = "Error";
  let message = "An unexpected error occurred.";
  let details = "Something went wrong while loading this page.";
  let action = "Please try refreshing the page or contact support if the problem persists.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    if (error.status === 404) {
      title = "Page Not Found";
      message = "The page you're looking for doesn't exist.";
      details = "Check the URL or return to the home page.";
    } else if (error.status === 503) {
      try {
        const errorData = JSON.parse(error.data);
        title = errorData.title || "Service Unavailable";
        message = errorData.message || "Unable to connect to the server.";
        details = errorData.details || "The backend service might be down.";
        action = errorData.action || "Please start the backend server (port 8081) and refresh the page.";
      } catch {
        title = "Service Unavailable";
        message = "Unable to connect to the backend server.";
        details = "The travel server might be down or there could be a network issue.";
        action = "Please start the backend server (port 8081) and refresh the page.";
      }
    } else {
      title = `Error ${error.status}`;
      message = error.statusText || "An error occurred while loading the page.";
    }
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <div className="mb-6">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">{title}</h1>
          <p className="text-gray-600 mb-4">{message}</p>
          <p className="text-sm text-gray-500 mb-6">{details}</p>
          <p className="text-sm text-blue-600 font-medium">{action}</p>
        </div>
        
        <div className="space-y-3">
          <button 
            onClick={() => window.location.reload()} 
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
          >
            Refresh Page
          </button>
          <a 
            href="/" 
            className="w-full block bg-gray-200 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-300 transition-colors"
          >
            Go to Home
          </a>
        </div>

        {stack && (
          <details className="mt-6 text-left">
            <summary className="text-sm text-gray-600 cursor-pointer hover:text-gray-800">
              Show technical details
            </summary>
            <pre className="mt-2 w-full p-4 bg-gray-100 rounded overflow-x-auto text-xs">
              <code>{stack}</code>
            </pre>
          </details>
        )}
      </div>
    </div>
  );
}
