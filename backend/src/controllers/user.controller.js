import User from "../model/user.model.js";

// admin assigns role to a user
export const assignRole = async (req, res) => {
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
    },
  });
};

export const listUsers = async (req, res) => {
  const { role } = req.query;

  const filter = {};
  if (role) filter.role = role;

  const users = await User.find(filter).select("-password").sort({ createdAt: -1 });
  res.json({ success: true, data: users });
};
