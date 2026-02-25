import Department from "../model/department.model.js";

export const createDepartment = async (req, res) => {
  const { name, institutionId } = req.body;

  const department = await Department.create({
    name,
    institution: institutionId,
  });

  res.status(201).json(department);
};

export const getDepartments = async (req, res) => {
  const institution = req.user?.institution || req.query.institution;
  if (!institution) {
    res.status(400);
    throw new Error("institution is required");
  }
  const list = await Department.find({ institution }).sort({ createdAt: -1 });
  res.json({ success: true, data: list });
};

export const getDepartment = async (req, res) => {
  const institution = req.user?.institution || req.query.institution;
  if (!institution) {
    res.status(400);
    throw new Error("institution is required");
  }
  const dept = await Department.findOne({ _id: req.params.id, institution });
  if (!dept) {
    res.status(404);
    throw new Error("Department not found");
  }
  res.json({ success: true, data: dept });
};

export const updateDepartment = async (req, res) => {
  const institution = req.user.institution;
  const dept = await Department.findOneAndUpdate({ _id: req.params.id, institution }, req.body, {
    new: true,
    runValidators: true,
  });
  if (!dept) {
    res.status(404);
    throw new Error("Department not found");
  }
  res.json({ success: true, data: dept });
};

export const deleteDepartment = async (req, res) => {
  const institution = req.user.institution;
  const dept = await Department.findOne({ _id: req.params.id, institution });
  if (!dept) {
    res.status(404);
    throw new Error("Department not found");
  }
  await dept.deleteOne();
  res.json({ success: true, message: "Department deleted" });
};
