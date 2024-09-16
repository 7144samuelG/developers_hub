import {
    convexAuthNextjsMiddleware,
    isAuthenticatedNextjs,
    createRouteMatcher,
    nextjsMiddlewareRedirect,
  } from "@convex-dev/auth/nextjs/server";
  
  const isPublicPage = createRouteMatcher(["/"]);
   
  export default convexAuthNextjsMiddleware((request) => {
    if (!isPublicPage(request) && !isAuthenticatedNextjs()) {
      return nextjsMiddlewareRedirect(request, "/");
    } 
    if (isPublicPage(request) && isAuthenticatedNextjs()) {
      return nextjsMiddlewareRedirect(request, "/home/projects");
    } 
  });
  export const config = {
    // The following matcher runs middleware on all routes
    // except static assets.
    matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
  };
  