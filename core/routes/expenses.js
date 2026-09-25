import express from "express";
import { query } from "../db.js";
import { authenticateToken } from "../middleware/auth.js";
import {
  validateExpense,
  handleValidationErrors,
  sanitizeInput,
} from "../middleware/security.js";

const router = express.Router();

router.use(authenticateToken);

router.get("/", async (req, res) => {
  try {
    const { page = 1, limit = 50, category, startDate, endDate } = req.query;
    const offset = (page - 1) * limit;

    let queryText = `
      SELECT id, description, amount, category, date, created_at, updated_at
      FROM expenses 
      WHERE user_id = $1
    `;
    const queryParams = [req.user.id];
    let paramCount = 1;

    if (category) {
      paramCount++;
      queryText += ` AND category = $${paramCount}`;
      queryParams.push(category);
    }

    if (startDate) {
      paramCount++;
      queryText += ` AND date >= $${paramCount}`;
      queryParams.push(startDate);
    }

    if (endDate) {
      paramCount++;
      queryText += ` AND date <= $${paramCount}`;
      queryParams.push(endDate);
    }

    queryText += ` ORDER BY date DESC, created_at DESC LIMIT $${paramCount + 1} OFFSET $${paramCount + 2}`;
    queryParams.push(limit, offset);

    const result = await query(queryText, queryParams);

    const countResult = await query(
      "SELECT COUNT(*) as total FROM expenses WHERE user_id = $1",
      [req.user.id],
    );

    const total = parseInt(countResult.rows[0].total);
    const totalPages = Math.ceil(total / limit);

    res.json({
      expenses: result.rows,
      pagination: {
        currentPage: parseInt(page),
        totalPages,
        totalItems: total,
        itemsPerPage: parseInt(limit),
      },
    });
  } catch (error) {
    console.error("Error fetching expenses:", error);
    res.status(500).json({
      error: "Failed to fetch expenses",
      message: "Internal server error",
    });
  }
});

router.post(
  "/",
  sanitizeInput,
  validateExpense,
  handleValidationErrors,
  async (req, res) => {
    const { description, amount, category, date } = req.body;

    try {
      const result = await query(
        `INSERT INTO expenses (user_id, description, amount, category, date) 
         VALUES ($1, $2, $3, $4, $5) 
         RETURNING id, description, amount, category, date, created_at, updated_at`,
        [req.user.id, description, parseFloat(amount), category, date],
      );

      const newExpense = result.rows[0];

      res.status(201).json({
        message: "Expense added successfully",
        expense: newExpense,
      });
    } catch (error) {
      console.error("Error adding expense:", error);
      res.status(500).json({
        error: "Failed to add expense",
        message: "Internal server error",
      });
    }
  },
);

router.put(
  "/:id",
  sanitizeInput,
  validateExpense,
  handleValidationErrors,
  async (req, res) => {
    const { id } = req.params;
    const { description, amount, category, date } = req.body;

    try {
      const result = await query(
        `UPDATE expenses 
         SET description = $1, amount = $2, category = $3, date = $4, updated_at = CURRENT_TIMESTAMP
         WHERE id = $5 AND user_id = $6 
         RETURNING id, description, amount, category, date, created_at, updated_at`,
        [description, parseFloat(amount), category, date, id, req.user.id],
      );

      if (result.rows.length === 0) {
        return res.status(404).json({
          error: "Expense not found",
          message:
            "Expense not found or you do not have permission to update it",
        });
      }

      res.json({
        message: "Expense updated successfully",
        expense: result.rows[0],
      });
    } catch (error) {
      console.error("Error updating expense:", error);
      res.status(500).json({
        error: "Failed to update expense",
        message: "Internal server error",
      });
    }
  },
);

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const result = await query(
      "DELETE FROM expenses WHERE id = $1 AND user_id = $2",
      [id, req.user.id],
    );

    if (result.rowCount === 0) {
      return res.status(404).json({
        error: "Expense not found",
        message: "Expense not found or you do not have permission to delete it",
      });
    }

    res.json({
      message: "Expense deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting expense:", error);
    res.status(500).json({
      error: "Failed to delete expense",
      message: "Internal server error",
    });
  }
});

router.get("/stats", async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    let dateFilter = "";
    const queryParams = [req.user.id];
    let paramCount = 1;

    if (startDate && endDate) {
      paramCount++;
      dateFilter = ` AND date BETWEEN $${paramCount} AND $${paramCount + 1}`;
      queryParams.push(startDate, endDate);
    }

    const totalResult = await query(
      `SELECT 
        COUNT(*) as total_expenses,
        COALESCE(SUM(amount), 0) as total_amount,
        COALESCE(AVG(amount), 0) as average_amount
       FROM expenses 
       WHERE user_id = $1 ${dateFilter}`,
      queryParams,
    );

    const categoryResult = await query(
      `SELECT 
        category,
        COUNT(*) as count,
        SUM(amount) as total_amount
       FROM expenses 
       WHERE user_id = $1 ${dateFilter}
       GROUP BY category 
       ORDER BY total_amount DESC`,
      queryParams,
    );

    const monthlyResult = await query(
      `SELECT 
        DATE_TRUNC('month', date) as month,
        COUNT(*) as count,
        SUM(amount) as total_amount
       FROM expenses 
       WHERE user_id = $1 ${dateFilter}
       GROUP BY DATE_TRUNC('month', date)
       ORDER BY month DESC
       LIMIT 12`,
      queryParams,
    );

    res.json({
      summary: totalResult.rows[0],
      byCategory: categoryResult.rows,
      byMonth: monthlyResult.rows,
    });
  } catch (error) {
    console.error("Error fetching expense stats:", error);
    res.status(500).json({
      error: "Failed to fetch expense statistics",
      message: "Internal server error",
    });
  }
});

export default router;
