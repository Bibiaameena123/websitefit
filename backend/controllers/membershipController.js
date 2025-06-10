import Membership from '../models/Membership.js';

export const getAll = async (req, res) => {
  const plans = await Membership.find();
  res.json(plans);
};

export const create = async (req, res) => {
  const plan = await Membership.create(req.body);
  res.status(201).json(plan);
};
