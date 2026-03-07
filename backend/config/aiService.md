Create an Express app configuration file.

Requirements:
- Import express, cors, and body-parser
- Enable CORS
- Enable JSON request parsing
- Import prediction routes from routes/predictRoutes.js
- Mount route under /api
- Add a simple GET / route returning:
  { message: "EcoSort AI Backend Running" }
- Export the configured Express app