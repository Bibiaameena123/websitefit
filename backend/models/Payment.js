import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  utr: { type: String, required: true },
  plan: { type: String, required: true },
  screenshot: { type: String, required: true },
  date: { type: Date, default: Date.now }
});

const Payment = mongoose.model('Payment', paymentSchema);

export default Payment;
