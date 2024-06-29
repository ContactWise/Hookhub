/**
 * An array of routes that are accessible to everyone
 * @types {string[]}
 */
export const publicRoutes = ["/"];

/**
 * An array of routes that should be accessible for all users for authentication purposes.
 * If user logged in, they should be redirected to the dashboard page.
 * @types {string[]}
 */
export const authRoutes = ["/auth/signin"];

/*
 * Routes that start with this prefix are used for API authentication purpose. Should be open to all users
 * @types {string}
 */
export const apiAuthRoutes = "/api/auth";

/*
 * Default redirect URL after login
 * @types {string}
 */
export const DEFAULT_LOGIN_REDIRECT_URL = "/dashboard";
