import QueueDay from "../model/queueDay.model.js";
import Token from "../model/token.model.js";

export const getAdminDashboard = async (req, res) => {
  const institution = req.user.institution;
  const { department, date } = req.query;

  if (!institution) {
    res.status(400);
    throw new Error("Admin must belong to an institution");
  }
  if (!department) {
    res.status(400);
    throw new Error("department is required");
  }

  const targetDate = date ? new Date(date) : new Date();
  targetDate.setHours(0, 0, 0, 0);

  const queueDay = await QueueDay.findOne({
    institution,
    department,
    date: targetDate,
    status: { $in: ["active", "paused"] },
  }).select("_id status");

  const queueStatus = queueDay?.status || "closed";

  if (!queueDay) {
    return res.json({
      success: true,
      data: {
        institution,
        department,
        queueStatus,
        currentServingNumber: null,
        totalWaitingTokens: 0,
        tokensToday: 0,
        averageWaitTimeMinutes: 0,
        totalCompletedToday: 0,
      },
    });
  }

  const [waitingCount, tokensToday, completedToday] = await Promise.all([
    Token.countDocuments({
      institution,
      queueDay: queueDay._id,
      status: "waiting",
    }),
    Token.countDocuments({ institution, queueDay: queueDay._id }),
    Token.countDocuments({
      institution,
      queueDay: queueDay._id,
      status: "completed",
    }),
  ]);

  const currentServing = await Token.findOne({
    institution,
    queueDay: queueDay._id,
    status: { $in: ["called", "serving"] },
  })
    .sort({ calledAt: -1, issuedAt: -1 })
    .select("tokenNumber status");

  const recentCompleted = await Token.find({
    institution,
    queueDay: queueDay._id,
    status: "completed",
    issuedAt: { $ne: null },
    calledAt: { $ne: null },
  })
    .sort({ completedAt: -1 })
    .limit(50)
    .select("issuedAt calledAt");

  let averageWaitTimeMinutes = 0;
  if (recentCompleted.length) {
    const totalMs = recentCompleted.reduce(
      (sum, t) => sum + (t.calledAt - t.issuedAt),
      0,
    );
    averageWaitTimeMinutes = Math.max(
      0,
      Math.round(totalMs / recentCompleted.length / 60000),
    );
  }

  res.json({
    success: true,
    data: {
      institution,
      department,
      queueStatus,
      currentServingNumber: currentServing?.tokenNumber || null,
      totalWaitingTokens: waitingCount,
      tokensToday,
      averageWaitTimeMinutes,
      totalCompletedToday: completedToday,
    },
  });
};
