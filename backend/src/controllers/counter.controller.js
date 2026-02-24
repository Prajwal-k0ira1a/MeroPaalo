import Counter from "../model/counter.model.js";
import Department from "../model/department.model.js";
import User from "../model/user.model.js";

export const createCounter = async (req, res) => {
  const institution = req.user.institution;
  const { department } = req.body;

  if (!institution) {
    res.status(400);
    throw new Error("Admin must belong to an institution");
  }
  if (!department) {
    res.status(400);
    throw new Error("department is required");
  }

  const dept = await Department.findOne({ _id: department, institution });
  if (!dept) {
    res.status(404);
    throw new Error("Department not found for this institution");
  }

  const counter = await Counter.create({ ...req.body, institution });
  res.status(201).json({ success: true, data: counter });
};

export const getCounters = async (req, res) => {
  const institution = req.user?.institution || req.query.institution;
  const { department } = req.query;

  if (!institution) {
    res.status(400);
    throw new Error("institution is required");
  }

  const filter = { institution };
  if (department) filter.department = department;

  const counters = await Counter.find(filter)
    .populate("department")
    .populate("staff", "-password")
    .sort({ createdAt: -1 });

  res.json({ success: true, data: counters });
};

export const updateCounter = async (req, res) => {
  const institution = req.user.institution;
  const counter = await Counter.findOneAndUpdate({ _id: req.params.id, institution }, req.body, {
    new: true,
    runValidators: true,
  });
  if (!counter) {
    res.status(404);
    throw new Error("Counter not found");
  }
  res.json({ success: true, data: counter });
};

export const assignStaff = async (req, res) => {
  const institution = req.user.institution;
  const { staffId } = req.body;

  const counter = await Counter.findOne({ _id: req.params.id, institution });
  if (!counter) {
    res.status(404);
    throw new Error("Counter not found");
  }

  if (staffId) {
    const staff = await User.findById(staffId).select("role institution");
    if (!staff) {
      res.status(404);
      throw new Error("Staff user not found");
    }
    if (!["staff", "admin"].includes(staff.role)) {
      res.status(400);
      throw new Error("User is not staff/admin");
    }
    if (String(staff.institution) !== String(institution)) {
      res.status(400);
      throw new Error("Staff user must belong to same institution");
    }
  }

  counter.staff = staffId || null;
  await counter.save();

  res.json({ success: true, data: counter });
};
