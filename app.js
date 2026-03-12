require("dotenv").config();

const express = require("express");
const employeeRoutes = require("./routes/employeeRoutes");

const app = express();

app.use(express.json());

app.use("/api", employeeRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});