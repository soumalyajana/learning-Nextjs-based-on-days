// src/actions/seed-users.js
import connectToDB from "../database/index.js";
import User from "../models/user.js";

const users = [
  { firstName: "Soumalya", lastName: "Jana", email: "soumalya@example.com", address: "123, Green Street, Medinipur, West Bengal" },
  { firstName: "John", lastName: "Doe", email: "john.doe@example.com", address: "45, Blue Avenue, Kolkata, West Bengal" },
  { firstName: "Alice", lastName: "Smith", email: "alice.smith@example.com", address: "78, Red Road, Delhi" },
  { firstName: "Bob", lastName: "Johnson", email: "bob.johnson@example.com", address: "99, Yellow Lane, Mumbai" },
  { firstName: "Jane", lastName: "Brown", email: "jane.brown@example.com", address: "56, Orange Street, Chennai" },
  { firstName: "Rahul", lastName: "Sharma", email: "rahul.sharma@example.com", address: "21, Park Street, Pune, Maharashtra" },
  { firstName: "Priya", lastName: "Patel", email: "priya.patel@example.com", address: "10, Lotus Avenue, Ahmedabad, Gujarat" },
  { firstName: "Arjun", lastName: "Mehta", email: "arjun.mehta@example.com", address: "8, Silver Road, Jaipur, Rajasthan" },
  { firstName: "Neha", lastName: "Reddy", email: "neha.reddy@example.com", address: "12, Lake View, Hyderabad, Telangana" },
  { firstName: "Vikram", lastName: "Kapoor", email: "vikram.kapoor@example.com", address: "7, Palm Street, Chandigarh" },
  { firstName: "Sita", lastName: "Iyer", email: "sita.iyer@example.com", address: "34, Coconut Lane, Kochi, Kerala" },
  { firstName: "Ravi", lastName: "Nair", email: "ravi.nair@example.com", address: "22, Hill Road, Bengaluru, Karnataka" },
  { firstName: "Meera", lastName: "Das", email: "meera.das@example.com", address: "5, Flower Market, Bhubaneswar, Odisha" },
  { firstName: "Karan", lastName: "Singh", email: "karan.singh@example.com", address: "77, MG Road, Gurgaon, Haryana" },
  { firstName: "Ananya", lastName: "Roy", email: "ananya.roy@example.com", address: "15, Victoria Street, Siliguri, West Bengal" },
];

async function insertUsers() {
  await connectToDB();
  await User.insertMany(users);
  console.log("✅ Users inserted successfully!");
  process.exit();
}

insertUsers();
