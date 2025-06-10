import Payment from '../models/Payment.js';

export const submitPayment = async (req, res) => {
  try {
    const { name, utr, plan } = req.body;
    const screenshot = req.file?.filename;

    if (!name || !utr || !plan || !screenshot) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newPayment = new Payment({ name, utr, plan, screenshot });
    await newPayment.save();

    res.status(201).json({ message: "Payment submitted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.find().sort({ date: -1 });
    res.json(payments);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch payments" });
  }
};
