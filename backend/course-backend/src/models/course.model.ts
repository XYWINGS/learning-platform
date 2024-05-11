import mongoose, { Schema } from "mongoose";

const courseSchema = new Schema({
  courseName: {
    required: true,
    type: String,
  },
  discription: {
    required: true,
    type: String,
  },
  part: {
    required: true,
    type: Number,
  },
  price: {
    required: true,
    type: Number,
  },

  enrollKey: {
    required: true,
    type: String,
  },
  status: {
    required: true,
    type: String,
  },
  user: {
   
    type: String,
  },
  document: {
    required: true,
    type: [],
  },
});
const Course = mongoose.model("Course", courseSchema);
export default Course;
