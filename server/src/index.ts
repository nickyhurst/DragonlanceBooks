import "dotenv/config";
import express from "express";
import cors from "cors";
import path from "path";
import { pool } from "./db";

const app = express();

app.use(cors());
app.use(express.json());

// If you want the server to also serve cover images in dev/prod,
// put them in server/public/covers/* and enable this:
app.use("/covers", express.static(path.join(process.cwd(), "public", "covers")));
app.use("/meta", express.static(path.join(process.cwd(), "public", "meta")));
app.use("/", express.static(path.join(process.cwd(), "public"))); // optional for logo, etc.


app.get("/api/health", (_req, res) => {
  res.json({ ok: true });
});

app.get("/api/books", async (_req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM books");
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch books" });
  }
});

const clientDist = path.join(process.cwd(), "..", "client", "dist");
app.use(express.static(clientDist));

app.get("/{*splat}", (_req, res) => {
  res.sendFile(path.join(clientDist, "index.html"));
});

const port = process.env.PORT ? Number(process.env.PORT) : 3001;
app.listen(port, () => {
  console.log(`API listening on http://localhost:${port}`);
});