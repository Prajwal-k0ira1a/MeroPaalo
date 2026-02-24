import Token from "../model/token.model.js";
import QueueDay from "../model/queueDay.model.js";
import TokenHistory from "../model/tokenHistory.model.js";
import Display from "../model/tokenDisplay.model.js";

const pad = (n, width = 3) => String(n).padStart(width, "0");

// hackathon-friendly: retry if unique index collision happens
const createTokenWithRetry = async ({ department, queueDay, customer }) => {
  for (let i = 0; i < 5; i++) {
    const count = await Token.countDocuments({ queueDay });
    const tokenNumber = pad(count + 1);

    try {
      return await Token.create({ tokenNumber, department, queueDay, customer });
    } catch (e) {
      // duplicate key => retry
      if (String(e?.message || "").includes("E11000")) continue;
      throw e;
    }
  }
  throw new Error("Failed to generate token (too much concurrency). Try again.");
};

export const issueToken = async (req, res) => {
  const { department, date } = req.body;

  if (!department) {
    res.status(400);
    throw new Error("department is required");
  }

  const targetDate = date ? new Date(date) : new Date();
  targetDate.setHours(0, 0, 0, 0);

  const queueDay = await QueueDay.findOne({ department, date: targetDate, status: "active" });
  if (!queueDay) {
    res.status(400);
    throw new Error("QueueDay is not active for this department/date");
  }

  const customerId = req.user?._id; // customer if logged in; optional
  const token = await createTokenWithRetry({ department, queueDay: queueDay._id, customer: customerId });

  await TokenHistory.create({ token: token._id, status: "waiting", note: "Token issued" });

  res.status(201).json({ success: true, data: token });
};

export const listTokens = async (req, res) => {
  const { department, queueDay, status } = req.query;
  const filter = {};
  if (department) filter.department = department;
  if (queueDay) filter.queueDay = queueDay;
  if (status) filter.status = status;

  const tokens = await Token.find(filter)
    .populate("department")
    .populate("queueDay")
    .populate("customer", "-password")
    .sort({ issuedAt: 1 });

  res.json({ success: true, data: tokens });
};

const setStatus = async ({ tokenId, status, counterId, note }) => {
  const token = await Token.findById(tokenId);
  if (!token) throw new Error("Token not found");

  token.status = status;
  if (status === "called") token.calledAt = new Date();
  if (status === "completed") token.completedAt = new Date();

  await token.save();

  await TokenHistory.create({
    token: token._id,
    counter: counterId,
    status,
    note,
  });

  // update display for department + counter
  if (counterId) {
    await Display.findOneAndUpdate(
      { department: token.department, counter: counterId },
      { department: token.department, counter: counterId, currentToken: token._id, updatedAt: new Date() },
      { upsert: true, new: true }
    );
  }

  return token;
};

export const callToken = async (req, res) => {
  const { counterId } = req.body;
  const token = await setStatus({ tokenId: req.params.id, status: "called", counterId, note: "Called to counter" });
  res.json({ success: true, data: token });
};

export const serveToken = async (req, res) => {
  const { counterId } = req.body;
  const token = await setStatus({ tokenId: req.params.id, status: "serving", counterId, note: "Service started" });
  res.json({ success: true, data: token });
};

export const completeToken = async (req, res) => {
  const { counterId } = req.body;
  const token = await setStatus({ tokenId: req.params.id, status: "completed", counterId, note: "Service completed" });
  res.json({ success: true, data: token });
};

export const missToken = async (req, res) => {
  const { counterId } = req.body;
  const token = await setStatus({ tokenId: req.params.id, status: "missed", counterId, note: "Customer missed" });
  res.json({ success: true, data: token });
};

export const cancelToken = async (req, res) => {
  const token = await setStatus({ tokenId: req.params.id, status: "cancelled", note: "Cancelled" });
  res.json({ success: true, data: token });
};