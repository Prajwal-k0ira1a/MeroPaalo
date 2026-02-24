import Display from "../model/tokenDisplay.model.js";
import Token from "../model/token.model.js";
import QueueDay from "../model/queueDay.model.js";

// public display
export const getDisplay = async (req, res) => {
  const { institution, department, counter } = req.query;

  if (!institution || !department) {
    res.status(400);
    throw new Error("institution and department are required");
  }

  let displayRow = null;
  if (counter) {
    displayRow = await Display.findOne({ institution, department, counter }).populate({
      path: "currentToken",
      select: "tokenNumber status calledAt issuedAt",
    });
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const queueDay = await QueueDay.findOne({
    institution,
    department,
    date: today,
    status: { $in: ["active", "paused"] },
  }).select("_id status");

  let nowServing = displayRow?.currentToken ?? null;

  if (!nowServing && queueDay) {
    nowServing = await Token.findOne({
      institution,
      queueDay: queueDay._id,
      status: { $in: ["called", "serving"] },
    })
      .sort({ calledAt: -1, issuedAt: -1 })
      .select("tokenNumber status calledAt issuedAt");
  }

  let nextTwo = [];
  if (queueDay) {
    nextTwo = await Token.find({ institution, queueDay: queueDay._id, status: "waiting" })
      .sort({ issuedAt: 1 })
      .limit(2)
      .select("tokenNumber status issuedAt");
  }

  res.json({
    success: true,
    data: {
      institution,
      department,
      queueStatus: queueDay?.status || "closed",
      nowServing,
      nextTwo,
    },
  });
};

// staff/admin display
export const listDisplayRows = async (req, res) => {
  const institution = req.user.institution;
  const { department, counter } = req.query;

  const filter = { institution };
  if (department) filter.department = department;
  if (counter) filter.counter = counter;

  const rows = await Display.find(filter)
    .populate("department")
    .populate("counter")
    .populate({
      path: "currentToken",
      populate: [{ path: "department" }, { path: "queueDay" }],
    })
    .sort({ updatedAt: -1 });

  res.json({ success: true, data: rows });
};
