import Course from "../models/course.model";

interface Course {
    courseName: string,
    discription: string,
    part: number,
    enrollKey: string,
    document:[]
}

export async function addcourse(course: Course) {
    try {
        const newcourse = new Course(
            course
        );
        const res = await newcourse.save()
        return res
    } catch (err: any) {
        return (err);
    }
}

export async function findcourseById(code: string) {
    const existingcourse = await Course.findOne({ code });
    const corse = JSON.parse(JSON.stringify(existingcourse))
    return corse;

}

export async function findcourseByname(code: string,c_name:string) {
    const existingcourse = await Course.findOne({ code,c_name });
    const corse = JSON.parse(JSON.stringify(existingcourse))
    
    return corse;


}


export async function getCourse(id:string) {
    try {
        const res = await Course.find({user:id})
        return res
    } catch (err: any) {
        return (err);
    }
}

export async function getallapproveCourse() {
    try {
        const res = await Course.find({status:"accept"})
        return res
    } catch (err: any) {
        return (err);
    }
}
export async function getallCourse() {
    try {
        const res = await Course.find()
        return res
    } catch (err: any) {
        return (err);
    }
}

export async function getCourseById(id:string) {
    try {
        const res = await Course.findById(id)
        return res
    } catch (err: any) {
        return (err);
    }
}

export async function updateCourseById(id:string,course:Course) {
    try {
        const res = await Course.findByIdAndUpdate(id , course)
        return res
    } catch (err: any) {
        return ({status : "error with update course" , error : err.message})
    }

}

export async function deleteCourseById(id:string) {
    try {
        const res = await Course.findByIdAndDelete(id)
        return res
    } catch (err: any) {
        return ({status : "error with delete course" , error : err.message})
    }

}