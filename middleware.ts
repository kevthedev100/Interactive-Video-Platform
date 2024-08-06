// middleware.ts
import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  // Füge hier die public-interactive-Route hinzu, damit sie ohne Authentifizierung zugänglich ist
  publicRoutes: ["/", "/api/webhook", "/public-interactive/(.*)", "/api/interactive-videos/:id", "/public-interactive/:path*"],
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
