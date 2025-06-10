import mongoose from 'mongoose';

const membershipSchema = new mongoose.Schema({
  title: String,
  price: Number,
  duration: String, // e.g., "1 Month", "3 Months"
});

export default mongoose.model('Membership', membershipSchema);
