const db = require('../db/db'); // ✅ small path fix

async function createUsersTable() {
  const createUsersTableQuery = `
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      username VARCHAR(100) NOT NULL,
      email VARCHAR(255) NOT NULL,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      UNIQUE (username, email)
    );
  `;

  try {
    await db.query(createUsersTableQuery);
    console.log("✅ Users table created successfully");
  } catch (e) {
    console.error("❌ Error while creating users table:", e);
  }
}

async function insertUser(username, email) {
  const insertUserQuery = `
    INSERT INTO users (username, email)
    VALUES ($1, $2)
    ON CONFLICT (username, email) DO NOTHING
    RETURNING *;
  `;

  try {
    const result = await db.query(insertUserQuery, [username, email]);
    if (result.rows.length > 0) {
      console.log("✅ User inserted:", result.rows[0]);
    } else {
      console.log(`⚠️ User (${username}, ${email}) already exists. Skipping insert.`);
    }
  } catch (e) {
    console.error("❌ Error while inserting user:", e);
  }
}

async function fetchAllUsers() {
  const getAllUsersQuery = "SELECT * FROM users";

  try {
    const result = await db.query(getAllUsersQuery);
    console.log("Fetched all users:", result.rows);
    return result.rows;
  } catch (e) {
    console.error("Error while fetching users:", e);
    return [];
  }
}


async function updateUserInfo(username, email) {
  const updateUserInfoQuery = `
    UPDATE users
    SET email = $2
    WHERE username = $1
    RETURNING *;
  `;

  try {
    const res = await db.query(updateUserInfoQuery, [username, email]);
    if (res.rowCount > 0) {
      console.log("✅ User updated successfully!", res.rows[0]);
      return res.rows[0];
    } else {
      console.log("⚠️ No user found with given username.");
      return null;
    }
  } catch (error) {
    console.error("❌ Error while updating user:", error);
    return null;
  }
}


async function deleteInfo(username) {
  const deleteQuery = `
    DELETE FROM users
    WHERE username = $1
    RETURNING *;
  `;

  try {
    const res = await db.query(deleteQuery, [username]);
    if (res.rows.length > 0) {
      console.log(`✅ User '${username}' deleted successfully.`);
      return res.rows[0];
    } else {
      console.log(`⚠️ No user found with username '${username}'.`);
      return null;
    }
  } catch (e) {
    console.error("❌ Error while deleting user:", e);
    return null;
  }
}

module.exports = { createUsersTable, insertUser, fetchAllUsers, updateUserInfo, deleteInfo };
