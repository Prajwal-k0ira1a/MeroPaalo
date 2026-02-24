import Display from "../model/tokenDisplay.model.js";

export const getDisplay = async (req, res) => {
  const { department, counter } = req.query;
  const filter = {};
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