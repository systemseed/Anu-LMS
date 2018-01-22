// Define URL to use when making requsts from node.js server
// to the backend.
export const BACKEND_SERVER_URL = process.env.NODE_ENV !== 'production' ? process.env.BASE_URL : `${process.env.BASE_URL}/admin`;

// All client requests from the browser can be made simply to
// the subfolder.
export const BACKEND_CLIENT_URL = '/admin';

export const fileUrl = (url) => {
  // For local development replaces the absolute URL the backend with
  // relative for front-end rendering.
  if (url && process.env.NODE_ENV === 'development' && typeof window === 'undefined') {
    return url.replace(BACKEND_SERVER_URL, BACKEND_CLIENT_URL);
  }
  return url;
};
