import QueueDay from "../model/queueDay.model.js";

export const openQueueDay = async (req, res) => {
  const { department, date, startTime, endTime } = req.body;
  if (!department || !date) {
    res.status(400);
    throw new Error("department and date are required");
  }

  const qd = await QueueDay.findOneAndUpdate(
    { department, date: new Date(date) },
    { department, date: new Date(date), startTime, endTime, status: "active" },
    { upsert: true, new: true, runValidators: true }
  );

  res.status(201).json({ success: true, data: qd });
};

export const closeQueueDay = async (req, res) => {
  const qd = await QueueDay.findById(req.params.id);
  if (!qd) {
    res.status(404);
    throw new Error("QueueDay not found");
  }
  qd.status = "closed";
  await qd.save();
  res.json({ success: true, data: qd });
};

export const getQueueDays = async (req, res) => {
  const { department } = req.query;
  const filter = department ? { department } : {};
  const list = await QueueDay.find(filter).populate("department").sort({ date: -1 });
  res.json({ success: true, data: list });
};