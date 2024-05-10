import mongoose, { Schema } from "mongoose";

const paymentSchema = new Schema({
  courseName: {
    required: true,
    type: String,
  },
  userid: {
    required: true,
    type: String,
  },
  username: {
    required: true,
    type: String,
  },
  price: {
    required: true,
    type: Number,
  },
  status: {
    required: true,
    type: String,
  },
  date: {
   
    type: String,
  },

});
const Payment = mongoose.model("Payment", paymentSchema);
export default Payment;