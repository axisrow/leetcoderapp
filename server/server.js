const express = require("express");
const cors = require("cors");
const path = require("path");
const database = require("./db.js");
const bcrypt = require("bcrypt");
const { SignJWT, jwtVerify } = require("jose");

const app = express();

app.use(express.json());
app.use(cors());

// Serve static files from dist (Expo export output)
app.use(express.static(path.join(__dirname, "../dist")));

// JWT secret as Uint8Array for jose
const getJwtSecret = () => {
  const secret = process.env.JWT_SECRET || "default-secret-change-me";
  return new TextEncoder().encode(secret);
};

// Helper function to create JWT token
async function createToken(userId) {
  return await new SignJWT({ id: userId })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("1h")
    .sign(getJwtSecret());
}

// Helper function to verify JWT token
async function verifyToken(token) {
  const { payload } = await jwtVerify(token, getJwtSecret());
  return payload;
}

database
  .raw("SELECT 1")
  .then(() => {
    console.log("Connected to database!");
  })
  .catch((error) => {
    console.error("Error connecting to database:", error);
  });

app.get("/api/easy", async (req, res) => {
  const easyTask = await database("problems")
    .where({
      difficulty: "Easy",
    })
    .select("*");
  res.json(easyTask);
});

app.get("/api/medium", async (req, res) => {
  const mediumTask = await database("problems")
    .where({
      difficulty: "Medium",
    })
    .select("*");
  res.json(mediumTask);
});

app.get("/api/hard", async (req, res) => {
  const hardTask = await database("problems")
    .where({
      difficulty: "Hard",
    })
    .select("*");
  res.json(hardTask);
});

app.get("/api/all", async (req, res) => {
  const allTask = await database("problems").select("*");
  res.json(allTask);
});

app.get("/select", async (req, res) => {
  const { titleSlug } = req.query;
  if (!titleSlug) {
    return res.status(400).json({ error: "titleSlug is required" });
  }
  try {
    const problem = await database("problems")
      .where("titleslug", titleSlug)
      .first();
    if (!problem) {
      return res.status(404).json({ error: "Problem not found" });
    }

    res.json({
      questionTitle: problem.title,
      question: problem.description || "",
      hints: [],
      difficulty: problem.difficulty,
      topics: problem.topics
    });
  } catch (error) {
    console.error("Error fetching problem:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/api/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const [user] = await database("users")
      .insert({ name, email, password: hashedPassword })
      .returning("*");

    const token = await createToken(user.id);

    res.json({ token });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ error: "Registration failed" });
  }
});

app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await database("users").where({ email }).first();

    if (!user) {
      return res.status(401).json({ error: "Invalid email" });
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(401).json({ error: "Invalid password" });
    }

    const token = await createToken(user.id);

    res.json({ token });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ error: "Login failed" });
  }
});

app.post("/api/refresh", async (req, res) => {
  try {
    const { refreshToken } = req.body;

    const payload = await verifyToken(refreshToken);

    if (!payload) {
      return res.status(401).json({ error: "Invalid refresh token" });
    }

    const newToken = await createToken(payload.id);

    res.json({ newToken });
  } catch (error) {
    console.error("Error refreshing token:", error);
    res.status(401).json({ error: "Invalid refresh token" });
  }
});

// SPA fallback - serve index.html for all non-API routes
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../dist", "index.html"));
});

app.listen(3001, () => {
  console.log("Server running on port 3001");
});
