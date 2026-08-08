import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

let users = [];
let expenses = [];
let idCounter = 1;
let expCounter = 1;

// ----------------------------------------------------
// USER CONTROLLERS
// ----------------------------------------------------
export const addEmployee = async (req, res) => {
  try {
    const { employeeId, name, email, password } = req.body;
    if (!employeeId || !name || !email || !password) return res.status(400).json({ success: false, message: "All fields required" });
    if (users.find(u => u.email === email)) return res.status(400).json({ success: false, message: "Email already exists" });

    const newUser = { id: idCounter++, employeeId, name, email, password, role: 'employee' };
    users.push(newUser);
    return res.status(201).json({ success: true, message: "Employee added successfully", data: newUser });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const addManager = async (req, res) => {
  try {
    const { employeeId, name, email, password } = req.body;
    if (!employeeId || !name || !email || !password) return res.status(400).json({ success: false, message: "All fields required" });
    if (users.find(u => u.email === email)) return res.status(400).json({ success: false, message: "Email already exists" });

    const newUser = { id: idCounter++, employeeId, name, email, password, role: 'manager' };
    users.push(newUser);
    return res.status(201).json({ success: true, message: "Manager added successfully", data: newUser });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getUsers = async (req, res) => {
  try {
    return res.status(200).json({ success: true, message: "Users fetched successfully", data: users });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// ----------------------------------------------------
// EXPENSE CONTROLLERS
// ----------------------------------------------------
export const addExpense = async (req, res) => {
  try {
    const { user_id, name, amount, category, receipt } = req.body;
    if (!name || !amount || !category) return res.status(400).json({ success: false, message: "Required expense fields missing" });

    const newExp = {
      id: `EXP-${expCounter++}`,
      user_id: user_id || 1,
      name,
      amount: parseFloat(amount),
      category,
      receipt: receipt || null,
      status: 'pending',
      approval_stage: 'manager'
    };
    expenses.push(newExp);
    return res.status(201).json({ success: true, message: "Expense added", data: newExp });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getExpenses = async (req, res) => {
  try {
    const { status } = req.query;
    let filtered = expenses;
    if (status) {
      filtered = expenses.filter(e => e.status.toLowerCase() === status.toLowerCase());
    }
    return res.status(200).json({ success: true, message: "Expenses fetched", data: filtered });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const approveExpense = async (req, res) => {
  try {
    const { expense_id, role } = req.body;
    if (!expense_id || !role) return res.status(400).json({ success: false, message: "expense_id and role required" });

    const exp = expenses.find(e => e.id === expense_id);
    if (!exp) return res.status(404).json({ success: false, message: "Expense not found" });

    if (exp.status !== 'pending') return res.status(400).json({ success: false, message: `Cannot approve ${exp.status} expense` });

    if (role === 'manager' && exp.approval_stage === 'manager') {
      exp.approval_stage = 'finance';
      return res.status(200).json({ success: true, message: "Advanced to Finance", data: exp });
    } else if (role === 'finance' && exp.approval_stage === 'finance') {
      exp.approval_stage = 'director';
      return res.status(200).json({ success: true, message: "Advanced to Director", data: exp });
    } else if (role === 'director' && exp.approval_stage === 'director') {
      exp.status = 'approved';
      return res.status(200).json({ success: true, message: "Fully Approved", data: exp });
    } else {
      return res.status(400).json({ success: false, message: "Invalid approval role sequence" });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const rejectExpense = async (req, res) => {
  try {
    const { expense_id } = req.body;
    if (!expense_id) return res.status(400).json({ success: false, message: "expense_id required" });

    const exp = expenses.find(e => e.id === expense_id);
    if (!exp) return res.status(404).json({ success: false, message: "Expense not found" });

    exp.status = 'rejected';
    return res.status(200).json({ success: true, message: "Expense rejected", data: exp });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// ----------------------------------------------------
// HYBRID CONTROLLERS (Search & Analytics)
// ----------------------------------------------------
export const searchAll = async (req, res) => {
  try {
    const { q } = req.query;
    if (!q) return res.status(200).json({ success: true, message: "Empty query", data: { users: [], expenses: [] } });

    const keyword = q.toLowerCase();
    const uMatch = users.filter(u => u.name.toLowerCase().includes(keyword) || u.email.toLowerCase().includes(keyword));
    const eMatch = expenses.filter(e => e.category.toLowerCase().includes(keyword) || e.amount.toString().includes(keyword) || e.name.toLowerCase().includes(keyword));

    return res.status(200).json({ success: true, message: "Search complete", data: { users: uMatch, expenses: eMatch } });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getAnalytics = async (req, res) => {
  try {
    let total = 0;
    const categoryBreakdown = {};

    expenses.forEach(e => {
      // analytics only count pure cost footprint, optional logic could restrict only "approved" 
      total += e.amount;
      if (categoryBreakdown[e.category]) {
        categoryBreakdown[e.category] += e.amount;
      } else {
        categoryBreakdown[e.category] = e.amount;
      }
    });

    return res.status(200).json({ 
      success: true, 
      message: "Analytics generated", 
      data: {
        total,
        categories: categoryBreakdown
      } 
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// ----------------------------------------------------
// ROUTER BINDINGS
// ----------------------------------------------------
const router = express.Router();

// User Bindings
router.post('/add-employee', addEmployee);
router.post('/add-manager', addManager);
router.get('/users', getUsers);

// Expense Bindings
router.post('/expenses/add', addExpense);
router.get('/expenses', getExpenses);
router.post('/expenses/approve', approveExpense);
router.post('/expenses/reject', rejectExpense);

// Hybrid Bindings
router.get('/search', searchAll);
router.get('/analytics', getAnalytics);

app.use('/api', router);

const PORT = 5000;
app.listen(PORT, () => console.log(`Backend server running on port ${PORT}`));
