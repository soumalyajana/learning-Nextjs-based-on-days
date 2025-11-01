const express = require("express");
const router = express.Router();

const {
  createUsersTable,
  insertUser,
  fetchAllUsers,
  updateUserInfo,
  deleteInfo,
} = require("../concepts/basics-queries");

// ✅ GET all users
router.get("/fetch-all-users", async (req, res) => {
  try {
    const users = await fetchAllUsers();
    res.json(users);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.post("/add-user", async (req, res) => {
  console.log("POST /add-user body:", req.body); // debug line
  const { username, email } = req.body;
  const user = await insertUser(username, email);
  res.json(user);
});


// ✅ PUT update user info
router.put("/", async (req, res) => {
  const { username, newEmail } = req.body;
  const updatedUser = await updateUserInfo(username, newEmail);

  if (updatedUser) res.json(updatedUser);
  else res.status(404).json({ message: "User not found" });
});

// ✅ DELETE user
router.delete("/", async (req, res) => {
  const { username } = req.body;
  const deletedUser = await deleteInfo(username);

  if (deletedUser) res.json(deletedUser);
  else res.status(404).json({ message: "User not found" });
});

module.exports = router;
