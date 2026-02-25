import Institution from "../model/institution.model.js";

export const createInstitution = async (req, res) => {
 const { name, address, phone, email, status, planType } = req.body;

 if (!name) {
   res.status(400);
   throw new Error("name is required");
 }

 const inst = await Institution.create({
   name,
   address,
   phone,
   email,
   status,
   planType,
 });

 res.status(201).json({ success: true, data: inst });
};

export const listInstitutions = async (req, res) => {
 const list = await Institution.find().sort({ createdAt: -1 });
 res.json({ success: true, data: list });
};
