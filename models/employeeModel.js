const db = require("../config/db");

// Get Employees
exports.getEmployees = async (page = 1, limit = 10) => {
  const offset = (page - 1) * limit;
  
  const [rows] = await db.query(
    "SELECT * FROM employees WHERE status != 'D' LIMIT ? OFFSET ?",
    [limit, offset]
  );
  
  const [countResult] = await db.query(
    "SELECT COUNT(*) as total FROM employees WHERE status != 'D'"
  );
  
  return {
    data: rows,
    total: countResult[0].total,
    page,
    limit
  };
};

// Get Employee by ID
exports.getEmployeeById = async (id) => {
  const [rows] = await db.query(
    "SELECT * FROM employees WHERE id = ? AND status != 'D'",
    [id]
  );
  return rows[0];
};

// Create Employee
exports.createEmployee = async (data) => {
  const { name, age, city } = data;

  const [result] = await db.query(
    "INSERT INTO employees (name, age, city) VALUES (?, ?, ?)",
    [name, age, city]
  );

  return result;
};

// Update Employee
exports.updateEmployee = async (id, data) => {
  const updates = [];
  const values = [];

  if (data.name !== undefined) {
    updates.push("name=?");
    values.push(data.name);
  }
  if (data.age !== undefined) {
    updates.push("age=?");
    values.push(data.age);
  }
  if (data.city !== undefined) {
    updates.push("city=?");
    values.push(data.city);
  }

  if (updates.length === 0) {
    throw new Error("No fields to update");
  }

  values.push(id);

  const [result] = await db.query(
    `UPDATE employees SET ${updates.join(", ")} WHERE id=?`,
    values
  );

  return result;
};

// Soft Delete
exports.deleteEmployee = async (id) => {
  const [result] = await db.query(
    "UPDATE employees SET status='D' WHERE id=?",
    [id]
  );

  return result;
};