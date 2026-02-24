import Department from "../model/department.model.js";
import QueueDay from "../model/queueDay.model.js";
import Institution from "../model/institution.model.js";

// public API to get queue info for a department
export const getQueueInfo = async (req, res) => {
  const { institution } = req.query;
  const { departmentId } = req.params;

  if (!institution) {
    res.status(400);
    throw new Error("institution is required");
  }

  const inst = await Institution.findById(institution).select("name status");
  if (!inst || inst.status !== "active") {
    res.status(404);
    throw new Error("Institution not found or inactive");
  }

  const dept = await Department.findOne({ _id: departmentId, institution }).select("name isActive");
  if (!dept || !dept.isActive) {
    res.status(404);
    throw new Error("Department not found or inactive");
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const qd = await QueueDay.findOne({
    institution,
    department: dept._id,
    date: today,
    status: { $in: ["active", "paused"] },
  }).select("status startTime endTime");

  res.json({
    success: true,
    data: {
      institutionId: inst._id,
      institutionName: inst.name,
      queueName: dept.name,
      queueStatus: qd?.status || "closed",
      startTime: qd?.startTime || null,
      endTime: qd?.endTime || null,
    },
  });
};
