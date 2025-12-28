import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import compression from "compression";
import helmet from "helmet";

const DIRNAME = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || "127.0.0.1";

let request_count = 0;

// 1. Security: Sets various HTTP headers to protect your app
app.use(helmet());

// 2. Performance: Compresses responses (Gzip/Brotli) to reduce file size
app.use(compression());

// 3. Static Serving: Serve files from the 'dist' folder with long-term caching
app.use(
    express.static(path.join(DIRNAME, "dist"), {
        maxAge: "1y", // Cache assets for 1 year (Vite uses hashed filenames)
        immutable: true, // It won't get any changes even after a year so, stop asking for changes, browser!!
        index: false, // Handled by the catch-all route below
    }),
);

// 4. SPA Routing: Redirect all non-file requests to index.html
app.get("/{*splat}", (req, res) => {
    request_count += 1;
    console.log(`(#${request_count}) Request Coming!`);
    res.sendFile(path.join(DIRNAME, "dist", "index.html"));
});

app.listen(PORT, HOST, () => {
    console.log(`🚀 Production server running at http://${HOST}:${PORT}`);
});
