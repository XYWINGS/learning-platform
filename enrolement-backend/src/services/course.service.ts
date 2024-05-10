import Payment from "../models/user.model";

interface Course {
  courseName: string;
  id: string;
  rate: number;
}

export async function addpayment(course: Course) {
  try {
    const newpayment = new Payment(course);
    const res = await newpayment.save();
    return res;
  } catch (err: any) {
    return err;
  }
}

export async function findcourseById(code: string) {
  const existingcourse = await Payment.findOne({ code });
  const corse = JSON.parse(JSON.stringify(existingcourse));
  return corse;
}

export async function findcourseByname(code: string, c_name: string) {
  const existingcourse = await Payment.findOne({ code, c_name });
  const corse = JSON.parse(JSON.stringify(existingcourse));

  return corse;
}

export async function getCourse(id: string) {
  try {
    const res = await Payment.find({ user: id });
    return res;
  } catch (err: any) {
    return err;
  }
}
export async function getallCourse() {
  try {
    const res = await Payment.find();
    return res;
  } catch (err: any) {
    return err;
  }
}

export async function getCourseById(id: string) {
  try {
    const res = await Payment.findById(id);
    return res;
  } catch (err: any) {
    return err;
  }
}

export async function updateuserById(id: string, course: Course) {
  try {
    const res = await Payment.findByIdAndUpdate(id, {
      $push: { course: course }, // Using $push to add new data to the 'course' array
    });
    return res;
  } catch (err: any) {
    return { status: "error with update course", error: err.message };
  }
}

export async function deleteCourseById(id: string) {
  try {
    const res = await Payment.findByIdAndDelete(id);
    return res;
  } catch (err: any) {
    return { status: "error with delete course", error: err.message };
  }
}
