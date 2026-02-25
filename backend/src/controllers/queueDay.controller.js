import QueueDay from "../model/queueDay.model.js";
import Token from "../model/token.model.js";
import Display from "../model/tokenDisplay.model.js";

const emitDept = (req, institutionId, departmentId, event, payload) => {
  const io = req.app.get("io");
  if (io) io.to(`inst:${institutionId}:dept:${departmentId}`).emit(event, payload);
};

export const getQueueDays = async (req, res) => {
  const institution = req.user?.institution || req.query.institution;
  if (!institution) {
    res.status(400);
    throw new Error("institution is required");
  }

  const { department } = req.query;
  const filter = { institution };
  if (department) filter.department = department;

  const list = await QueueDay.find(filter).populate("department").sort({ date: -1 });
  res.json({ success: true, data: list });
};

export const openQueueDay = async (req, res) => {
  const institution = req.user?.institution || req.body.institution || req.query.institution;
  const { department, date, startTime, endTime } = req.body;

  if (!institution) {
    res.status(400);
    throw new Error("institution is required");
  }
  if (!department || !date) {
    res.status(400);
    throw new Error("department and date are required");
  }

  const d = new Date(date);
  d.setHours(0, 0, 0, 0);

  const qd = await QueueDay.findOneAndUpdate(
    { institution, department, date: d },
    { institution, department, date: d, startTime, endTime, status: "active" },
    { upsert: true, new: true, runValidators: true }
  );

  emitDept(req, institution, department, "queue:statusChanged", { queueDayId: qd._id, status: qd.status });
  res.status(201).json({ success: true, data: qd });
};

export const closeQueueDay = async (req, res) => {
  const institution = req.user.institution;
  const qd = await QueueDay.findById(req.params.id);

  if (!qd) {
    res.status(404);
    throw new Error("QueueDay not found");
  }
  if (String(qd.institution) !== String(institution)) {
    res.status(403);
    throw new Error("Forbidden");
  }

  qd.status = "closed";
  await qd.save();

  emitDept(req, qd.institution, qd.department, "queue:statusChanged", { queueDayId: qd._id, status: qd.status });
  res.json({ success: true, data: qd });
};

export const pauseQueueDay = async (req, res) => {
  const institution = req.user.institution;
  const qd = await QueueDay.findById(req.params.id);

  if (!qd) {
    res.status(404);
    throw new Error("QueueDay not found");
  }
  if (String(qd.institution) !== String(institution)) {
    res.status(403);
    throw new Error("Forbidden");
  }
  if (qd.status === "closed") {
    res.status(400);
    throw new Error("Cannot pause a closed QueueDay");
  }

  qd.status = "paused";
  await qd.save();

  emitDept(req, qd.institution, qd.department, "queue:statusChanged", { queueDayId: qd._id, status: qd.status });
  res.json({ success: true, data: qd });
};

export const resumeQueueDay = async (req, res) => {
  const institution = req.user.institution;
  const qd = await QueueDay.findById(req.params.id);

  if (!qd) {
    res.status(404);
    throw new Error("QueueDay not found");
  }
  if (String(qd.institution) !== String(institution)) {
    res.status(403);
    throw new Error("Forbidden");
  }
  if (qd.status === "closed") {
    res.status(400);
    throw new Error("Cannot resume a closed QueueDay");
  }

  qd.status = "active";
  await qd.save();

  emitDept(req, qd.institution, qd.department, "queue:statusChanged", { queueDayId: qd._id, status: qd.status });
  res.json({ success: true, data: qd });
};

export const resetQueueDay = async (req, res) => {
  const institution = req.user.institution;
  const qd = await QueueDay.findById(req.params.id);

  if (!qd) {
    res.status(404);
    throw new Error("QueueDay not found");
  }
  if (String(qd.institution) !== String(institution)) {
    res.status(403);
    throw new Error("Forbidden");
  }

  const upd = await Token.updateMany(
    { institution, queueDay: qd._id, status: { $in: ["waiting", "called", "serving"] } },
    { $set: { status: "cancelled" } }
  );

  // clear display for department
  await Display.updateMany(
    { institution, department: qd.department },
    { $set: { currentToken: null, updatedAt: new Date() } }
  );

  emitDept(req, qd.institution, qd.department, "queue:reset", { queueDayId: qd._id });
  emitDept(req, qd.institution, qd.department, "display:updated", { department: qd.department });
  emitDept(req, qd.institution, qd.department, "dashboard:changed", { department: qd.department });

  res.json({
    success: true,
    data: { queueDayId: qd._id, cancelledCount: upd.modifiedCount ?? upd.nModified ?? 0 },
  });
};
