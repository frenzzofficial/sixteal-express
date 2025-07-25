import dotenv from "dotenv";
import appPromise from "./app";
import process from "process";

// ✅ Load environment variables early
dotenv.config();

// ✅ Start server with safe async handling
const startServer = async (): Promise<void> => {
  try {
    const app = await appPromise;
    const PORT = 7164;

    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
      console.log(`📚 API docs: http://localhost:${PORT}/documentation`);
    });
  } catch (err) {
    console.error("❌ Failed to start server:", err);
    process.exit(1);
  }
};

startServer();
