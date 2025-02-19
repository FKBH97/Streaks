const express = require("express");
const { PrismaClient } = require("@prisma/client");
const authMiddleware = require("./Middlewares/authMiddleware");

const prisma = new PrismaClient();
const router = express.Router();


router.get("/", authMiddleware, async (req, res) => {
  const userId = req.user.id;

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { username: true, streak: true, longestStreak: true },
    });

    if (!user) return res.status(404).json({ error: "User not found" });

    res.json(user);
  } catch (error) {
    console.error("Error fetching streak:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
