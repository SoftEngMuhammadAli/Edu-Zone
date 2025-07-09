const isProd = import.meta.env.MODE === "production";

export const BASE_URL = isProd
  ? "https://eduzone-jscm.onrender.com"
  : "http://localhost:5174";
