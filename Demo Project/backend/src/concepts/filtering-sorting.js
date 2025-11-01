const db = require('../db/db');

// ✅ Get users with condition safely
async function getUsersWhere(column, value) {
  const query = `
    SELECT * FROM users
    WHERE ${column} = $1
  `;
  try {
    const res = await db.query(query, [value]);
    return res.rows;
  } catch (error) {
    console.error("Error fetching users with condition:", error);
  }
}

// ✅ Get sorted users safely
async function getSortedUser(column = "id", order = "ASC") {
  const allowedOrders = ["ASC", "DESC"];
  if (!allowedOrders.includes(order.toUpperCase())) order = "ASC"; // prevent injection

  const query = `
    SELECT * FROM users
    ORDER BY ${column} ${order}
  `;
  try {
    const result = await db.query(query);
    return result.rows;
  } catch (error) {
    console.error("Error fetching sorted users:", error);
  }
}

// ✅ Get paginated users safely
async function getPaginatedUsers(limit, offset) {
  const query = `
    SELECT * FROM users
    LIMIT $1 OFFSET $2
  `;
  try {
    const result = await db.query(query, [limit, offset]);
    return result.rows;
  } catch (error) {
    console.error("Error fetching paginated users:", error);
  }
}

module.exports = { getUsersWhere, getSortedUser, getPaginatedUsers };
