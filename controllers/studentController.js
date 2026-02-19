import Student from '../models/Student.js';

export const createStudent = async (req, res) => {
    try {
        const { name, age, email, password, gender, course } = req.body;

        if (!name || !email || !gender || !course) {
            return res.status(400).json({ message: "All fields are required" });
        }

        if (age < 18) {
            return res.status(400).json({ message: "Student must be 18+" });
        }

        const existingStudent = await Student.findOne({ email });
        if (existingStudent) {
            return res.status(400).json({ message: "Email already exists" });
        }

        const student = new Student({
            name,
            age,
            email,
            password,
            gender,
            course
        });
        await student.save();
        console.log("Sending Welcome email to " + email);
        console.log("Email content: Welcome " + student._id);
        res.status(201).json(student);
    } catch (err) {
        res.status(500).json({error: err.message});
    }
}
export const getAllStudents = async (req, res) => {
    try {
        const students = await Student.find();
        res.status(200).json(students);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
