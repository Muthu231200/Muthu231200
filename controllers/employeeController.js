const employeeModel = require("../models/employeeModel");

exports.getEmployees = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    
    const result = await employeeModel.getEmployees(page, limit);
    res.status(200).json({ 
      statusCode: 200, 
      status: "success", 
      data: result.data,
      pagination: {
        page: result.page,
        limit: result.limit,
        total: result.total,
        totalPages: Math.ceil(result.total / result.limit)
      }
    });
  } catch (error) {
    res.status(500).json({ statusCode: 500, status: "error", message: error.message });
  }
};

exports.getEmployeeById = async (req, res) => {
  try {
    const employee = await employeeModel.getEmployeeById(req.params.id);
    if (!employee) {
      return res.status(404).json({ statusCode: 404, status: "error", message: "Employee not found" });
    }
    res.status(200).json({ statusCode: 200, status: "success", data: employee });
  } catch (error) {
    res.status(500).json({ statusCode: 500, status: "error", message: error.message });
  }
};

exports.createEmployee = async (req, res) => {
  try {
    await employeeModel.createEmployee(req.body);
    res.status(201).json({ statusCode: 201, status: "success", message: "Employee created" });
  } catch (error) {
    res.status(500).json({ statusCode: 500, status: "error", message: error.message });
  }
};

exports.updateEmployee = async (req, res) => {
  try {
    await employeeModel.updateEmployee(req.params.id, req.body);
    res.status(200).json({ statusCode: 200, status: "success", message: "Employee updated" });
  } catch (error) {
    res.status(500).json({ statusCode: 500, status: "error", message: error.message });
  }
};

exports.deleteEmployee = async (req, res) => {
  try {
    await employeeModel.deleteEmployee(req.params.id);
    res.status(200).json({ statusCode: 200, status: "success", message: "Employee deleted" });
  } catch (error) {
    res.status(500).json({ statusCode: 500, status: "error", message: error.message });
  }
};