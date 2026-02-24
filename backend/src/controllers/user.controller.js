import User from "../model/user.model.js";

//admin assigns role to a user
export const assignRole = async (req, res) => {
  const adminInstitution = req.user.institution;
  const { userId } = req.params;
  const { role } = req.body;

  if (!role || !["staff", "customer", "admin"].includes(role)) {
    res.status(400);
    throw new Error("role must be one of: staff, customer, admin");
  }

  const user = await User.findById(userId);
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  // When promoting to staff, attach the admin's institution
  if (role !== "customer") {
    if (!adminInstitution) {
      res.status(400);
      throw new Error("Admin must belong to an institution to assign staff/admin");
    }
    user.institution = adminInstitution;
  }

  user.role = role;
  await user.save();

  res.json({
    success: true,
    data: {
      id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
      institution: user.institution,
    },
  });
};

export const listUsers = async (req, res) => {
  const institution = req.user.institution;
  const { role } = req.query;

  const filter = {};
  if (role) filter.role = role;

  if (institution) {
    filter.$or = [{ institution }, { role: "customer", institution: null }];
  }

  const users = await User.find(filter).select("-password").sort({ createdAt: -1 });
  res.json({ success: true, data: users });
};
