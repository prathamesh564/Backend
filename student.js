import express from 'express';
import mongoose from 'mongoose';
const app = express();
const port = 3000;
app.use(express.json());
mongoose
.connect('mongodb+srv://prathameshvshenoy_db_user:Vvvpsh77@cluster0.gnmus1t.mongodb.net/student_data')
.then(() => console.log('Connected to MongoDB'))
.catch((err)=> console.log(err));

const studentSchema = new mongoose.Schema({
    name:  String,
    age : Number,
    email : String,
    password : String
});

const Student = mongoose.model("Student",studentSchema);

app.post("/api/students",async(req,res)=>{
    try{
        const{name,age,email,password} = req.body ;
        if(!name || !email){
            return res.status(400).json({message : "Name & email required"})
        }
        if(age<18){
            return res.status(400).json({message: "Student must be 18 "})
        }
         const existingStudent = await Student.findOne({email});
         if(existingStudent){
            return res.status(400).json({message: "Email already exists"})
         }
        const student = new Student ({
            name,
            age,
            email,
            password
        });
        await student.save();
        console.log("Sending Welcome email to " + email);
        console.log("Email content: Welcome " + student._id);
        res.status(201).json(student);
    } catch (err) {
        res.status(500).json({error: error.message});
    }
})
app.get("/students/age",async(req,res)=>{
try{
const students = await Student.find();
res.json(students);
} catch (err) { 
    res.status(500).json({error: err.message}); 
}})  
 app.put("/api/students/:id", async (req, res) => {
    try {
        const updatedStudent = await Student.findByIdAndUpdate(
            req.params.id, 
            req.body, 
            { new: true, runValidators: true }
        );
        res.json(updatedStudent);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
});
app.delete("/api/students/:id", async (req, res) => {
    try {
        await Student.findByIdAndDelete(req.params.id); 
        res.json({ message: "Student deleted" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }   
});
app.get("/api/students",async(req,res)=>{
    try{
        const{name,minAge}=req.query;
        const query={};
        if(name){
            query.name={$regex: name, $options: "i"};
        }
        if(minAge){
            query.age={$gte: Number(minAge)};
        }
        console.log("Final Query:", query);
        const students = await Student.find(query);
        res.json(students);
    }catch(err){
     res.status(500).json({error: err.message});   
    }
}
);
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})