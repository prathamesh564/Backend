import mongoose from "mongoose";    

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        trim: true,
        minlength: [3, "Name must be at least 3 characters long"]
    },
    age: {
        type: Number,
        required: [true, "Age is required"],
        min: [18, "Student must be at least 18 years old"]
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        minlength: [5, "Email must be at least 5 characters long"],
        lowercase: true,
        unique: true,
        match: [/.+@.+\..+/, "Please enter a valid email address"]
    },
    password: {
        type: String,
        minlength: [6, "Password must be at least 6 characters long"],
        required: [true, "Password is required"]
    },
    gender: {
        type: String,
        required: [true, "Gender is required"],
        enum: ["Male", "Female", "Other"]
    },
    course: {
        type: String,
        required: [true, "Course is required"]
    },
    isActive: {
        type: Boolean,
        default: true
    }
},
{
    timestamps: true
});

const Student = mongoose.model("Student", studentSchema);

export default Student;
