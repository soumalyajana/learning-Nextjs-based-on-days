const express = require("express");
const cors = require("cors");

const userRoutes = require("./src/routes/users.routes");
//const aggregationRoutes = require("./routes/aggregation.routes");


const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.redirect("/api/users/fetch-all-users");
});


// Register routes
app.use("/api/users", userRoutes);
//app.use("/api/aggregation", aggregationRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
