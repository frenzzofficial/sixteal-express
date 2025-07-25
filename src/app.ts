import express, {
  type Request,
  type Response,
  type NextFunction,
} from "express";
import path from "path";

const createApp = async (): Promise<express.Express> => {
  const app = express();

  // Middleware
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Static assets
  const viewsPath = path.join(process.cwd(), "public", "views");
  app.use(express.static(viewsPath));

  // Routes
  app.get(["/", "/index", "/index.html"], (_req: Request, res: Response) => {
    res.type("html").sendFile(path.join(viewsPath, "index.html"));
  });

  app.get("/api/health", (_req: Request, res: Response) => {
    res.status(200).json({ message: "api is working" });
  });

  // Basic 404 handler
  app.use((_req: Request, res: Response) => {
    res.status(404).json({ error: "Not Found" });
  });

  // Global error handler
  app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
    console.error("Unhandled error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  });

  return app;
};

// Ensure the promise is handled
const appPromise = createApp();

export default appPromise;
