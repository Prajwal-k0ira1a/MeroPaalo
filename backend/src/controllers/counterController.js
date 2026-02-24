import Counter from "../model/counter.model.js";

export const createCounter = async (req, res) => {
  const counter = await Counter.create(req.body);
  res.status(201).json({ success: true, data: counter });
};

export const getCounters = async (req, res) => {
  const { department } = req.query;
  const filter = department ? { department } : {};
  const counters = await Counter.find(filter)
    .populate("department")
    .populate("staff", "-password")
    .sort({ createdAt: -1 });

  res.json({ success: true, data: counters });
};

export const updateCounter = async (req, res) => {
  const counter = await Counter.findByIdAndUpdate(req.params.id, req.body, {
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
  const { staffId } = req.body;
  const counter = await Counter.findById(req.params.id);
  if (!counter) {
    res.status(404);
    throw new Error("Counter not found");
  }
  counter.staff = staffId;
  await counter.save();
  res.json({ success: true, data: counter });
};