import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../model/user.model.js";

const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || "7d" });

export const register = async (req, res) => {
  const { name, email, phone, password, institution } = req.body;

  if (!name || !password || (!email && !phone)) {
    res.status(400);
    throw new Error("name, password, and (email or phone) are required");
  }

  const existing = await User.findOne({
    $or: [{ email: email?.toLowerCase() }, { phone }],
  });

  if (existing) {
    res.status(409);
    throw new Error("User already exists");
  }

  const hashed = await bcrypt.hash(password, 10);
  
// at registration, the role is always set to customer.
  const user = await User.create({
    name,
    email: email?.toLowerCase(),
    phone,
    password: hashed,
    role: "customer",
    institution: institution || null,
  });

  res.status(201).json({
    success: true,
    data: {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        institution: user.institution,
      },
      token: signToken(user._id),
    },
  });
};

export const login = async (req, res) => {
  const { email, phone, password } = req.body;

  if (!password || (!email && !phone)) {
    res.status(400);
    throw new Error("password and (email or phone) are required");
  }

  const user = await User.findOne({
    $or: [{ email: email?.toLowerCase() }, { phone }],
  });

  if (!user) {
    res.status(401);
    throw new Error("Invalid credentials");
  }

  const ok = await bcrypt.compare(password, user.password);
  if (!ok) {
    res.status(401);
    throw new Error("Invalid credentials");
  }

  res.json({
    success: true,
    data: {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        institution: user.institution,
      },
      token: signToken(user._id),
    },
  });
};
